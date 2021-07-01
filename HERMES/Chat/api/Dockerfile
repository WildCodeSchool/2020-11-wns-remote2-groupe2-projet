
FROM node:alpine3.11
# set working direction
WORKDIR /hermes/chat/api
# add `/app/node_modules/.bin` to $PATH
ENV PATH hermes/chat/api/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
RUN yarn add sequelize

RUN yarn install --force 

# add app
COPY . ./
EXPOSE 3000
# start app
CMD ["yarn", "start"]