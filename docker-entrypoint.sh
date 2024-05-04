#!/bin/sh

# Wait for the database to be ready
until npx prisma migrate deploy; do
  echo "Retrying migrations..."
  sleep 2
done

# Start the application
exec "$@"