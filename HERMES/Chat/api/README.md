### sequelize <command>

Commands:
sequelize db:migrate Run pending migrations
sequelize db:migrate:schema:timestamps:add Update migration table to have timestamps
sequelize db:migrate:status List the status of all migrations
sequelize db:migrate:undo Reverts a migration
sequelize db:migrate:undo:all Revert all migrations ran
sequelize db:seed Run specified seeder
sequelize db:seed:undo Deletes data from the database
sequelize db:seed:all Run every seeder
sequelize db:seed:undo:all Deletes data from the database
sequelize db:create Create database specified by configuration
sequelize db:drop Drop database specified by configuration
sequelize init Initializes project
sequelize init:config Initializes configuration
sequelize init:migrations Initializes migrations
sequelize init:models Initializes models
sequelize init:seeders Initializes seeders
sequelize migration:generate Generates a new migration file [aliases: migration:create]
sequelize model:generate Generates a model and its migration [aliases: model:create]
sequelize seed:generate Generates a new seed file [aliases: seed:create]

# graphql commandes for users acces 

query login {
  login(username: "bateau", password: "123456") {
    username
    email
    createdAt
    token
  }
}

mutation createUser {
  register(
    username: ""
    email: ""
    password: ""
    confirmPassword: ""
  ) {
    username
    email
    createdAt
    token
  }
}

query getUsers {
  getUsers {
    username
    email
    createdAt
  }
}

mutation sendMessage {
  sendMessage(to: "", content: "") {
    uuid
    content
    from
    }
  }

// subscription

subscription newMessage{
  newMessage {
    uuid
    from
    content
    to
    createdAt
  }
}

subscription newReaction{
  newReaction {
    uuid
    content
    createdAt
    Message {
      uuid
      content
    }
  }
}



# graphql  header commandes for users acces 

{
  "Authorization": "Bearer {replace here your users token }" }
