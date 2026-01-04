#!/bin/bash

# Script to create an admin account in PostgreSQL
# Usage: ./create-admin.sh <login> <password>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if login and password are provided
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Login and password are required${NC}"
    echo "Usage: $0 <login> <password>"
    exit 1
fi

LOGIN=$1
PASSWORD=$2

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if .env file exists
if [ ! -f .env ]; then
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

# Ensure Prisma Client is generated
if [ ! -d "node_modules/.prisma" ]; then
    echo -e "${YELLOW}Generating Prisma Client...${NC}"
    "$PRISMA_BIN" generate
fi

# Load environment variables for Prisma commands
echo -e "${YELLOW}Loading environment variables...${NC}"
export $(grep -v '^#' .env | xargs)

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL is not set in .env file${NC}"
    exit 1
fi

# Ensure database migrations are applied (safe to run multiple times)
echo -e "${YELLOW}Ensuring database migrations are applied...${NC}"
set +e  # Temporarily disable exit on error to capture output
MIGRATE_STATUS=$("$PRISMA_BIN" migrate status 2>&1)
MIGRATE_STATUS_EXIT=$?
set -e

# If Prisma says "No migration found", use db push to sync schema
if echo "$MIGRATE_STATUS" | grep -q "No migration found"; then
    echo -e "${YELLOW}No migration history detected. Syncing database schema with prisma db push...${NC}"
    echo -e "${YELLOW}This will create all tables from the current schema.${NC}"
    
    set +e
    DB_PUSH_OUTPUT=$("$PRISMA_BIN" db push --accept-data-loss --skip-generate 2>&1)
    DB_PUSH_EXIT=$?
    set -e
    
    if [ $DB_PUSH_EXIT -ne 0 ]; then
        echo -e "${RED}Error: Failed to sync database schema${NC}"
        echo "$DB_PUSH_OUTPUT"
        echo ""
        echo -e "${YELLOW}Troubleshooting steps:${NC}"
        echo "1. Run './apply-migrations.sh' to apply migrations manually"
        echo "2. Check if DATABASE_URL is correct in .env file"
        echo "3. Ensure the database server is running and accessible"
        exit 1
    fi
    
    echo "$DB_PUSH_OUTPUT"
    echo -e "${GREEN}✓ Database schema synced successfully${NC}"
    
    # Mark all existing migrations as applied
    echo -e "${YELLOW}Marking existing migrations as applied...${NC}"
    for migration_dir in prisma/migrations/*/; do
        if [ -d "$migration_dir" ] && [ -f "${migration_dir}migration.sql" ]; then
            migration_name=$(basename "$migration_dir")
            set +e
            "$PRISMA_BIN" migrate resolve --applied "$migration_name" 2>&1 | grep -v "already applied" || true
            set -e
        fi
    done
    echo -e "${GREEN}✓ Migrations marked as applied${NC}"
else
    # Apply migrations normally
    set +e
    MIGRATE_OUTPUT=$("$PRISMA_BIN" migrate deploy 2>&1)
    MIGRATE_EXIT_CODE=$?
    set -e

    if [ $MIGRATE_EXIT_CODE -ne 0 ]; then
        echo -e "${RED}Error: Failed to apply database migrations${NC}"
        echo "$MIGRATE_OUTPUT"
        echo ""
        echo -e "${YELLOW}Troubleshooting steps:${NC}"
        echo "1. Run './apply-migrations.sh' to apply migrations manually"
        echo "2. Check if DATABASE_URL is correct in .env file"
        echo "3. Ensure the database server is running and accessible"
        echo "4. Verify database credentials are correct"
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

# Check if ts-node exists locally
TS_NODE_BIN="./node_modules/.bin/ts-node"
if [ ! -f "$TS_NODE_BIN" ]; then
    echo -e "${RED}Error: ts-node not found. Please run 'npm install' first${NC}"
    exit 1
fi

# Run the TypeScript script (dotenv is loaded automatically in create-admin.ts)
echo -e "${GREEN}Creating admin account...${NC}"
"$TS_NODE_BIN" --project tsconfig.json prisma/create-admin.ts "$LOGIN" "$PASSWORD"

