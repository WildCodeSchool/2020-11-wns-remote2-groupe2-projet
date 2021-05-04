import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Box, Text, Circle, Avatar, AvatarBadge, Badge } from "@chakra-ui/react";
import { useMessageDispatch, useMessageState } from "../../context/message";
import { PhoneIcon } from '@chakra-ui/icons'


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
					display="flex"
					justifyContent="space-between"
					bg={selected ? "white" : ""}
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
								<AvatarBadge borderColor={selected ? "white" : "#E9E7E1"} boxSize="0.80em" bg="green.500" />
							</Avatar>
						</Circle>
						<Box display={{ base: "none", md: "block" }} alignSelf="center">
							<Badge fontSize="xs" colorScheme="green">{user?.role}</Badge>
							<Text fontWeight="600" color="#39414f" textAlign="left">{user.username} - {user.campus}</Text>
							<Text fontStyle="italic" fontWeight="thin" textAlign="left">
								{user.latestMessage.content}
							</Text>
						</Box>

					</Box>
					<Box display="flex" alignSelf="center">
						<Circle size="40px" bg={!selected ? "white" : "#39414f"} color={selected ? "white" : "#39414f"}>
							<PhoneIcon />
						</Circle>
					</Box>
				</Container >
			);
		});
	}
	return (
		<Container
			width="35vw"
			borderBottomLeftRadius="10px"
			m={0}
			p={0}
			backgroundColor="rgba(244,239,230,0.8)"
			color="#39414F"
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
