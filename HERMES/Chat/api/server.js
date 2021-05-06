const { ApolloServer } = require("apollo-server-express");
const http = require('http');
const express = require('express')
const cors = require('cors')
const { sequelize } = require("./models");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const contextMiddleware = require("./utils/contextMiddleware");
const socket = require("socket.io");


async function startApolloServer() {

  const PORT = 4000
  const users = {};
  // ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextMiddleware,
  });
  await server.start();

  // Express Server
  const app = express()
  app.use(express.static('public'))

  server.applyMiddleware({ app })

  const httpServer = http.createServer(app);
  app.use(cors())
  const io = socket(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  server.installSubscriptionHandlers(httpServer)

  // Socket connection
  io.on('connection', socket => {
    console.log("SOCKETID", socket.id)
    if (!users[socket.id]) {
      users[socket.id] = socket.id;
    }
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
      delete users[socket.id];
    })

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
    })

    socket.on("acceptCall", (data) => {
      io.to(data.to).emit('callAccepted', data.signal);
    })
  });

  await new Promise(resolve => httpServer.listen(PORT, resolve));
  // Starting
  sequelize
    .authenticate()
    .then(() => console.log("Database connected !!"))
    .catch((err) => console.log(err));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  return { server, app, httpServer };
}

startApolloServer()
