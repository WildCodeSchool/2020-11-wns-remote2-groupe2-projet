import React, { Fragment, useEffect } from "react";

import { gql, useSubscription } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../../context/message";
import {
	Box,
	Spinner,
	Container,
} from "@chakra-ui/react";

import Users from "./Users";
import Messages from "./Messages";
import Header from "./Header";
import '../../App.scss'
import { useQuery } from "@apollo/client";
const NEW_MESSAGE = gql`
	subscription newMessage {
		newMessage {
			uuid
			from
			to
			content
			createdAt
		}
	}
`;

const NEW_REACTION = gql`
	subscription newReaction {
		newReaction {
			uuid
			content
			message {
				uuid
				from
				to
			}
		}
	}
`;


const GET_ME = gql`
	query getMe {
		getMe {
			username
			email
			imageUrl
		}
	}
`;

export default function Home({ history }) {
	const messageDispatch = useMessageDispatch();
	const dispatch = useMessageDispatch();
	const { user } = useMessageState();
	const { loading } = useQuery(GET_ME, {
		onCompleted: (data) =>
			dispatch({ type: "SET_USER_PROFIL", payload: data.getMe }),
		onError: (err) => console.log(err),
	});

	const { data: messageData, error: messageError } = useSubscription(
		NEW_MESSAGE,
	);

	const { data: reactionData, error: reactionError } = useSubscription(
		NEW_REACTION,
	);



	useEffect(() => {
		if (messageError) console.log(messageError);
		if (messageData) {
			const message = messageData.newMessage;
			const otherUser =
				user.username === message.to ? message.from : message.to;

			messageDispatch({
				type: "ADD_MESSAGE",
				payload: {
					username: otherUser,
					message,
				},
			});
		}
	}, [messageError, messageData]);

	useEffect(() => {
		if (reactionError) console.log(reactionError);

		if (reactionData) {
			const reaction = reactionData.newReaction;
			const otherUser =
				user.username === reaction.message.to
					? reaction.message.from
					: reaction.message.to;

			messageDispatch({
				type: "ADD_REACTION",
				payload: {
					username: otherUser,
					reaction,
				},
			});
		}
	}, [reactionError, reactionData, user, messageDispatch]);



	return (
		<Fragment>
			<Container
				maxW="90vw"
				maxH="90vh"
			>
				<Header />
				{loading ? <Spinner
					thickness="3px"
					speed="0.70s"
					emptyColor="gray.200"
					color="#39414f"
					size="xl"
					position="absolute"
					top="50%"
					left="50%"
				/> : (
					<Fragment>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							border-radius="10px"
							display="flex"
							height="85vh"
							borderRadius="10px"
						>
							<Users />
							<Messages />
						</Box>
					</Fragment>
				)}
			</Container >

		</Fragment>
	);
}
