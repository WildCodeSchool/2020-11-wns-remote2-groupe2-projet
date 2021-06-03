const { ApolloServer } = require("apollo-server-express");
const http = require('http');
const express = require('express')
const cors = require('cors')
const { sequelize } = require("./models");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const contextMiddleware = require("./utils/contextMiddleware");
const app = express()
const socket = require("socket.io");
const httpServer = http.createServer(app);
const nodemailer = require('nodemailer');
const mailParticipationApproved = require('./mail/template')
const io = socket(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


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
  app.use(express.static('public'))
  app.use(express.urlencoded({
    extended: true
  }))

  app.post('/send', async (req, res) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }, tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: 'me',
      to: process.env.MAIL_USER,
      subject: 'Hermes - WildCodeSchool | Demande/Support',
      html: mailParticipationApproved({
        sujet: req.body.sujet,
        message: req.body.message,
      }),
    });
    res.status(200);
  });

  server.applyMiddleware({ app })
  server.installSubscriptionHandlers(httpServer)
  app.use(cors())

  // Socket connection
  await io.on('connection', socket => {
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
