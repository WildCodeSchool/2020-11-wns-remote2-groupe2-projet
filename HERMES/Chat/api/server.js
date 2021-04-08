const { ApolloServer } = require("apollo-server-express");
const http = require('http');
const express = require('express')
const cors = require('cors')
const { sequelize } = require("./models");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const contextMiddleware = require("./utils/contextMiddleware");


async function startApolloServer() {

  const PORT = 4000

  // ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextMiddleware,
  });
  await server.start();

  // Express Server
  const app = express()
  app.use(cors())
  app.use(express.static('public'))
  server.applyMiddleware({ app })

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer)

  // Starting
  await new Promise(resolve => httpServer.listen(PORT, resolve));
  sequelize
    .authenticate()
    .then(() => console.log("Database connected !!"))
    .catch((err) => console.log(err));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  return { server, app, httpServer };
}

startApolloServer()
