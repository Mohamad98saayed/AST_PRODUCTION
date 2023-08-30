# Use the official Node.js image as the base image
FROM node as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the client application files to the container
COPY . .

# Build the React app
RUN npm run build