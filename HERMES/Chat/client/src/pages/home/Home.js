import React, { useState, useEffect } from "react";

import { gql, useSubscription } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../../context/message";
import {
	Box,
	Spinner,
	Container,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from "@chakra-ui/react";

import Users from "./Users";
import Messages from "./Messages";
import Header from "./Header";
import OnCall from "./OnCall";
import '../../App.scss'
import { useQuery } from "@apollo/client";
import { AttachmentIcon, CalendarIcon, ChatIcon } from "@chakra-ui/icons";
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


const GET_USERS = gql`
	query getUsers {
		getUsers {
			username
			campus
			role
			createdAt
			imageUrl
			latestMessage {
				uuid
				from
				to
				content
				createdAt
			}
		}
	}
`;

export default function Home({ history }) {
	const [calling, setCalling] = useState(false)
	const messageDispatch = useMessageDispatch();
	const dispatch = useMessageDispatch();

	const onCalling = (username) => {
		setCalling(username)
	}
	const { user } = useMessageState();

	const { data: usersData } = useQuery(GET_USERS, {
		onCompleted: (data) =>
			dispatch({ type: "SET_USERS", payload: data.getUsers }),
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
		<Container
			maxW="90vw"
			maxH="90vh"
		>
			<Tabs variant="enclosed" pt={5} maxW="1500px" m="auto">
				<TabList display="flex" justifyContent="space-between">
					<Box display="flex">
						<Tab _focus="none" color="white" _selected={{ color: "#39414f", bg: "#E9E7E1" }} fontWeight="bold" w="9vw"><ChatIcon w={5} h={5} /></Tab>
						<Tab _focus="none" color="white" _selected={{ color: "#39414f", bg: "#E9E7E1" }} fontWeight="bold" w="9vw"><CalendarIcon w={5} h={5} /></Tab>
						<Tab _focus="none" color="white" _selected={{ color: "#39414f", bg: "#E9E7E1" }} fontWeight="bold" w="9vw"><AttachmentIcon w={5} h={5} /></Tab>
					</Box>
					<Box>
						<Header />
					</Box>
				</TabList>
				<TabPanels>
					<TabPanel p={0}>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
							<Users onCalling={onCalling} calling={calling} />
							{calling && <Container
								bg="rgba(255, 255, 255, 0.7)"
								display="flex"
								height="85vh"
								width="50%"
								borderBottomRadius="10px"
								m={0}>
								<OnCall calling={calling} />
							</Container >}
							<Messages calling={calling} />
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
						</Box>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container >
	);
}
