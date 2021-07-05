import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../img/hermesfinale.png';
import FooterLogin from '../img/footer-login.png';
import { useAuthDispatch } from '../context/auth';
import {
	Box,
	Flex,
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
	Spinner
} from '@chakra-ui/react';
import { LockIcon, InfoIcon } from '@chakra-ui/icons';

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
	const location = useLocation();
	const [variables, setVariables] = useState({
		username: location?.state?.username,
		password: ''
	});
	const [errors, setErrors] = useState({});
	const dispatch = useAuthDispatch();

	const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
		onCompleted(data) {
			dispatch({ type: 'LOGIN', payload: data.login });
			window.location.href = '/';
		}
	});

	const submitLoginForm = (e) => {
		e.preventDefault();

		loginUser({ variables });
	};
	return (
		<Box>
			<Flex
				justifyContent="center"
				maxW="100vw"
				height="fit-content"
				w="100%"
				flexDirection="column"
				alignItems={{ base: 'center' }}
				p={{ base: '0', md: '4rem' }}
			>
				<Flex flexDirection="column" alignItems="center" w="70%">
					<Image fallback={<Spinner size="lg" />} src={Logo} alt="logo hermes" width="50%" />
				</Flex>
				<SimpleGrid
					display="flex"
					flexDirection="column"
					columns={2}
					borderRadius="10px"
					alignItems="center"
					data-aos="fade-down"
					width="max-content"
					alignSelf="center"
					px={5}
					pb={5}
					bg="rgba(255, 255, 255, 0.8)"
					minW="fit-content"
					zIndex="10"
					w="25%"
				>
					<Text textAlign="center" fontSize="3xl" fontWeight="600" color="#39414f" my={5}>
						Connexion
					</Text>
					<form onSubmit={submitLoginForm}>
						<Stack spacing={5} justifyContent="center" alignItems="center">
							<FormControl
								isRequired
								value={variables.username}
								onChange={(e) => setVariables({ ...variables, username: e.target.value })}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<InfoIcon color="#39414f" />} />
									<Input
										isInvalid={errors.username}
										type="name"
										placeholder="Identifiant"
										_placeholder={{ color: '#39414f', opacity: '0.5' }}
										aria-label="Username"
										bg="#fff"
										color="#39414f"
										defaultValue={location?.state?.username}
									/>
								</InputGroup>
								{errors.username && (
									<Text fontSize="13px" color="tomato">
										Nom d'utilisateur inconnu
									</Text>
								)}
							</FormControl>
							<FormControl
								isRequired
								value={variables.password}
								onChange={(e) => setVariables({ ...variables, password: e.target.value })}
							>
								<InputGroup>
									<InputLeftElement children={<LockIcon color="#39414f" />} />
									<Input
										isInvalid={errors.password}
										type="password"
										placeholder="Mot de passe"
										_placeholder={{ color: '#39414f', opacity: '0.5' }}
										aria-label="Password"
										bg="#fff"
										color="#39414f"
									/>
								</InputGroup>
								{errors.password && (
									<Text fontSize="13px" color="tomato">
										Mot de passe incorrect
									</Text>
								)}
							</FormControl>
							<Divider />
							<Button variant="success" type="submit" disabled={loading} bg="#41BDF8" color="#fff">
								{loading ? 'loading…' : 'Se connecter'}
							</Button>
							<br />
							<Text fontSize="sm" textAlign="center" color="#39414f">
								Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
							</Text>
						</Stack>
					</form>
				</SimpleGrid>
			</Flex>
			<Image src={FooterLogin} position="absolute" alt="footer-login" width="100%" bottom="0" />
		</Box>
	);
}
