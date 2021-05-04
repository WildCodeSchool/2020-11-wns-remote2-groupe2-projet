const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String
    campus: String!
    createdAt: String!
    token: String
    imageUrl: String!
    latestMessage: Message
  }
  type Message {
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
    reactions: [Reaction]
  }
  type Reaction {
    uuid: String!
    content: String!
    createdAt: String!
    message: Message!
    user: User!
  }
  type Query {
    getUsers: [User]!
    getMe: User!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }
  type Mutation {
    register(
      username: String!
      email: String
      campus: String!
      password: String!
      confirmPassword: String!
      imageUrl: Upload!
    ): User!
    sendMessage(to: String!, content: String!): Message!
    reactToMessage(uuid: String!, content: String!): Reaction!
  }
  type Subscription {
    newMessage: Message!
    newReaction: Reaction!
  }
`;
