#!/bin/bash

# Script to backup PostgreSQL database and MinIO storage
# Usage: ./backup.sh [--postgres-only] [--minio-only] [--dry-run]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default options
BACKUP_POSTGRES=true
BACKUP_MINIO=true
DRY_RUN=false
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
BACKUP_RETENTION_DAYS=7

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --postgres-only)
            BACKUP_MINIO=false
            shift
            ;;
        --minio-only)
            BACKUP_POSTGRES=false
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--postgres-only] [--minio-only] [--dry-run]"
            echo ""
            echo "Options:"
            echo "  --postgres-only    Backup only PostgreSQL database"
            echo "  --minio-only       Backup only MinIO storage"
            echo "  --dry-run          Show what would be done without actually doing it"
            echo "  --help, -h         Show this help message"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Create backup directory if it doesn't exist
if [ "$DRY_RUN" = false ]; then
    mkdir -p "$BACKUP_DIR"
fi

# Check if .env or .env.production file exists
ENV_FILE=".env"
if [ "$NODE_ENV" = "production" ] && [ -f .env.production ]; then
    ENV_FILE=".env.production"
elif [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    echo "Please create a .env file with database and MinIO credentials in the server directory"
    exit 1
fi

# Load environment variables
echo -e "${YELLOW}Loading environment variables from $ENV_FILE...${NC}"
export $(grep -v '^#' "$ENV_FILE" | xargs)

# Construct DATABASE_URL if not set
if [ -z "$DATABASE_URL" ]; then
    if [ -n "$DB_USER" ] && [ -n "$DB_PASSWORD" ] && [ -n "$DB_NAME" ]; then
        DB_HOST=${DB_HOST:-localhost}
        DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:${DB_PORT:-5432}/$DB_NAME?schema=public"
        export DATABASE_URL
        echo -e "${YELLOW}Constructed DATABASE_URL: postgresql://$DB_USER:***@$DB_HOST:${DB_PORT:-5432}/$DB_NAME?schema=public${NC}"
    else
        echo -e "${RED}Error: DATABASE_URL is not set and cannot construct from DB_* variables${NC}"
        echo "Please ensure DATABASE_URL is set in $ENV_FILE or all DB_* variables are defined"
        exit 1
    fi
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to run command or echo if dry run
run_or_echo() {
    if [ "$DRY_RUN" = true ]; then
        echo -e "${BLUE}[DRY RUN]${NC} $@"
    else
        "$@"
    fi
}

# Function to backup PostgreSQL
backup_postgres() {
    echo -e "${YELLOW}=== Starting PostgreSQL backup ===${NC}"

    # Check if pg_dump is available
    if ! command_exists pg_dump; then
        echo -e "${RED}Error: pg_dump command not found${NC}"
        echo "Please install PostgreSQL client tools"
        return 1
    fi

    # Extract database connection details from DATABASE_URL
    # Format: postgresql://user:password@host:port/database?schema=public
    DB_URL_PARSED=$(echo "$DATABASE_URL" | sed 's|postgresql://||')
    DB_USER=$(echo "$DB_URL_PARSED" | cut -d':' -f1)
    DB_PASSWORD=$(echo "$DB_URL_PARSED" | sed 's|.*:||' | cut -d'@' -f1)
    DB_HOST=$(echo "$DB_URL_PARSED" | sed 's|.*@||' | cut -d':' -f1)
    DB_PORT=$(echo "$DB_URL_PARSED" | sed 's|.*:||' | cut -d'/' -f1)
    DB_NAME=$(echo "$DB_URL_PARSED" | sed 's|.*:||' | cut -d'/' -f2 | cut -d'?' -f1)

    # Set PGPASSWORD for pg_dump
    export PGPASSWORD="$DB_PASSWORD"

    BACKUP_FILE="$BACKUP_DIR/postgres_backup_$TIMESTAMP.sql"

    echo -e "${YELLOW}Creating PostgreSQL backup...${NC}"
    echo -e "${YELLOW}Host: $DB_HOST:$DB_PORT${NC}"
    echo -e "${YELLOW}Database: $DB_NAME${NC}"
    echo -e "${YELLOW}Backup file: $BACKUP_FILE${NC}"

    # Create backup
    if run_or_echo pg_dump \
        --host="$DB_HOST" \
        --port="$DB_PORT" \
        --username="$DB_USER" \
        --dbname="$DB_NAME" \
        --no-password \
        --format=custom \
        --compress=9 \
        --verbose \
        --file="$BACKUP_FILE"; then

        if [ "$DRY_RUN" = false ]; then
            BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
            echo -e "${GREEN}✓ PostgreSQL backup completed successfully${NC}"
            echo -e "${GREEN}✓ Backup size: $BACKUP_SIZE${NC}"
            echo -e "${GREEN}✓ Backup location: $BACKUP_FILE${NC}"
        else
            echo -e "${GREEN}✓ PostgreSQL backup would be created at: $BACKUP_FILE${NC}"
        fi
    else
        echo -e "${RED}✗ PostgreSQL backup failed${NC}"
        return 1
    fi

    # Unset PGPASSWORD
    unset PGPASSWORD
}

# Function to backup MinIO
backup_minio() {
    echo -e "${YELLOW}=== Starting MinIO backup ===${NC}"

    # Check if mc (MinIO Client) is available
    if ! command_exists mc; then
        echo -e "${YELLOW}Warning: mc (MinIO Client) not found. Installing...${NC}"
        if [ "$DRY_RUN" = false ]; then
            # Try to install mc
            if command_exists wget; then
                wget -q https://dl.min.io/client/mc/release/linux-amd64/mc -O /tmp/mc
                chmod +x /tmp/mc
                MC_CMD="/tmp/mc"
            elif command_exists curl; then
                curl -s https://dl.min.io/client/mc/release/linux-amd64/mc -o /tmp/mc
                chmod +x /tmp/mc
                MC_CMD="/tmp/mc"
            else
                echo -e "${RED}Error: Neither wget nor curl found. Cannot install MinIO client${NC}"
                return 1
            fi
        else
            MC_CMD="mc"
        fi
    else
        MC_CMD="mc"
    fi

    # MinIO connection details
    MINIO_ENDPOINT=${MINIO_ENDPOINT:-localhost}
    MINIO_PORT=${MINIO_PORT:-9000}
    MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY:-admin}
    MINIO_SECRET_KEY=${MINIO_SECRET_KEY:-password}
    MINIO_USE_SSL=${MINIO_USE_SSL:-false}

    # MinIO buckets
    MINIO_BUCKET_PUBLIC=${MINIO_BUCKET_PUBLIC:-public}
    MINIO_BUCKET_PRIVATE=${MINIO_BUCKET_PRIVATE:-private}
    MINIO_BUCKET_MEDIA=${MINIO_BUCKET_MEDIA:-media}

    BUCKETS=("$MINIO_BUCKET_PUBLIC" "$MINIO_BUCKET_PRIVATE" "$MINIO_BUCKET_MEDIA")

    # Configure MinIO client
    ALIAS_NAME="seller_backup_$TIMESTAMP"
    MINIO_URL="http://$MINIO_ENDPOINT:$MINIO_PORT"
    if [ "$MINIO_USE_SSL" = "true" ]; then
        MINIO_URL="https://$MINIO_ENDPOINT:$MINIO_PORT"
    fi

    echo -e "${YELLOW}MinIO endpoint: $MINIO_URL${NC}"
    echo -e "${YELLOW}Buckets to backup: ${BUCKETS[*]}${NC}"

    if [ "$DRY_RUN" = false ]; then
        # Configure mc alias
        if ! $MC_CMD alias set "$ALIAS_NAME" "$MINIO_URL" "$MINIO_ACCESS_KEY" "$MINIO_SECRET_KEY" >/dev/null 2>&1; then
            echo -e "${RED}Error: Failed to configure MinIO client${NC}"
            return 1
        fi

        # Test connection
        if ! $MC_CMD admin info "$ALIAS_NAME" >/dev/null 2>&1; then
            echo -e "${RED}Error: Cannot connect to MinIO server${NC}"
            return 1
        fi
    fi

    # Backup each bucket
    for BUCKET in "${BUCKETS[@]}"; do
        echo -e "${YELLOW}Backing up bucket: $BUCKET${NC}"

        BACKUP_BUCKET_DIR="$BACKUP_DIR/minio_$BUCKET_$TIMESTAMP"

        if [ "$DRY_RUN" = false ]; then
            # Create bucket backup directory
            mkdir -p "$BACKUP_BUCKET_DIR"

            # Mirror bucket contents
            if $MC_CMD mirror --overwrite "$ALIAS_NAME/$BUCKET" "$BACKUP_BUCKET_DIR" >/dev/null 2>&1; then
                # Count files and calculate size
                FILE_COUNT=$(find "$BACKUP_BUCKET_DIR" -type f | wc -l)
                BACKUP_SIZE=$(du -sh "$BACKUP_BUCKET_DIR" | cut -f1)
                echo -e "${GREEN}✓ Bucket '$BUCKET' backed up successfully${NC}"
                echo -e "${GREEN}✓ Files: $FILE_COUNT, Size: $BACKUP_SIZE${NC}"
                echo -e "${GREEN}✓ Location: $BACKUP_BUCKET_DIR${NC}"
            else
                echo -e "${RED}✗ Failed to backup bucket '$BUCKET'${NC}"
                continue
            fi
        else
            echo -e "${GREEN}✓ Bucket '$BUCKET' would be backed up to: $BACKUP_BUCKET_DIR${NC}"
        fi
    done

    # Clean up mc alias
    if [ "$DRY_RUN" = false ]; then
        $MC_CMD alias remove "$ALIAS_NAME" >/dev/null 2>&1 || true
    fi

    echo -e "${GREEN}✓ MinIO backup completed${NC}"
}

