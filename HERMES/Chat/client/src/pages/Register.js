import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Logo from '../img/hermesfinale.png';
import LaptopImage from '../img/image-sub.svg';
import { useBreakpointValue } from '@chakra-ui/media-query';
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
	Avatar,
	useToast,
	Select
} from '@chakra-ui/react';
import { LockIcon, InfoIcon, AtSignIcon } from '@chakra-ui/icons';
import { campusList } from '../refs/enum/campusList';
import { rolesList } from '../refs/enum/rolesList';

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$campus: String!
		$role: String!
		$password: String!
		$confirmPassword: String!
		$imageUrl: Upload!
	) {
		register(
			username: $username
			email: $email
			campus: $campus
			role: $role
			password: $password
			confirmPassword: $confirmPassword
			imageUrl: $imageUrl
		) {
			username
			email
			campus
			role
			createdAt
			imageUrl
		}
	}
`;

export default function Register(props) {
	const avatarSize = useBreakpointValue({ base: 'sm', sm: 'md' });
	const toast = useToast();
	const [errors, setErrors] = useState({});
	const [imagePreview, setImagePreview] = useState(false);
	const [variables, setVariables] = useState({
		email: '',
		username: '',
		campus: '',
		role: '',
		password: '',
		confirmPassword: '',
		imageUrl: ''
	});

	const getImagePreview = (e) => {
		setImagePreview(false);
		setVariables({ ...variables, imageUrl: e.target.files[0] });
		if (e.target.files && e.target.files.length !== 0) {
			if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png') {
				const reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onloadend = (event) => {
					setImagePreview(event.target.result);
				};
			}
		}
	};

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update: (_, __) => props.history.push('/login', { username: variables.username }),
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
	});

	const submitRegisterForm = async (e) => {
		e.preventDefault();

		await registerUser({ variables }).then((ok) => {
			if (ok)
				toast({
					title: `Félicitation ${variables.username}`,
					description: 'Votre compte a été créé avec succès !',
					status: 'success',
					duration: 5000,
					isClosable: true
				});
		});
	};

	return (
		<Flex
			justifyContent="center"
			maxW="100vw"
			height="fit-content"
			w="100%"
			flexDirection={{ base: 'column', md: 'row' }}
			alignItems={{ base: 'center' }}
			p={{ base: '0', md: '4rem' }}
		>
			<Flex flexDirection="column" alignItems="center" w="70%">
				<Image src={Logo} alt="logo hermes" width="50%" />
				<Image display={{ base: 'none', md: 'flex' }} src={LaptopImage} alt="laptop image" width="65%" />
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
				<Box h="100%">
					<Text textAlign="center" fontSize="3xl" fontWeight="600" color="#39414f" my={5}>
						Inscription
					</Text>
					<form onSubmit={submitRegisterForm}>
						<Stack spacing={5} justifyContent="center" alignItems="center">
							<FormControl
								isRequired
								value={variables.email}
								onChange={(e) => setVariables({ ...variables, email: e.target.value })}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<AtSignIcon color="#39414f" />} />
									<Input
										isInvalid={errors.email}
										type="email"
										placeholder="Adresse email"
										_placeholder={{ color: '#39414f', opacity: '0.5' }}
										aria-label="Email"
										bg="#fff"
										color="#39414f"
									/>
								</InputGroup>
								{errors.email && (
									<Text fontSize="13px" color="tomato">
										Email déjà existant
									</Text>
								)}
							</FormControl>
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
									/>
								</InputGroup>
								{errors.username && (
									<Text fontSize="13px" color="tomato">
										Nom d'utilisateur déjà pris
									</Text>
								)}
							</FormControl>
							<FormControl
								isRequired
								value={variables.campus}
								onChange={(e) => setVariables({ ...variables, campus: e.target.value })}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<Select
										isInvalid={errors.campus}
										type="campus"
										placeholder="Votre campus"
										_placeholder={{ color: '#39414f', opacity: '0.5' }}
										aria-label="campus"
										bg="#fff"
										color="#39414f"
									>
										{campusList.map((campus) => (
											<option value={campus.value}>{campus.name}</option>
										))}
									</Select>
								</InputGroup>
							</FormControl>
							<FormControl
								isRequired
								value={variables.role}
								onChange={(e) => setVariables({ ...variables, role: e.target.value })}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<Select
										isInvalid={errors.role}
										type="role"
										placeholder="Votre role"
										_placeholder={{ color: '#39414f', opacity: '0.5' }}
										aria-label="role"
										bg="#fff"
										color="#39414f"
									>
										{rolesList.map((role) => (
											<option value={role.value}>{role.name}</option>
										))}
									</Select>
								</InputGroup>
							</FormControl>
							<FormControl
								isRequired
								value={variables.password}
								onChange={(e) => setVariables({ ...variables, password: e.target.value })}
								justifyContent="center"
								alignItems="center"
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
										Le mot de passe est incorrect
									</Text>
								)}
							</FormControl>
							<FormControl
								isRequired
								value={variables.confirmPassword}
								onChange={(e) =>
									setVariables({
										...variables,
										confirmPassword: e.target.value
									})
								}
								justifyContent="center"
								alignItems="center"
							>
								<InputGroup>
									<InputLeftElement children={<LockIcon color="#39414f" />} />
									<Input
										isInvalid={errors.confirmPassword}
										type="password"
										placeholder="Confirmation mot de passe"
										_placeholder={{ color: '#39414f', opacity: '0.5' }}
										aria-label="Password"
										bg="#fff"
										color="#39414f"
									/>
								</InputGroup>
								{errors.confirmPassword && (
									<Text fontSize="13px" color="tomato">
										Le mot de passe n'est pas identique
									</Text>
								)}
							</FormControl>
							<FormControl onChange={getImagePreview} justifyContent="center" alignItems="center">
								<InputGroup>
									<Button alignSelf="center">
										<Input
											type="file"
											aria-label="File"
											accept="image/*"
											bg="#fff"
											color="#39414f"
											cursor="pointer"
											boxSizing="border-box"
											opacity="0"
											position="absolute"
										/>
										<Text color="#39414f">{'Charger une image de profil'}</Text>
									</Button>
									<Avatar
										size={avatarSize}
										loading="eager"
										w="50px"
										h="50px"
										objectFit="cover"
										borderRadius="50%"
										m={1}
										src={imagePreview}
										alt="Preview"
									/>
								</InputGroup>
							</FormControl>
							<Divider />
							<Button variant="success" type="submit" disabled={loading} bg="#41BDF8" color="#fff">
								{loading ? 'loading…' : "S'inscire"}
							</Button>

							<Text fontSize="sm" textAlign="center" color="#39414f">
								Vous avez un compte ? <Link to={'/login'}>Se connecter</Link>
							</Text>
						</Stack>
					</form>
				</Box>
			</SimpleGrid>
		</Flex>
	);
}
