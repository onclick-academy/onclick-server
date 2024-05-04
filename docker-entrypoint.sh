#!/bin/sh

echo "Using database URL: $DATABASE_URL"

# Wait for the database to be ready
until pg_isready -h onclick-postgres -U onclick-user -d onclick; do
  echo "Waiting for the database to be ready..."
  sleep 0.1
done

# Apply database migrations
until npx prisma migrate deploy --schema ./prisma/schema.prisma; do
  echo "Retrying migrations..."
  sleep 0.1
done

# Start the application
exec "$@"
