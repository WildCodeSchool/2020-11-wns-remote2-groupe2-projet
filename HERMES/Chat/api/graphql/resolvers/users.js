const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const path = require("path");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { createWriteStream } = require("fs");
const generateRandomString = require("../../utils/generateRandomString");

const { Message, User } = require("../../models");

module.exports = {
	Query: {
		getUsers: async (_, __, { user }) => {
			try {
				if (!user) throw new AuthenticationError("Unauthenticated");

				let users = await User.findAll({
					attributes: ["username", "campus", "role", "imageUrl", "createdAt"],
					where: { username: { [Op.ne]: user.username } },
				});

				const allUserMessages = await Message.findAll({
					where: {
						[Op.or]: [{ from: user.username }, { to: user.username }],
					},
					order: [["createdAt", "DESC"]],
				});

				users = users.map((otherUser) => {
					const latestMessage = allUserMessages.find(
						(m) => m.from === otherUser.username || m.to === otherUser.username,
					);
					otherUser.latestMessage = latestMessage;
					return otherUser;
				});

				return users;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		getMe: async (_, __, { user }) => {
			try {
				let me = await User.findOne({
					attributes: ["username", "email", "campus", "role", "imageUrl", "createdAt"],
					where: { username: user.username },
				});
				return me
			} catch (err) {
				console.log(err)
				throw err
			}
		},
		login: async (_, args) => {
			const { username, password } = args;
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
					errors.password = "password is incorrect";
					throw new UserInputError("password is incorrect", { errors });
				}

				const token = jwt.sign({ username }, process.env.PASSWORD_TOKEN, {
					expiresIn: 60 * 60,
				});

				return {
					...user.toJSON(),
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
			let { username, email, campus, role, password, confirmPassword, imageUrl } = args;
			const { createReadStream, filename } = await imageUrl;
			let errors = {};

			try {
				// Validate input data
				if (email.trim() === "") errors.email = "email must not be empty";
				if (username.trim() === "")
					errors.username = "username must not be empty";
				if (campus.trim() === "")
					errors.campus = "campus must not be empty";
				if (role.trim() === "")
					errors.role = "role must not be empty";
				if (password.trim() === "")
					errors.password = "password must not be empty";
				if (confirmPassword.trim() === "")
					errors.confirmPassword = "repeat password must not be empty";
				if (password !== confirmPassword)
					errors.confirmPassword = "passwords must match";

				// // Check if username / email exists
				// const userByUsername = await User.findOne({ where: { username } })
				// const userByEmail = await User.findOne({ where: { email } })

				// if (userByUsername) errors.username = 'Username is taken'
				// if (userByEmail) errors.email = 'Email is taken'

				if (Object.keys(errors).length > 0) {
					throw errors;
				}

				// Hash password
				password = await bcrypt.hash(password, 6);

				if (filename) {
					const { ext } = path.parse(filename);
					randomName = generateRandomString(12) + ext;
				}

				// Create user
				const user = await User.create({
					username,
					email,
					campus,
					role,
					password,
					imageUrl: imageUrl ? `/images/${randomName}` : "null",
				});

				if (imageUrl) {
					const stream = await createReadStream();
					const pathName = path.join(
						__dirname,
						`../../public/images/${randomName}`,
					);
					await stream.pipe(createWriteStream(pathName));
				}

				return user;
			} catch (err) {
				console.log(err);
				if (err.name === "SequelizeUniqueConstraintError") {
					err.errors.forEach(
						(e) => (errors[e.path] = `${e.path} is already taken`),
					);
				} else if (err.name === "SequelizeValidationError") {
					err.errors.forEach((e) => (errors[e.path] = e.message));
				}
				throw new UserInputError("Bad input", { errors });
			}
		},

		update: async (_, args, { user }) => {
			const { email, campus, imageUrl } = args;
			let errors = {};
			let newImageUrl = false

			try {
				// Validate input data				
				if (email.trim() === "") errors.email = "email must not be empty";
				if (campus.trim() === "") errors.campus = "campus must not be empty";
				if (typeof imageUrl === "object") newImageUrl = await imageUrl
				if (Object.keys(errors).length > 0) {
					throw errors;
				}

				if (newImageUrl) {
					const { ext } = path.parse(newImageUrl.filename);
					randomName = generateRandomString(12) + ext;
				}

				const updatedUser = await User.update({ email, campus, imageUrl: newImageUrl ? `/images/${randomName}` : imageUrl }, { where: { username: user.username } });

				//TODO : Fix
				if (newImageUrl) {
					const stream = await newImageUrl.createReadStream();
					const pathName = path.join(
						__dirname,
						`../../public/images/${randomName}`,
					);
					await stream.pipe(createWriteStream(pathName));
				}


				return updatedUser;
			} catch (err) {
				console.log(err, err);
				if (err.name === "SequelizeUniqueConstraintError") {
					err.errors.forEach(
						(e) => (errors[e.path] = `${e.path} is already taken`),
					);
				} else if (err.name === "SequelizeValidationError") {
					err.errors.forEach((e) => (errors[e.path] = e.message));
				}
				throw new UserInputError("Bad input", { errors });
			}
		},
	},
};
