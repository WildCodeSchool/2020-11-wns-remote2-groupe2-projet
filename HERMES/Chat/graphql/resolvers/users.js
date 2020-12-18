const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { User, Message } = require("../../models");

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        const users = await User.findAll({
          where: { username: { [Op.ne]: user.username } },
        });
        return users;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    login: async (_, args) => {
      const { username, password } = await args;
      let errors = {};
      try {
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password === "") errors.password = "password must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors });
        }

        const user = await User.findOne({
          where: { username },
        });
        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password incorrect";
          throw new UserInputError("password incorrect", { errors });
        }
        const token = jwt.sign({ username }, process.env.PASSWORD_TOKEN, {
          expiresIn: 60 * 60,
        });
        console.log(token);
        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        // Validate input data
        if (email.trim() === "") errors.email = "Email must not be empty";
        if (username.trim() === "") {
          errors.username = "Username must not be empty";
        }
        if (password.trim() === "") {
          errors.password = "Password must not be empty";
        }
        if (confirmPassword.trim() === "") {
          errors.confirmPassword = "Repeat must not be empty";
        }
        if (password !== confirmPassword) {
          errors.confirmPassword = "passwords must match";
        }

        // Check username or email already exist
        // const userByUsername = await User.findOne({ where: { username } });
        // const userByEmail = await User.findOne({ where: { email } });
        // if (userByUsername) errors.username = "Username is taken";
        // if (userByEmail) errors.email = "Email is taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        // Hash password
        password = await bcrypt.hash(password, 6);
        // Create user
        const user = await User.create({
          username,
          email,
          password,
        });
        // Return user
        return user;
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.path} already taken`)
          );
        } else if (err.name === "SequelizeValidationError") {
          err.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError("Bad input", { errors });
      }
    },
  },
};
