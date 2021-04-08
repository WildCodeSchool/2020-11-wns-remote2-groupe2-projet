import React, { Fragment, useEffect } from "react";

import { gql, useSubscription } from "@apollo/client";

import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";
import {
	Box,
	Image,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Container,
	Text,
} from "@chakra-ui/react";

import Users from "./Users";
import Messages from "./Messages";
import logOut from "../../../src/img/logout-svg.png";
import "../../App.scss";

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

export default function Home({ history }) {
	const authDispatch = useAuthDispatch();
	const messageDispatch = useMessageDispatch();

	const { user } = useAuthState();

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
	}, [messageError, messageData, user.username, messageDispatch]);

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
	}, [reactionError, reactionData, user.username, messageDispatch]);

	const logout = () => {
		authDispatch({ type: "LOGOUT" });
		window.location.href = "/login";
	};

	return (
		<Fragment>
			<Tabs
				isFitted
				variant="enclosed-colored"
				size="lg"
				position="relative"
				top="210px"
			>
				<Box>
					<Container maxWidth="xl">
						<TabList color="white">
							<Tab
								fontSize="2xl"
								fontWeight={600}
								color="#39414f"
								border="1px"
								borderColor="#39414f"
								bg="transparent"
								_selected={{
									color: "white",
									bg: "#39414f",
									boxShadow: "none",
								}}
							>
								CHAT
							</Tab>
							<Tab
								fontSize="2xl"
								fontWeight={600}
								color="#39414f"
								border="1px"
								borderColor="#39414f"
								bg="transparent"
								_selected={{
									color: "white",
									bg: "#39414f",
									boxShadow: "none",
								}}
							>
								VISIO
							</Tab>
						</TabList>
					</Container>
				</Box>
				<TabPanels>
					<TabPanel p={0}>
						<Box
							bg="#39414f"
							width="203%"
							marginTop="-1px"
							position="relative"
							right="264px"
							height="6vh"
						>
							<Box display="inline-block">
								<Image
									onClick={logout}
									width="58%"
									display="flex"
									position="relative"
									top="14px"
									left="34px"
									src={logOut}
									alt="logout"
									cursor="pointer"
								/>
							</Box>
						</Box>
						<Container maxWidth="4xl">
							<Box
								bg="rgba(255, 255, 255, 0.7)"
								border-radius="10px"
								display="flex"
								position="relative"
								width="217%"
								right="281px"
							>
								<Users />
								<Messages />
							</Box>
						</Container>
					</TabPanel>
					<TabPanel p={0}>
						<Box
							bg="#39414f"
							width="203%"
							marginTop="-1px"
							position="relative"
							right="264px"
							height="6vh"
						>
							<Box display="inline-block">
								<Image
									onClick={logout}
									width="58%"
									display="flex"
									position="relative"
									top="14px"
									left="34px"
									src={logOut}
									alt="logout"
									cursor="pointer"
								/>
							</Box>
						</Box>
						<Text fontSize="3xl" fontWeight={600} textAlign="center">
							LA VISIO BIENTÔT DISPONIBLE
						</Text>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Fragment>
	);
}
