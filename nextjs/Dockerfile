# Use an official Node.js image as the base image
FROM node:21-alpine AS base

# Set the working directory
WORKDIR /nextjs

# Copy package.json and package-lock.json to the working directory
COPY /nextjs/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY nextjs/ .

# Start the application in development mode
CMD ["npm", "run", "dev"]
