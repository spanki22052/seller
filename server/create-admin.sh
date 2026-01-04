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

# Run the TypeScript script with dotenv-cli to load .env file
echo -e "${GREEN}Creating admin account...${NC}"
npx dotenv-cli -e .env -- npx ts-node prisma/create-admin.ts "$LOGIN" "$PASSWORD"

