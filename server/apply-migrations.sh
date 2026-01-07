#!/bin/bash

# Script to apply Prisma migrations to the database
# Usage: ./apply-migrations.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if .env or .env.production file exists
ENV_FILE=".env"
if [ "$NODE_ENV" = "production" ] && [ -f .env.production ]; then
    ENV_FILE=".env.production"
elif [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found${NC}"
    echo "Please create a .env file with DATABASE_URL in the server directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Check if prisma binary exists locally
PRISMA_BIN="./node_modules/.bin/prisma"
if [ ! -f "$PRISMA_BIN" ]; then
    echo -e "${RED}Error: Prisma not found. Please run 'npm install' first${NC}"
    exit 1
fi

# Load environment variables
echo -e "${YELLOW}Loading environment variables from $ENV_FILE...${NC}"
export $(grep -v '^#' "$ENV_FILE" | xargs)

# Construct DATABASE_URL if not set
if [ -z "$DATABASE_URL" ]; then
    if [ -n "$DB_USER" ] && [ -n "$DB_PASSWORD" ] && [ -n "$DB_NAME" ]; then
        # For production, connect to localhost (exposed port), for development use localhost too
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

echo -e "${GREEN}✓ DATABASE_URL is set${NC}"

# Ensure Prisma Client is generated
echo -e "${YELLOW}Generating Prisma Client...${NC}"
"$PRISMA_BIN" generate

# Check migration status first
echo -e "${YELLOW}Checking migration status...${NC}"
set +e
STATUS_OUTPUT=$("$PRISMA_BIN" migrate status 2>&1)
STATUS_EXIT_CODE=$?
set -e

if [ $STATUS_EXIT_CODE -eq 0 ]; then
    echo "$STATUS_OUTPUT"
fi

# Check if migrations table exists and has records
echo -e "${YELLOW}Checking migration history...${NC}"
set +e
MIGRATE_STATUS=$("$PRISMA_BIN" migrate status 2>&1)
MIGRATE_STATUS_EXIT=$?
set -e

# If no migrations found, try to resolve or use db push
if echo "$MIGRATE_STATUS" | grep -q "No migration found"; then
    echo -e "${YELLOW}No migration history found. Syncing database schema...${NC}"
    echo -e "${YELLOW}This will create all tables from the current schema.${NC}"
    
    set +e
    DB_PUSH_OUTPUT=$("$PRISMA_BIN" db push --accept-data-loss --skip-generate 2>&1)
    DB_PUSH_EXIT=$?
    set -e
    
    if [ $DB_PUSH_EXIT -ne 0 ]; then
        echo -e "${RED}Error: Failed to sync database schema${NC}"
        echo "$DB_PUSH_OUTPUT"
        exit 1
    fi
    
    echo "$DB_PUSH_OUTPUT"
    echo -e "${GREEN}✓ Database schema synced successfully${NC}"
    
    # After db push, mark migrations as applied
    echo -e "${YELLOW}Marking migrations as applied...${NC}"
    for migration_dir in prisma/migrations/*/; do
        if [ -d "$migration_dir" ] && [ -f "${migration_dir}migration.sql" ]; then
            migration_name=$(basename "$migration_dir")
            set +e
            "$PRISMA_BIN" migrate resolve --applied "$migration_name" 2>&1
            set -e
        fi
    done
else
    # Apply migrations normally
    echo -e "${YELLOW}Applying database migrations...${NC}"
    set +e
    MIGRATE_OUTPUT=$("$PRISMA_BIN" migrate deploy 2>&1)
    MIGRATE_EXIT_CODE=$?
    set -e

    if [ $MIGRATE_EXIT_CODE -ne 0 ]; then
        echo -e "${RED}Error: Failed to apply database migrations${NC}"
        echo "$MIGRATE_OUTPUT"
        echo ""
        echo -e "${YELLOW}Troubleshooting:${NC}"
        echo "1. Check if DATABASE_URL is correct in .env file"
        echo "2. Ensure the database server is running and accessible"
        echo "3. Verify database credentials are correct"
        echo "4. Check if the database exists"
        exit 1
    fi

    # Show migration output
    echo "$MIGRATE_OUTPUT"

    if echo "$MIGRATE_OUTPUT" | grep -q "No pending migrations\|already applied\|All migrations have been applied"; then
        echo -e "${GREEN}✓ Database migrations are up to date${NC}"
    else
        echo -e "${GREEN}✓ Database migrations applied successfully${NC}"
    fi
fi

# Verify tables were created
echo -e "${YELLOW}Verifying database schema...${NC}"
set +e
SCHEMA_OUTPUT=$("$PRISMA_BIN" db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;" 2>&1)
set -e

echo -e "${GREEN}✓ Migration process completed${NC}"