# Function to cleanup old backups
cleanup_old_backups() {
    echo -e "${YELLOW}=== Cleaning up old backups (older than $BACKUP_RETENTION_DAYS days) ===${NC}"

    if [ "$DRY_RUN" = false ]; then
        # Find and remove old backup files/directories
        find "$BACKUP_DIR" -type f -name "postgres_backup_*.sql" -mtime +$BACKUP_RETENTION_DAYS -exec rm -f {} \; -exec echo -e "${BLUE}Removed old PostgreSQL backup: {}${NC}" \;
        find "$BACKUP_DIR" -type d -name "minio_*" -mtime +$BACKUP_RETENTION_DAYS -exec rm -rf {} \; -exec echo -e "${BLUE}Removed old MinIO backup: {}${NC}" \;

        echo -e "${GREEN}✓ Cleanup completed${NC}"
    else
        echo -e "${BLUE}[DRY RUN]${NC} Would remove backups older than $BACKUP_RETENTION_DAYS days"
    fi
}

# Main backup process
echo -e "${GREEN}=== Backup Script Started ===${NC}"
echo -e "${YELLOW}Timestamp: $TIMESTAMP${NC}"
echo -e "${YELLOW}Backup directory: $BACKUP_DIR${NC}"
if [ "$DRY_RUN" = true ]; then
    echo -e "${BLUE}DRY RUN MODE - No actual backups will be created${NC}"
