import React, { useState, useEffect, useContext } from "react";

import { gql, useSubscription } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../../context/message";
import {
	Box,
	Container,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Text,
	Heading,
} from "@chakra-ui/react";

import Users from "./Users";
import Messages from "./Messages";
import Header from "./Header";
import OnCall from "./OnCall";
import Index from '../userInformations/index'
import { useQuery } from "@apollo/client";
import { AttachmentIcon, CalendarIcon, ChatIcon } from "@chakra-ui/icons";
import { SocketContext } from "../../context/socketContext";

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
			campus
			role
			email
			imageUrl
		}
	}
`;

export default function Home({ history }) {
	const messageDispatch = useMessageDispatch();
	const dispatch = useMessageDispatch();
	const { stream } = useContext(SocketContext)


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
		<Container
			maxW="90vw"
			maxH="90vh">
			<Tabs variant="enclosed" pt={5} maxW="1500px" m="auto">
				<TabList display="flex" justifyContent="space-between">
					<Box display="flex">
						<Tab border="none" minW={{ base: "", md: "100px" }} _focus="none" color="#39414f" _selected={{ bg: "rgba(255, 255, 255, 0.8)" }} fontWeight="600" ><ChatIcon w={5} h={5} /></Tab>
						<Tab border="none" minW={{ base: "", md: "100px" }} _focus="none" color="#39414f" _selected={{ bg: "rgba(255, 255, 255, 0.8)" }} fontWeight="600" ><CalendarIcon w={5} h={5} /></Tab>
						<Tab border="none" minW={{ base: "", md: "100px" }} _focus="none" color="#39414f" _selected={{ bg: "rgba(255, 255, 255, 0.8)" }} fontWeight="600" ><AttachmentIcon w={5} h={5} /></Tab>
					</Box>
					<Box display="flex">
						<Tab minW={{ base: "", md: "100px" }} _focus="none" color="#39414f" _selected={{ bg: "rgba(255, 255, 255, 0.8)" }} fontWeight="bold" >
							<Header />
						</Tab>
					</Box>
				</TabList>
				<TabPanels>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="rgba(255, 255, 255, 0.8)">
							<Heading fontSize="2xl" alignSelf="center" ml="2rem" fontWeight="600" color="#39414f">Hermes</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.5)"
							display="flex"
							height="75vh"
							borderBottomRadius="10px"
							flexDirection={{ base: "column", md: "row" }}
							justifyContent={{ base: "space-between" }}
						>
							<Users stream={stream} />
							{stream && <OnCall />}
							<Messages stream={stream} />
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="rgba(255, 255, 255, 0.8)">
							<Heading fontSize="2xl" ml="2rem" alignSelf="center" fontWeight="600" color="#39414f">Mon calendrier</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.8)"
							display="flex"
							height="75vh"
							borderBottomRadius="10px"
						>
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="rgba(255, 255, 255, 0.8)">
							<Heading fontSize="2xl" ml="2rem" alignSelf="center" fontWeight="600" color="#39414f">Mes fichiers</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.8)"
							display="flex"
							height="75vh"
							borderBottomRadius="10px"
						>
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="rgba(255, 255, 255, 0.8)">
							<Heading fontSize="2xl" ml="2rem" alignSelf="center" fontWeight="600" color="#39414f">Mon compte</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.8)"
							display="flex"
							height="75vh"
							borderBottomRadius="10px"
						>
							<Index user={user} />
						</Box>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container >
	);
}
