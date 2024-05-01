# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY ./prisma ./prisma

COPY ./.env ./

RUN npm install
RUN npx prisma generate

# Expose the port your Express server listens on (e.g., 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
