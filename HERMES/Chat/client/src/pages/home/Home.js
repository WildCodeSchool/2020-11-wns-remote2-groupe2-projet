import React, { Fragment, useEffect } from "react";

import { gql, useSubscription } from "@apollo/client";

import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";
import {
	Box,
	Button,
	Flex,
	Badge,
	Avatar,
	Text,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Spinner,
	Container
} from "@chakra-ui/react";

import Users from "./Users";
import Messages from "./Messages";
import "../../App.scss";
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
	query getUsers {
		getUsers {
			username
			imageUrl
		}
	}
`;

export default function Home({ history }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const authDispatch = useAuthDispatch();
	const messageDispatch = useMessageDispatch();
	const dispatch = useMessageDispatch();


	const { user } = useAuthState();

	// TODO affichage profil
	const { loading } = useQuery(GET_ME, {
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

	const logout = () => {
		authDispatch({ type: "LOGOUT" });
		window.location.href = "/login";
	};

	return (
		<Container
			maxW="90vw"
		>
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
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						m={3}>
						<Button
							onClick={onOpen}
						>Se déconnecter
				</Button>
						<Modal
							isCentered
							onClose={onClose}
							isOpen={isOpen}
							motionPreset="slideInBottom"
						>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader textAlign="center" >Etes-vous sur de vouloir vous déconnecter de HERMES ?</ModalHeader>
								<Box m={3} display="flex" justifyContent="space-between">
									<Button bg="#39414f" color="white" width="33%" onClick={onClose}>Non</Button>
									<Button bg="#39414f" color="white" width="33%" onClick={logout}>Oui</Button>
								</Box>
							</ModalContent>
						</Modal>
						<Flex>
							<Box>
								<Text fontWeight="bold" color="white">
									Nombalier Adrien
     					 <Badge ml="1"
										colorScheme="green">
										New
      					</Badge>
								</Text>
								<Text fontSize="sm" color="white">Developer</Text>
							</Box>
							<Avatar icon={<Spinner />} m={1} src="https://bit.ly/sage-adebayo" />
						</Flex>
					</Box>

					<Box
						bg="rgba(255, 255, 255, 0.7)"
						border-radius="10px"
						display="flex"
						height="90%"
					>
						<Users />
						<Messages />
					</Box>
				</Fragment>
			)}
		</Container>
	);
}
