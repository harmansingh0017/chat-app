# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install client-side dependencies
RUN npm install

# Copy the rest of the client application code
COPY . .

# Build the client application
RUN npm run build

# Use a smaller Nginx image as the final image
FROM nginx:alpine

# Copy the built client application from the build stage to the Nginx directory
COPY --from=build /app/client/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

