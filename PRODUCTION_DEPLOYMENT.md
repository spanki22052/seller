# 🚀 Production Deployment Guide

## Server: 62.181.53.211

This guide will help you deploy the Seller application to production on the server 62.181.53.211.

## 📋 Prerequisites

- SSH access to server `62.181.53.211`
- Root or sudo access on the server
- `.env.production` file configured

## 🔧 Environment Setup

1. **Copy the production environment template:**

   ```bash
   cp .env.production.example .env.production
   ```

2. **Edit `.env.production` with your production values:**

   - Set strong passwords for database and MinIO
   - Configure JWT secrets (at least 32 characters)
   - Update CORS origins if needed

   **Important security settings:**

   ```env
   DB_PASSWORD=CHANGE_THIS_STRONG_PASSWORD
   MINIO_ACCESS_KEY=CHANGE_THIS_MINIO_ACCESS_KEY
   MINIO_SECRET_KEY=CHANGE_THIS_MINIO_SECRET_KEY_MIN_8_CHARS
   JWT_SECRET=CHANGE_THIS_JWT_SECRET_AT_LEAST_32_CHARS
   ```

## 🚀 Deployment

### Option 1: Automated Deployment (Recommended)

```bash
# Make sure .env.production is configured
./deploy-production.sh
```

This script will:

- Update server packages
- Install Docker and Docker Compose
- Copy project files to server
- Build and start all services
- Show service URLs

### Option 2: Manual Deployment

1. **Connect to server:**

   ```bash
   ssh root@62.181.53.211
   ```

2. **Setup server:**

   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install Docker
   apt install -y docker.io docker-compose curl wget
   systemctl enable docker && systemctl start docker

   # Create project directory
   mkdir -p /opt/seller && cd /opt/seller
   ```

3. **Copy files to server:**

   ```bash
   # From your local machine
   rsync -avz --exclude='.git' --exclude='node_modules' --exclude='.env*' ./ root@62.181.53.211:/opt/seller/
   scp .env.production root@62.181.53.211:/opt/seller/.env.production
   ```

4. **Deploy on server:**

   ```bash
   cd /opt/seller

   # Load environment
   export $(cat .env.production | xargs)
   cp .env.production .env

   # Deploy
   docker-compose -f docker-compose.production.yml up -d --build
   ```

## 🌐 Service URLs

After successful deployment, your services will be available at:

- **Backend API:** http://62.181.53.211:3002
- **Backend Health Check:** http://62.181.53.211:3002/health
- **Main Client (Next.js):** http://62.181.53.211:3000
- **Admin Client (React):** http://62.181.53.211:3001
- **MinIO Console:** http://62.181.53.211:9001

## 🔍 Monitoring & Logs

### Check service status:

```bash
ssh root@62.181.53.211
cd /opt/seller
docker-compose -f docker-compose.production.yml ps
```

### View logs:

```bash
# All services
docker-compose -f docker-compose.production.yml logs -f

# Specific service
docker-compose -f docker-compose.production.yml logs -f backend
```

### Restart services:

```bash
docker-compose -f docker-compose.production.yml restart
```

### Update deployment:

```bash
# Stop services
docker-compose -f docker-compose.production.yml down

# Pull latest changes (if using git)
git pull

# Rebuild and start
docker-compose -f docker-compose.production.yml up -d --build
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Port conflicts:**

   - Check if ports 3000-3002, 5432, 9000-9001 are available
   - Use `netstat -tulpn | grep :3000` to check

2. **Database migration issues (P3005: Schema not empty):**

   - This occurs when deploying to an existing database with schema
   - **Solution:** Mark all migrations as applied:

     ```bash
     # Connect to running backend container
     docker exec -it seller_backend bash

     # Mark all migrations as applied
     for migration in $(ls prisma/migrations | grep -E '^[0-9]' | sort); do
       npx prisma migrate resolve --applied $migration
     done

     # Exit container and restart
     exit
     docker-compose restart backend
     ```

3. **Database connection issues:**

   - Verify PostgreSQL is running: `docker-compose -f docker-compose.production.yml logs postgres`
   - Check database credentials in `.env.production`

4. **MinIO issues:**

   - Check MinIO logs: `docker-compose -f docker-compose.production.yml logs minio`
   - Verify MinIO credentials

5. **Build failures:**
   - Check Docker build logs
   - Ensure all dependencies are available

### Health Checks:

- Backend health: `curl http://62.181.53.211:3002/health`
- Database: `docker-compose -f docker-compose.production.yml exec postgres pg_isready`

## 🔒 Security Notes

- Change all default passwords in `.env.production`
- Use strong JWT secrets (minimum 32 characters)
- Consider enabling SSL/HTTPS in production
- Regularly update server packages
- Monitor logs for security issues

## 📞 Support

If deployment fails, check:

1. Server connectivity: `ping 62.181.53.211`
2. SSH access: `ssh root@62.181.53.211`
3. Docker installation: `docker --version`
4. Environment file: `cat .env.production`

For issues, check logs and ensure all prerequisites are met.
