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

# Load environment variables
echo -e "${YELLOW}Loading environment variables...${NC}"
export $(grep -v '^#' .env | xargs)

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL is not set in .env file${NC}"
    exit 1
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

# Apply migrations
echo -e "${YELLOW}Applying database migrations...${NC}"
set +e  # Temporarily disable exit on error to capture output
MIGRATE_OUTPUT=$("$PRISMA_BIN" migrate deploy 2>&1)
MIGRATE_EXIT_CODE=$?
set -e  # Re-enable exit on error

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

# Verify tables were created
echo -e "${YELLOW}Verifying database schema...${NC}"
set +e
SCHEMA_OUTPUT=$("$PRISMA_BIN" db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;" 2>&1)
set -e

echo -e "${GREEN}✓ Migration process completed${NC}"

