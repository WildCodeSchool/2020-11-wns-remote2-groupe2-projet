import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import classNames from "classnames";

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
				<div
					role="button"
					className={classNames(
						"user-div d-flex justify-content-center justify-content-md-start p-3",
						{ "bg-white": selected },
					)}
					key={user.username}
					onClick={() =>
						dispatch({ type: "SET_SELECTED_USER", payload: user.username })
					}
				>
					<Image
						src={
							user.imageUrl ||
							"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
						}
						className="user-image mr-md-2"
					/>
					<div className="d-none d-md-block">
						<p className="text-success">{user.username}</p>
						<p className="font-weight-light">
							{user.latestMessage ? user.latestMessage.content : "En ligne"}
						</p>
					</div>
				</div>
			);
		});
	}
	return (
		<Col
			xs={2}
			md={4}
			className="p-0"
			style={{
				marginTop: "56px",
				borderRadius: "10px",
				backgroundColor: "rgba(244,239,230,0.8)",
				color: "#39414F",
			}}
		>
			{usersMarkup}
		</Col>
	);
}
