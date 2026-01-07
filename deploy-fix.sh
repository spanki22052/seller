#!/bin/bash
set -e

echo "🚀 Deploying database fix to server..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SERVER_IP="62.181.53.211"
SSH_USER="root"
PROJECT_DIR="/opt/seller"

echo -e "${YELLOW}Copying fix script to server...${NC}"
scp fix-database-issue.sh ${SSH_USER}@${SERVER_IP}:${PROJECT_DIR}/

echo -e "${YELLOW}Running fix script on server...${NC}"
ssh ${SSH_USER}@${SERVER_IP} "cd ${PROJECT_DIR} && chmod +x fix-database-issue.sh && ./fix-database-issue.sh"

echo -e "${GREEN}✅ Fix deployed successfully!${NC}"
