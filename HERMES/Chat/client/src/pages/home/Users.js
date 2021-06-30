import React, { useState, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Box, Text, Circle, Avatar, AvatarBadge, Badge, IconButton, SkeletonCircle, SkeletonText, Stack, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useMessageDispatch, useMessageState } from "../../context/message";
import { SocketContext } from "../../context/socketContext";
import { SearchIcon } from "@chakra-ui/icons";


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
	const [calledIndex, setCalledIndex] = useState(null)

	// todo: filter
	const [nameFilter, setNameFilter] = useState("")
	const { startCall, LeaveCall } = useContext(SocketContext)
	const selectedUser = users?.find((u) => u.selected === true)?.username;

	const { loading } = useQuery(GET_USERS, {
		onCompleted: (data) =>
			dispatch({ type: "SET_USERS", payload: data.getUsers }),
		onError: (err) => console.log(err),
	});

	const handleCallingInformations = (index) => {
		if (stream) {
			LeaveCall()
			setCalledIndex(null)
		} else {
			startCall(selectedUser)
			setCalledIndex(index)
		}
	}

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
		usersMarkup = users.map((user, index) => {
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
						<IconButton display={(stream && index !== calledIndex) && "none"} isRound _hover={!stream && { bg: "green.500" }} _focus="none" bg={!stream ? "white" : "red.500"} onClick={() => handleCallingInformations(index)} >
							{stream ? <i className="fas fa-phone-slash" style={{ color: "#39414f" }}></i>
								: <i className="fas fa-phone" style={{ color: "#39414f" }}></i>}
						</IconButton>
					</Box>
				</Container >
			);
		});
	}
	return (
		<Container
			position="relative"
			width={{ base: "100%", md: stream && "25%" }}
			maxH={{ base: "25vh", md: "100%" }}
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
			<InputGroup zIndex="10" position="fixed" w="auto">
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="#39414f" />}
				/>
				<Input border="none" onChange={e => setNameFilter(e.target.value)} _focus="none" color="#39414f" type="name" _placeholder={{ color: "#39414f", opacity: "0.5" }} placeholder="Rechercher…" />
			</InputGroup>
			<Box pt="2.5rem">{usersMarkup}</Box>
		</Container>
	);
}
