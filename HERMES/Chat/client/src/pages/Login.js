import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Logo from "../img/hermes1.png"
import { useAuthDispatch } from "../context/auth";

const LOGIN_USER = gql`
	query login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			email
			createdAt
			token
		}
	}
`;

export default function Register(props) {
	const [variables, setVariables] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const dispatch = useAuthDispatch();

	const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
		onCompleted(data) {
			dispatch({ type: "LOGIN", payload: data.login });
			window.location.href = "/";
		},
	});

	const submitLoginForm = (e) => {
		e.preventDefault();

		loginUser({ variables });
	};

	return (
		<div className="bg-row-opacity">
			<Row
				className="py-5 justify-content-center align-items-center"
				style={{ margin: "209px 0 0 0" }}
			>
					<img className="img-connexion" src={Logo} alt="logo hermes" />
				<Col sm={8} md={6} lg={4}>
					<h1 className="text-center">Connexion</h1>
					<Form onSubmit={submitLoginForm}>
						<Form.Group>
							<Form.Label className={errors.username && "text-danger"}>
								{errors.username ?? "Identifiant"}
							</Form.Label>
							<Form.Control
								type="text"
								value={variables.username}
								className={errors.username && "is-invalid"}
								onChange={(e) =>
									setVariables({ ...variables, username: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className={errors.password && "text-danger"}>
								{errors.password ?? "Mot de passe"}
							</Form.Label>
							<Form.Control
								type="password"
								value={variables.password}
								className={errors.password && "is-invalid"}
								onChange={(e) =>
									setVariables({ ...variables, password: e.target.value })
								}
							/>
						</Form.Group>
						<div className="text-center">
							<Button variant="success" type="submit" disabled={loading}>
								{loading ? "loading…" : "Login"}
							</Button>
							<br />
							<small>
								Vous n'avez pas de compte ?{" "}
								<Link to="/register">S'inscrire</Link>
							</small>
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	);
}
