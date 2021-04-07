# Base image
FROM node:latest
# Make folder to put our files in
RUN mkdir -p /hermes/chat/client
# Set working directory so that all
WORKDIR /hermes/chat/client
# Copy package json and install dependencies
COPY package*.json ./
RUN npm rebuild node-sass
RUN npm install --silent
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 3000
# Command to run our app
CMD [ "npm", "start" ]