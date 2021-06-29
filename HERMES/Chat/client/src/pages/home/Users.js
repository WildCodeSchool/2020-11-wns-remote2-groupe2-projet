import React, { useState, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Box, Text, Circle, Avatar, AvatarBadge, Badge, Button, useAccordionDescendantsContext, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";
import { useMessageDispatch, useMessageState } from "../../context/message";
import { AddIcon, PhoneIcon } from '@chakra-ui/icons'
import { SocketContext } from "../../context/socketContext";


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

const baseURL = process.env.REACT_APP_BASE_URL || "";

export default function Users({ stream }) {
	const dispatch = useMessageDispatch();
	const { users } = useMessageState();
	const { startCall, LeaveCall } = useContext(SocketContext)
	const selectedUser = users?.find((u) => u.selected === true)?.username;

	const handleCall = () => {
		startCall(selectedUser)
	}

	const { loading } = useQuery(GET_USERS, {
		onCompleted: (data) =>
			dispatch({ type: "SET_USERS", payload: data.getUsers }),
		onError: (err) => console.log(err),
	});


	let usersMarkup;
	if (!users || loading) {
		usersMarkup = <Box>
			<Stack m={4} spacing={6} display="flex" flexDirection="column">
				<SkeletonCircle size="10" />
				<SkeletonText noOfLines={2} spacing="2" />
				<SkeletonCircle size="10" />
				<SkeletonText noOfLines={2} spacing="2" />
			</Stack>
		</Box>
	} else if (users.length === 0) {
		usersMarkup = <p>Aucun utilisateur pour le moment !</p>;
	} else if (users.length > 0) {
		usersMarkup = users.map((user) => {
			const selected = selectedUser === user.username;

			return (
				<Container
					display="flex"
					justifyContent="space-between"
					bg={selected ? "#DDF3FE" : ""}
					as="button"
					p="3"
					key={user.username}
					onClick={() =>
						dispatch({ type: "SET_SELECTED_USER", payload: user.username })
					}>
					<Box display="flex"
						justifyContent={{ base: "center", md: "start" }}

						css={{
							overflowY: "scroll",
							"&::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						<Circle size="70px" p={0} m={0}>
							<Avatar loading="lazy" m={1} src={baseURL + user.imageUrl} >
								<AvatarBadge borderColor={selected ? "#DDF3FE" : "rgba(255, 255, 255, 1)"} boxSize="0.80em" bg="green.500" />
							</Avatar>
						</Circle>
						<Box display={{ base: "none", md: "block" }} alignSelf="center">
							<Badge fontSize="xs" colorScheme="green">{user?.role}</Badge>
							<Text fontWeight="600" color="#39414f" textAlign="left">{user.username} - {user.campus}</Text>
							<Text fontStyle="italic" color="#39414f" fontWeight="thin" textAlign="left">
								{user?.latestMessage?.content}
							</Text>
						</Box>

					</Box>
					<Box display="flex" alignSelf="center">
						{!stream ? (
							<Button onClick={() => handleCall(user.username)} _focus="none" bg={selected ? "#41BDF8" : "#DDF3FE"} _hover={{ bg: "#4FD963" }} color={selected ? "#39414f" : "#E9E7E1"}>
								<PhoneIcon />
							</Button>
						) : (
							<Button onClick={() => LeaveCall()} _focus="none" bg={selected ? "#E9E7E1" : "#39414f"} _hover={{ bg: "red" }} color={selected ? "#39414f" : "#E9E7E1"} >
								<PhoneIcon css={{ transform: "rotate(135deg)" }} />
							</Button>
						)}
					</Box>
				</Container >
			);
		});
	}
	return (
		<Container
			width={stream && "25%"}
			borderBottomLeftRadius="10px"
			m={0}
			p={0}
			bg="rgba(255, 255, 255, 0.8)"
			css={{
				overflowX: "scroll",
				"&::-webkit-scrollbar": {
					display: "none",
				},
			}}
		>
			{usersMarkup}
		</Container>
	);
}
