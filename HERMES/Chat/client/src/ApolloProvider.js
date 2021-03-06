import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider as Provider,
	split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

let uploadLink = createUploadLink({
	uri: `http://localhost:4000/graphql`,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000/graphql`,
	options: {
		reconnect: true,
		connectionParams: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(uploadLink),
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
	return <Provider client={client} {...props} />;
}
