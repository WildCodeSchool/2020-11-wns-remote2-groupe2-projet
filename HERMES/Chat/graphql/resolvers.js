const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const { User } = require("../models");

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        // TODO validate input data
        if (email.trim() === "") errors.email = "Email must not be empty";
        if (username.trim() === "")
          errors.username = "Username must not be empty";
        if (password.trim() === "")
          errors.password = "Password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "Repeat must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";
        // TODO Check if username …
        const userByUsername = await User.findOne({ where: { username } });
        const userByEmail = await User.findOne({ where: { email } });

        if (userByUsername) errors.username = "Username is taken";
        if (userByEmail) errors.email = "Email is taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }
        // Hash password
        password = await bcrypt.hash(password, 6);
        // TODO Create user
        const user = await User.create({
          username,
          email,
          password,
        });
        // TODO Return user
        return user;
      } catch (err) {
        console.log(err);
        throw new UserInputError("Bad input", { errors: err });
      }
    },
  },
};
