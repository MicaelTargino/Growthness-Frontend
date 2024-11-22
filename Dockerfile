# Use Node.js 18.17.1 as the base image
FROM node:18.17.1-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js runtime to serve the app
FROM node:18.17.1-alpine

# Set the working directory
WORKDIR /app

# Copy the built React app from the previous stage
COPY --from=build /app/build ./build

# Install the `serve` package globally
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Use `serve` to serve the app in production mode
CMD ["serve", "-s", "build"]