fi

# Track success/failure
BACKUP_SUCCESS=true

# Backup PostgreSQL if requested
if [ "$BACKUP_POSTGRES" = true ]; then
    if backup_postgres; then
        echo -e "${GREEN}✓ PostgreSQL backup completed${NC}"
    else
        echo -e "${RED}✗ PostgreSQL backup failed${NC}"
        BACKUP_SUCCESS=false
    fi
else
    echo -e "${YELLOW}Skipping PostgreSQL backup (--postgres-only not specified)${NC}"
fi

echo ""

# Backup MinIO if requested
if [ "$BACKUP_MINIO" = true ]; then
    if backup_minio; then
        echo -e "${GREEN}✓ MinIO backup completed${NC}"
    else
        echo -e "${RED}✗ MinIO backup failed${NC}"
        BACKUP_SUCCESS=false
    fi
else
    echo -e "${YELLOW}Skipping MinIO backup (--minio-only not specified)${NC}"
fi

echo ""

# Cleanup old backups
cleanup_old_backups

echo ""

# Final status
if [ "$BACKUP_SUCCESS" = true ]; then
    echo -e "${GREEN}=== Backup completed successfully ===${NC}"
    echo -e "${GREEN}✓ All requested backups completed${NC}"
    if [ "$DRY_RUN" = false ]; then
        echo -e "${GREEN}✓ Backup location: $BACKUP_DIR${NC}"
    fi
    exit 0
else
    echo -e "${RED}=== Backup completed with errors ===${NC}"
    echo -e "${RED}✗ Some backups failed. Check the output above for details${NC}"
    exit 1
fi
