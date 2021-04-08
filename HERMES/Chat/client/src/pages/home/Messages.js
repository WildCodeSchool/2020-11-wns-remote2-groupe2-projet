import React, { useEffect, Fragment, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Form } from "react-bootstrap";

import { useMessageDispatch, useMessageState } from "../../context/message";

import Message from "./Message";
import { Container, Box, Spacer } from "@chakra-ui/react";

const SEND_MESSAGE = gql`
	mutation sendMessage($to: String!, $content: String!) {
		sendMessage(to: $to, content: $content) {
			uuid
			from
			to
			content
			createdAt
		}
	}
`;

const GET_MESSAGES = gql`
	query getMessages($from: String!) {
		getMessages(from: $from) {
			uuid
			from
			to
			content
			createdAt
			reactions {
				uuid
				content
			}
		}
	}
`;

export default function Messages() {
	const { users } = useMessageState();
	const dispatch = useMessageDispatch();
	const [content, setContent] = useState("");

	const selectedUser = users?.find((u) => u.selected === true);
	const messages = selectedUser?.messages;

	const [
		getMessages,
		{ loading: messagesLoading, data: messagesData },
	] = useLazyQuery(GET_MESSAGES);

	const [sendMessage] = useMutation(SEND_MESSAGE, {
		onError: (err) => console.log(err),
	});

	useEffect(() => {
		if (selectedUser && !selectedUser.messages) {
			getMessages({ variables: { from: selectedUser.username } });
		}
	}, [getMessages, selectedUser]);

	useEffect(() => {
		if (messagesData) {
			dispatch({
				type: "SET_USER_MESSAGES",
				payload: {
					username: selectedUser.username,
					messages: messagesData.getMessages,
				},
			});
		}
	}, [dispatch, messagesData, selectedUser]);

	const submitMessage = (e) => {
		e.preventDefault();
		if (content.trim() === "" || !selectedUser) return;

		setContent("");

		// Mutation for sending the message
		sendMessage({ variables: { to: selectedUser.username, content } });
	};

	let selectedChatMarkup;
	if (!messages && !messagesLoading) {
		selectedChatMarkup = <p className="info-text">Selectionnez un contact</p>;
	} else if (messagesLoading) {
		selectedChatMarkup = <p className="info-text">Loading</p>;
	} else if (messages.length > 0) {
		selectedChatMarkup = messages.map((message, index) => (
			<Fragment key={message.uuid}>
				<Message message={message} />
				{index === messages.length - 1 && (
					<div className="invisible">
						<hr className="m-0" />
					</div>
				)}
			</Fragment>
		));
	} else if (messages.length === 0) {
		selectedChatMarkup = <p>En ligne, envoyer un message… </p>;
	}

	return (
		<Container xs={10} md={8} p={0}>
			<Box
				display="flex"
				flexDirection="column-reverse"
				p={3}
				css={{
					height: "500px",
					overflowY: "scroll",
					"&::-webkit-scrollbar": {
						display: "none",
					},
				}}
			>
				{selectedChatMarkup}
			</Box>
			<Spacer />
			<Box px={3} py={2}>
				<Form onSubmit={submitMessage}>
					<Form.Group className="d-flex align-items-center m-0">
						<Form.Control
							type="text"
							className="message-intput rounded-pill p-4 bg-secondary border-0"
							placeholder="Entrer un message .."
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<i
							className="fas fa-paper-plane fa-2x text-primary ml-2"
							onClick={submitMessage}
						>
							{" "}
						</i>
					</Form.Group>
				</Form>
			</Box>
		</Container>
	);
}
