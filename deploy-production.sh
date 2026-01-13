#!/bin/bash
set -e

# Production Deployment Script for Seller Application
# Supports any server IP address

# Configuration - CUSTOMIZE THESE VALUES BEFORE RUNNING
SERVER_IP="YOUR_SERVER_IP"  # Replace with your actual server IP or domain
SSH_USER="root"            # Change this to your SSH user if different
PROJECT_DIR="/opt/seller"
DOMAIN_NAME=""             # Optional: set your domain name for SSL
EMAIL="admin@example.com"  # Email for SSL certificates

echo "🚀 Starting production deployment to $SERVER_IP"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Check configuration
if [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
    print_error "Please configure SERVER_IP in this script before running!"
    print_status "Edit deploy-production.sh and set SERVER_IP to your actual server IP or domain"
    exit 1
fi

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_error ".env.production file not found!"
    print_status "Please copy .env.production.example to .env.production and configure your environment variables"
    print_status "Make sure to replace all 'YOUR_SERVER_IP' placeholders with your actual server IP: $SERVER_IP"
    exit 1
fi

print_status "Configuration validated ✓"
print_status "Environment file found ✓"

# Create production environment on server
print_status "Setting up production environment on server..."

ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SERVER_IP} << EOF_SERVER
    # Update system packages
    apt update && apt upgrade -y
    
    # Install required packages
    apt install -y docker.io docker-compose curl wget
    
    # Start Docker service
    systemctl enable docker
    systemctl start docker
    
    # Create project directory
    mkdir -p ${PROJECT_DIR}
    cd ${PROJECT_DIR}
    
    echo "Server setup completed ✓"
EOF_SERVER

print_status "Server setup completed ✓"

# Copy project files to server
print_status "Copying project files to server..."
rsync -avz --exclude='.git' --exclude='node_modules' --exclude='.env*' ./ ${SSH_USER}@${SERVER_IP}:${PROJECT_DIR}/

# Copy production environment file
print_status "Copying production environment..."
scp .env.production ${SSH_USER}@${SERVER_IP}:${PROJECT_DIR}/.env.production

# Deploy on server
print_status "Starting deployment on server..."

ssh ${SSH_USER}@${SERVER_IP} << EOF_DEPLOY
    cd ${PROJECT_DIR}
    
    # Load environment variables
    export \$(cat .env.production | xargs)
    
    # Copy environment file for docker-compose
    cp .env.production .env
    
    # Stop existing containers
    docker-compose -f docker-compose.production.yml down || true
    
    # Clean up old images
    docker system prune -f
    
    # Build and start services
    docker-compose -f docker-compose.production.yml up -d --build
    
    # Wait for services to be healthy
    echo "Waiting for services to start..."
    sleep 30
    
    # Check service status
    docker-compose -f docker-compose.production.yml ps
    
    echo "Deployment completed! ✓"
    echo ""
    echo "🌐 Service URLs:"
    echo "   Backend API: http://${SERVER_IP}:3002"
    echo "   Backend Health: http://${SERVER_IP}:3002/health"
    echo "   Main Client: http://${SERVER_IP}:3000"
    echo "   Admin Client: http://${SERVER_IP}:3001"
    echo "   MinIO Console: http://${SERVER_IP}:9001"
    echo ""
    echo "📊 Check logs with: docker-compose -f docker-compose.production.yml logs -f"
EOF_DEPLOY

print_status "Deployment completed successfully! ✓"
print_status ""
print_status "🌐 Your application is now running at:"
print_status "   Backend API: http://$SERVER_IP:3002"
print_status "   Main Client: http://$SERVER_IP:3000"
print_status "   Admin Client: http://$SERVER_IP:3001"
print_status "   MinIO Console: http://$SERVER_IP:9001"
print_status ""
print_info "Next steps:"
echo "  1. Run Nginx setup: ssh ${SSH_USER}@${SERVER_IP} 'cd ${PROJECT_DIR} && ./setup-nginx.sh'"
echo "  2. Update DNS (if using domain): Point $DOMAIN_NAME to $SERVER_IP"
echo "  3. Test all URLs"
print_status ""
print_info "Useful commands:"
echo "  🔧 Check logs: ssh ${SSH_USER}@${SERVER_IP} 'cd ${PROJECT_DIR} && docker-compose -f docker-compose.production.yml logs -f'"
echo "  🔄 Restart: ssh ${SSH_USER}@${SERVER_IP} 'cd ${PROJECT_DIR} && docker-compose -f docker-compose.production.yml restart'"
echo "  🛑 Stop: ssh ${SSH_USER}@${SERVER_IP} 'cd ${PROJECT_DIR} && docker-compose -f docker-compose.production.yml down'"
echo "  📊 Status: ssh ${SSH_USER}@${SERVER_IP} 'cd ${PROJECT_DIR} && docker-compose -f docker-compose.production.yml ps'"
