# Use the official Node.js image as the base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the server application files to the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server using PM2
CMD ["pm2-runtime", "server.js"]