# Use an official Node.js 16 as a base image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the prisma schema from the correct location
COPY src/models/prisma ./prisma

# Install the Prisma CLI and generate the Prisma client
RUN apt-get update -y && apt-get install -y openssl
RUN npx prisma generate

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Specify the command to run your app
CMD ["npm", "run", "start"]
