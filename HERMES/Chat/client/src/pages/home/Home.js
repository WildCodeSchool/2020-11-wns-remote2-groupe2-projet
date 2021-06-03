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
import '../../App.scss'
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
	const {
		stream, setStream
	} = useContext(SocketContext)

	const onCalling = () => {
		setStream(false)
	}

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
			maxH="90vh"
		>
			<Tabs variant="enclosed" pt={5} maxW="1500px" m="auto">
				<TabList display="flex" justifyContent="space-between">
					<Box display="flex">
						<Tab _focus="none" color="white" _selected={{ color: "#39414f", bg: "#E9E7E1" }} fontWeight="600" w="9vw"><ChatIcon w={5} h={5} /></Tab>
						<Tab _focus="none" color="white" _selected={{ color: "#39414f", bg: "#E9E7E1" }} fontWeight="600" w="9vw"><CalendarIcon w={5} h={5} /></Tab>
						<Tab _focus="none" color="white" _selected={{ color: "#39414f", bg: "#E9E7E1" }} fontWeight="600" w="9vw"><AttachmentIcon w={5} h={5} /></Tab>
					</Box>
					<Box>
						<Tab _focus="none" color="white" _selected={{ bg: "#E9E7E1" }} fontWeight="bold" w="9vw">
							<Header />
						</Tab>
					</Box>
				</TabList>
				<TabPanels>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="#E9E7E1">
							<Heading fontSize="2xl" mt="10px" ml="2rem" fontWeight="600">Hermes</Heading>
						</Box>
						<Box
							bg="#6B7383"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
							<Users onCalling={onCalling} stream={stream} />
							{stream &&
								<OnCall />}
							<Messages stream={stream} />
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="#E9E7E1">
							<Heading fontSize="2xl" ml="2rem" mt="10px" fontWeight="600">Mon calendrier</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="#E9E7E1">
							<Heading fontSize="2xl" ml="2rem" mt="10px" fontWeight="600">Mes fichiers</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
						</Box>
					</TabPanel>
					<TabPanel p={0}>
						<Box height="3rem" display="flex" bg="#E9E7E1">
							<Heading fontSize="2xl" ml="2rem" mt="10px" fontWeight="600">Mon compte</Heading>
						</Box>
						<Box
							bg="rgba(255, 255, 255, 0.7)"
							display="flex"
							height="85vh"
							borderBottomRadius="10px"
						>
							<Index />
						</Box>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container >
	);
}
