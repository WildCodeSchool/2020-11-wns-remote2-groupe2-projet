const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

module.exports = (context) => {
	let token;
	if (context.req && context.req.headers.authorization) {
		token = context.req.headers.authorization.split("Bearer ")[1];
	} else if (context.connection && context.connection.context.Authorization) {
		token = context.connection.context.Authorization.split("Bearer ")[1];
	}

	if (token) {
		jwt.verify(token, process.env.PASSWORD_TOKEN, (err, decodedToken) => {
			context.user = decodedToken;
		});
	}

	context.pubsub = pubsub;

	return context;
};
