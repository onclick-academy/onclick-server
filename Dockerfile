# Use an official Node.js 16 as a base image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /app

# Install Python and other necessary packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    openssl \
    build-essential \
    postgresql-client

# Set Python3 as the default python version for node-gyp
ENV PYTHON=/usr/bin/python3

# Optionally, configure npm to use the installed Python version
RUN npm config set python /usr/bin/python3

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the prisma schema from the correct location
COPY src/models/prisma ./prisma

# Install the Prisma CLI and generate the Prisma client
RUN npx prisma generate

# Copy the rest of your application code
COPY . .


# Expose the port your app runs on
EXPOSE 3000

# Specify the command to run your app
CMD ["npm", "run", "start"]
