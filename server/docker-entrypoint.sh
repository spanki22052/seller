#!/bin/sh
set -e

echo "Waiting for database to be ready..."
# Extract DB host from DATABASE_URL or use default
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
npx prisma migrate deploy

echo "Generating Prisma Client..."
npx prisma generate

echo "Starting application..."
exec "$@"


