# Base image
FROM node:alpine
# Make folder to put our files in
RUN mkdir -p /hermes/chat
RUN mkdir -p /hermes/chat/client
# Set working directory so that all
# subsequent command runs in this folder
WORKDIR /hermes/chat/client
# Copy package json and install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn add node-sass
RUN npm install --silent
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 3000
# Command to run our app
CMD [ "npm", "start" ]