import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
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
	Spinner,
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
	const location = useLocation()
	const [variables, setVariables] = useState({
		username: location?.state?.username,
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
		<Container
			data-aos="fade-down"
			backgroundColor="#39414f">
			<SimpleGrid
				columns={2}
				bg="rgba(255, 255, 255, 0.8)"
				borderRadius="10px"
				display="flex"
				flexDirection="column"
				alignItems="center"
				mt="50%"
			>
				<Image fallback={<Spinner size="lg" m={1} />} src={Logo} alt="logo hermes" width="50%" />
				<Box >
					<Text textAlign="center"
						fontSize="3xl"
						fontWeight="600"
					>
						Connexion
					</Text>
					<form onSubmit={submitLoginForm}>
						<Stack
							spacing={5}
							justifyContent="center"
							alignItems="center"
						>
							<FormControl
								isRequired
								value={variables.username}
								onChange={(e) =>
									setVariables({ ...variables, username: e.target.value })
								}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<InfoIcon />} />
									<Input
										isInvalid={errors.username}
										type="name"
										placeholder="Identifiant"
										aria-label="Username"
										bg="#fff"
										defaultValue={location?.state?.username}
									/>
								</InputGroup>
								{errors.username && <Text fontSize="13px" color="tomato">Nom d'utilisateur inconnu</Text>}
							</FormControl>
							<FormControl
								isRequired
								value={variables.password}
								onChange={(e) =>
									setVariables({ ...variables, password: e.target.value })
								}
							>
								<InputGroup>
									<InputLeftElement children={<LockIcon />} />
									<Input
										isInvalid={errors.password}
										type="password"
										placeholder="Mot de passe"
										// eslint-disable-next-line jsx-a11y/aria-props
										aria-label="Password"
										bg="#fff"
									/>
								</InputGroup>
								{errors.password && <Text fontSize="13px" color="tomato">Mot de passe incorrect</Text>}
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
