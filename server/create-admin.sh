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

# Ensure database migrations are applied (safe to run multiple times)
echo -e "${YELLOW}Ensuring database migrations are applied...${NC}"
if ! "$PRISMA_BIN" migrate deploy; then
    echo -e "${RED}Error: Failed to apply database migrations${NC}"
    echo -e "${YELLOW}Please check your DATABASE_URL and ensure the database is accessible${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Database migrations are up to date${NC}"

# Check if ts-node exists locally
TS_NODE_BIN="./node_modules/.bin/ts-node"
if [ ! -f "$TS_NODE_BIN" ]; then
    echo -e "${RED}Error: ts-node not found. Please run 'npm install' first${NC}"
    exit 1
fi

# Run the TypeScript script (dotenv is loaded automatically in create-admin.ts)
echo -e "${GREEN}Creating admin account...${NC}"
"$TS_NODE_BIN" --project tsconfig.json prisma/create-admin.ts "$LOGIN" "$PASSWORD"

