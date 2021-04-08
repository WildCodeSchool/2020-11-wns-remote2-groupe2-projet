import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Logo from "../img/hermes1.png";
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
import { LockIcon, InfoIcon, AtSignIcon } from "@chakra-ui/icons";

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			username: $username
			email: $email
			password: $password
			confirmPassword: $confirmPassword
		) {
			username
			email
			createdAt
		}
	}
`;

export default function Register(props) {
	const [variables, setVariables] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update: (_, __) => props.history.push("/login"),
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
	});

	const submitRegisterForm = (e) => {
		e.preventDefault();

		registerUser({ variables });
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

				<Box marginTop="87px">
					<Text
						fontSize="3xl"
						marginLeft="53px"
						marginBottom="5px"
						fontWeight="600"
					>
						Inscription
					</Text>
					<form onSubmit={submitRegisterForm}>
						<Stack
							spacing={5}
							w="72%"
							justifyContent="center"
							alignItems="center"
						>
							<FormControl
								isRequired
								value={variables.email}
								className={errors.email && "is-invalid"}
								onChange={(e) =>
									setVariables({ ...variables, email: e.target.value })
								}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<AtSignIcon />} />
									<Input
										type="email"
										placeholder="Adresse email"
										// eslint-disable-next-line jsx-a11y/aria-props
										aria-lable="Email"
										bg="#fff"
									/>
								</InputGroup>
							</FormControl>
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
										aria-lable="Username"
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
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<LockIcon />} />
									<Input
										type="password"
										placeholder="Mot de passe"
										// eslint-disable-next-line jsx-a11y/aria-props
										aria-lable="Password"
										bg="#fff"
									/>
								</InputGroup>
							</FormControl>
							<FormControl
								isRequired
								value={variables.confirmPassword}
								className={errors.confirmPassword && "is-invalid"}
								onChange={(e) =>
									setVariables({
										...variables,
										confirmPassword: e.target.value,
									})
								}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<LockIcon />} />
									<Input
										type="password"
										placeholder="Confirmation mot de passe"
										// eslint-disable-next-line jsx-a11y/aria-props
										aria-lable="Password"
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
								{loading ? "loading…" : "Je valide"}
							</Button>

							<Text fontSize="sm" textAlign="center">
								Vous avez un compte ? <Link to={"/login"}>Se connecter</Link>
							</Text>
						</Stack>
					</form>
				</Box>
			</SimpleGrid>
		</Container>
	);
}
