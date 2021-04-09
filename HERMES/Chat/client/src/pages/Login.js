import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Logo from "../img/hermes1.png";
import { useAuthDispatch } from "../context/auth";
import {
	Box,
	Container,
	FormControl,
	Text,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Button,
	Divider,
	SimpleGrid,
} from "@chakra-ui/react";
import { LockIcon, InfoIcon } from "@chakra-ui/icons";

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
		<Container>
			<SimpleGrid
				columns={2}
				spacing={80}
				bg="rgba(255, 255, 255, 0.8)"
				w="242%"
				h="49vh"
				pl="96px"
				position="relative"
				top="268px"
				right="342px"
				borderRadius="10px"
			>
				<Box marginTop="113px" w="140%">
					<Image src={Logo} alt="logo hermes" width="100%" />
				</Box>

				<Box marginTop="133px">
					<Text
						fontSize="3xl"
						marginLeft="53px"
						marginBottom="5px"
						fontWeight="600"
					>
						Connexion
					</Text>
					<form onSubmit={submitLoginForm}>
						<Stack
							spacing={5}
							w="72%"
							justifyContent="center"
							alignItems="center"
						>
							<FormControl
								isRequired
								value={variables.username}
								className={errors.username && "is-invalid"}
								onChange={(e) =>
									setVariables({ ...variables, username: e.target.value })
								}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<InfoIcon />} />
									<Input
										type="name"
										placeholder="Identifiant"
										// eslint-disable-next-line jsx-a11y/aria-props
										aria-label="Username"
										bg="#fff"
									/>
								</InputGroup>
							</FormControl>
							<FormControl
								isRequired
								value={variables.password}
								className={errors.password && "is-invalid"}
								onChange={(e) =>
									setVariables({ ...variables, password: e.target.value })
								}
							>
								<InputGroup>
									<InputLeftElement children={<LockIcon />} />
									<Input
										type="password"
										placeholder="Mot de passe"
										// eslint-disable-next-line jsx-a11y/aria-props
										aria-label="Password"
										bg="#fff"
									/>
								</InputGroup>
							</FormControl>
							<Divider />
							<Button
								variant="success"
								type="submit"
								disabled={loading}
								bg="#39414f"
								color="#fff"
							>
								{loading ? "loading…" : "Se connecter"}
							</Button>
							<br />
							<Text fontSize="sm" textAlign="center">
								Vous n'avez pas de compte ?{" "}
								<Link to="/register">S'inscrire</Link>
							</Text>
						</Stack>
					</form>
				</Box>
			</SimpleGrid>
		</Container>
	);
}
