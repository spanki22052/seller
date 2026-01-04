# Development stage
FROM node:20-alpine AS development

# Install OpenSSL, PostgreSQL client and other dependencies for Prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat postgresql-client

WORKDIR /app

# Set Prisma to use library engine (more compatible with Alpine)
ENV PRISMA_CLIENT_ENGINE_TYPE=library

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Copy entrypoint script for development and set permissions
COPY docker-entrypoint-dev.sh /app/docker-entrypoint-dev.sh
RUN chmod +x /app/docker-entrypoint-dev.sh

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3002

# Development command with entrypoint
ENTRYPOINT ["/app/docker-entrypoint-dev.sh"]
CMD ["npm", "run", "start:dev"]

# Build stage
FROM node:20-alpine AS builder

# Install OpenSSL, PostgreSQL client and other dependencies for Prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat postgresql-client

WORKDIR /app

# Set Prisma to use library engine (more compatible with Alpine)
ENV PRISMA_CLIENT_ENGINE_TYPE=library

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install OpenSSL, PostgreSQL client and other dependencies for Prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat postgresql-client

WORKDIR /app

ENV NODE_ENV=production
ENV PRISMA_CLIENT_ENGINE_TYPE=library

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy necessary files from builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh && chown nestjs:nodejs /app/docker-entrypoint.sh

USER nestjs

EXPOSE 3002

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"]

