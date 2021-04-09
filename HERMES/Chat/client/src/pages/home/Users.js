import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Box, Image, Text } from "@chakra-ui/react";
import { useMessageDispatch, useMessageState } from "../../context/message";

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
				<Container
					as="button"
					display="flex"
					justifyContent={{ base: "center", md: "start" }}
					p="3"
					bg={selected ? "white" : ""}
					key={user.username}
					onClick={() =>
						dispatch({ type: "SET_SELECTED_USER", payload: user.username })
					}
				>
					<Image
						w="50px"
						h="50px"
						objectFit="cover"
						borderRadius="50%"
						mr={{ md: "2" }}
						src={baseURL + user.imageUrl}
					/>
					<Box display={{ base: "none", md: "block" }}>
						<Text color="green">{user.username}</Text>
						<Text fontWeight="light">
							{user.latestMessage ? user.latestMessage.content : "En ligne"}
						</Text>
					</Box>
				</Container>
			);
		});
	}
	return (
		<Container
			maxWidth={{ xs: 2, md: 4 }}
			p={0}
			marginTop="56px"
			borderRadius="10px"
			backgroundColor="rgba(244,239,230,0.8)"
			color="#39414F"
		>
			{usersMarkup}
		</Container>
	);
}
