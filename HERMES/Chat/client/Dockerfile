# pull the official base image
FROM node:alpine3.11
# set working direction
WORKDIR /hermes/chat/client
# add `/app/node_modules/.bin` to $PATH
ENV PATH /chat/client/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
RUN yarn install --force 
# add app
COPY . ./
EXPOSE 3000
# start app
CMD ["npm", "start"]