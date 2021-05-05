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
  app.use(express.static('public'))
  server.applyMiddleware({ app })

  const httpServer = http.createServer(app);
  const io = require('socket.io')(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
  app.use(cors())
  server.installSubscriptionHandlers(httpServer)

  // Socket connection
  io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal)
    });
  });

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
