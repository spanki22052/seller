#!/bin/bash
set -e

# Nginx Setup Script for Seller Application
# This script configures Nginx as a reverse proxy with SSL for the Seller application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables (customize these)
DOMAIN_NAME=${DOMAIN_NAME:-""}  # Leave empty for IP-only setup
SERVER_IP=${SERVER_IP:-""}      # Will be detected if not provided
EMAIL=${EMAIL:-"admin@example.com"}  # For SSL certificates

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

# Detect server IP if not provided
if [ -z "$SERVER_IP" ]; then
    SERVER_IP=$(curl -s ifconfig.me)
    print_info "Detected server IP: $SERVER_IP"
fi

print_info "Starting Nginx setup for Seller Application"
print_info "Domain: ${DOMAIN_NAME:-$SERVER_IP}"
print_info "Email: $EMAIL"

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
print_status "Installing Nginx and Certbot..."
apt install -y nginx certbot python3-certbot-nginx curl wget ufw

# Stop default Nginx to configure properly
systemctl stop nginx

# Backup default configuration
print_status "Backing up default Nginx configuration..."
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup

# Create Nginx configuration for Seller application
print_status "Creating Nginx configuration..."

if [ -n "$DOMAIN_NAME" ]; then
    SERVER_NAME="$DOMAIN_NAME"
    SSL_CERT="ssl_certificate /etc/letsencrypt/live/$DOMAIN_NAME/fullchain.pem;"
    SSL_CERT_KEY="ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_NAME/privkey.pem;"
else
    SERVER_NAME="$SERVER_IP"
    SSL_CERT=""
    SSL_CERT_KEY=""
fi

cat > /etc/nginx/sites-available/seller << EOF
# Upstream definitions for load balancing (future-proofing)
upstream backend_api {
    server 127.0.0.1:3002;
}

upstream client_app {
    server 127.0.0.1:3000;
}

upstream admin_app {
    server 127.0.0.1:3001;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name $SERVER_NAME;
    return 301 https://\$server_name\$request_uri;
}

# HTTPS server block
server {
    listen 443 ssl http2;
    server_name $SERVER_NAME;

    $SSL_CERT
    $SSL_CERT_KEY

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.$DOMAIN_NAME;" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Main application (Next.js client)
    location / {
        proxy_pass http://client_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Admin panel
    location /admin {
        proxy_pass http://admin_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # API routes
    location /api {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;

        # API-specific headers
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type, Accept" always;
    }

    # MinIO object storage (optional, for direct access)
    location /minio {
        proxy_pass http://127.0.0.1:9001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Security: Block access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

print_status "Nginx configuration created"

# Enable the site
print_status "Enabling Seller site..."
ln -sf /etc/nginx/sites-available/seller /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
print_status "Testing Nginx configuration..."
if nginx -t; then
    print_status "Nginx configuration is valid ✓"
else
    print_error "Nginx configuration test failed!"
    exit 1
fi

# Configure SSL certificates
if [ -n "$DOMAIN_NAME" ]; then
    print_status "Setting up SSL certificates for $DOMAIN_NAME..."

    # Stop Nginx for Certbot
    systemctl stop nginx

    # Obtain SSL certificate
    certbot certonly --standalone \
        --non-interactive \
        --agree-tos \
        --email $EMAIL \
        -d $DOMAIN_NAME

    if [ $? -eq 0 ]; then
        print_status "SSL certificate obtained successfully ✓"
    else
        print_warning "SSL certificate setup failed. Continuing with HTTP only..."
        # Remove SSL directives from config if certbot failed
        sed -i '/ssl_certificate/d' /etc/nginx/sites-available/seller
        sed -i '/ssl_/d' /etc/nginx/sites-available/seller
        sed -i 's/listen 443 ssl http2;/listen 80;/' /etc/nginx/sites-available/seller
        sed -i '/return 301 https:/d' /etc/nginx/sites-available/seller
    fi
else
    print_warning "No domain specified. Running in HTTP-only mode."
    print_info "To enable HTTPS later, run: certbot --nginx -d yourdomain.com"
fi

# Configure firewall
print_status "Configuring firewall..."
ufw --force enable
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Direct client access (optional)
ufw allow 3001/tcp  # Direct admin access (optional)
ufw allow 3002/tcp  # Direct API access (optional)

print_status "Firewall configured"

# Start Nginx
print_status "Starting Nginx..."
systemctl enable nginx
systemctl start nginx

# Verify services
print_status "Verifying Nginx status..."
if systemctl is-active --quiet nginx; then
    print_status "Nginx is running ✓"
else
    print_error "Nginx failed to start!"
    exit 1
fi

# Setup automatic SSL renewal
if [ -n "$DOMAIN_NAME" ] && [ -d "/etc/letsencrypt/live/$DOMAIN_NAME" ]; then
    print_status "Setting up SSL certificate auto-renewal..."
    (crontab -l ; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    print_status "SSL auto-renewal configured ✓"
fi

# Print completion message
print_status ""
print_status "🎉 Nginx setup completed successfully!"
print_status ""
print_info "Application URLs:"
if [ -n "$DOMAIN_NAME" ]; then
    echo "  🌐 Main Site: https://$DOMAIN_NAME"
    echo "  🔧 Admin Panel: https://$DOMAIN_NAME/admin"
    echo "  🔌 API: https://$DOMAIN_NAME/api"
    echo "  📦 MinIO Console: https://$DOMAIN_NAME/minio"
else
    echo "  🌐 Main Site: http://$SERVER_IP"
    echo "  🔧 Admin Panel: http://$SERVER_IP/admin"
    echo "  🔌 API: http://$SERVER_IP/api"
    echo "  📦 MinIO Console: http://$SERVER_IP/minio"
fi
print_status ""
print_info "Direct access (for debugging):"
echo "  Backend API: http://$SERVER_IP:3002"
echo "  Client: http://$SERVER_IP:3000"
echo "  Admin: http://$SERVER_IP:3001"
echo "  MinIO: http://$SERVER_IP:9001"
print_status ""
print_info "Next steps:"
echo "  1. Update your DNS to point $DOMAIN_NAME to $SERVER_IP (if using domain)"
echo "  2. Test all URLs to ensure they're working"
echo "  3. Configure monitoring and backups"
print_status ""
print_info "Useful commands:"
echo "  nginx -t                    # Test configuration"
echo "  systemctl reload nginx      # Reload configuration"
echo "  certbot renew               # Renew SSL certificates"
echo "  tail -f /var/log/nginx/access.log  # Monitor access logs"
