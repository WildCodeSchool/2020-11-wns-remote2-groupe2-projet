# Base image
FROM node:alpine
# Make folder to put our files in
RUN mkdir -p /hermes/chat/api
# Set working directory so that all subsequent command runs in this folder
WORKDIR /hermes/chat/api
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
# Copy our app
COPY . .
RUN npm run migratedb
# Expose port to access server
EXPOSE 8080
# Command to run our app
CMD [ "npm", "run", "dev" ]