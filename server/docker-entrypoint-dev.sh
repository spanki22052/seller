#!/bin/sh
set -e

echo "Waiting for database to be ready..."
# Extract DB credentials from DATABASE_URL or use defaults
DB_HOST=${DATABASE_URL#*@}
DB_HOST=${DB_HOST%%:*}
DB_HOST=${DB_HOST:-postgres}

# Wait for postgres to be ready
until pg_isready -h "$DB_HOST" -p 5432 > /dev/null 2>&1; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready!"

echo "Running database migrations..."
# Deploy migrations (idempotent - safe to run multiple times)
npx prisma migrate deploy

echo "Generating Prisma Client..."
npx prisma generate

echo "Starting development server..."
exec "$@"

