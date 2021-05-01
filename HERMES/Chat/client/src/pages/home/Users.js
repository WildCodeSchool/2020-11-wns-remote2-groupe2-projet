import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Box, Image, Text, Button } from "@chakra-ui/react";
import { useMessageDispatch, useMessageState } from "../../context/message";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'


const GET_USERS = gql`
	query getUsers {
		getUsers {
			username
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

export default function Users() {
	const dispatch = useMessageDispatch();
	const { users } = useMessageState();
	const selectedUser = users?.find((u) => u.selected === true)?.username;

	const { loading } = useQuery(GET_USERS, {
		onCompleted: (data) =>
			dispatch({ type: "SET_USERS", payload: data.getUsers }),
		onError: (err) => console.log(err),
	});

	let usersMarkup;
	if (!users || loading) {
		usersMarkup = <p>Loading..</p>;
	} else if (users.length === 0) {
		usersMarkup = <p>Aucun utilisateur pour le moment !</p>;
	} else if (users.length > 0) {
		usersMarkup = users.map((user) => {
			const selected = selectedUser === user.username;

			return (
				<Container display="flex" justifyContent="space-between"
					bg={selected ? "white" : ""}
					as="button"
					p="5"
					key={user.username}
					onClick={() =>
						dispatch({ type: "SET_SELECTED_USER", payload: user.username })
					}>
					<Box
						display="flex"
						justifyContent={{ base: "center", md: "start" }}>
						<Image
							w="50px"
							h="48px"
							objectFit="cover"
							borderRadius="50%"
							src={baseURL + user.imageUrl}
						/>
						<Box display={{ base: "none", md: "block" }}>
							<Text color="green">{user.username}</Text>
							<Text fontWeight="light">
								{user.latestMessage ? user.latestMessage.content : "En ligne"}
							</Text>
						</Box>

					</Box>
					<Button borderRadius="50%"
						bg={!selected ? "white" : "#39414f"}>
						<PhoneIcon color="green" />
					</Button>
				</Container >
			);
		});
	}
	return (
		<Container
			maxWidth="40%"
			p={0}
			backgroundColor="rgba(244,239,230,0.8)"
			color="#39414F"
		>
			{usersMarkup}
		</Container>
	);
}
