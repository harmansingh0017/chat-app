# Use the official Node.js image as the base image
FROM node:12

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the client code to the container
COPY . .

EXPOSE 5000


# Command to start the app
CMD [ "npm", "start" ]

