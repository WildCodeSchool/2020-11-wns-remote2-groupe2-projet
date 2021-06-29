import React, { useState, useEffect } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Container, Stack, Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { FormControl } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';
import { InfoIcon, AtSignIcon } from '@chakra-ui/icons';
import { campusList } from '../../refs/enum/campusList';
import { Heading } from '@chakra-ui/react';

export default function MyProfil(props) {

	const baseURL = process.env.REACT_APP_BASE_URL || '';

	const GET_ME = gql`
	query getMe {
		getMe {
			username
			campus
			role
			email
			imageUrl
		}
	}
`;
	const { data, refetch } = useQuery(GET_ME)

	const toast = useToast();
	const [errors, setErrors] = useState({});
	const [imagePreview, setImagePreview] = useState(null);
	const [variables, setVariables] = useState({
		email: data?.getMe.email,
		campus: data?.getMe.campus,
		imageUrl: imagePreview
	});



	const UPDATE_USER = gql`
		mutation updateUser( $email: String, $campus: String!, $imageUrl: Upload!) {
			update(email: $email, campus: $campus,imageUrl: $imageUrl) {
				email
				campus
				imageUrl
			}
		}
	`;

	const [updateUser, { loading }] = useMutation(UPDATE_USER, {
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
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

	const submitUpdateUserInformations = async (e) => {
		e.preventDefault();

		const result = await updateUser({ variables })
		if (result) {
			toast({
				title: `Mon compte`,
				description: 'Vos informations ont bien été mise à jour.',
				status: 'success',
				duration: 5000,
				isClosable: true
			});
			refetch()
		}
	};

	return (
		<Stack spacing="30px">
			<Heading textAlign="center" color="#39414F">Mes infos</Heading>
			<form onSubmit={submitUpdateUserInformations}>
				<Container maxWidth="4xl" css={{ margin: '0 auto' }}>
					<Stack spacing={5} justifyContent="center" alignItems="center">
						<FormControl
							isRequired
							onChange={(e) => setVariables({ ...variables, username: e.target.value })}
							justifyContent="center"
							alignItems="center"
						>
							<InputGroup>
								<InputLeftElement children={<InfoIcon color="#39414F" />} />
								<Input
									isInvalid={errors.username}
									type="name"
									placeholder="Identifiant"
									aria-label="Username"
									bg={'white'}
									value={data?.getMe.username}
									isDisabled={true}
									color="#39414F"
								/>
							</InputGroup>
						</FormControl>
						<FormControl
							isRequired
							onChange={(e) => setVariables({ ...variables, email: e.target.value })}
							justifyContent="center"
							alignItems="center"
						>
							<InputGroup>
								<InputLeftElement children={<AtSignIcon color="#39414F" />} />
								<Input
									defaultValue={data?.getMe.email}
									isInvalid={errors.email}
									type="email"
									placeholder="Adresse email"
									aria-label="Email"
									bg={'white'}
									color="#39414F"
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
							onChange={(e) => setVariables({ ...variables, campus: e.target.value })}
							justifyContent="center"
							alignItems="center"
						>
							<InputGroup>
								<Select
									defaultValue={variables.campus}
									isInvalid={errors.campus}
									type="campus"
									placeholder={variables.campus}
									aria-label="campus"
									bg={'white'}
									color="#39414F"
								>
									{campusList.map((campus) => (
										<option value={campus.value}>{campus.name}</option>
									))}
								</Select>
							</InputGroup>
						</FormControl>
						<FormControl
							isRequired
							onChange={(e) => setVariables({ ...variables, role: e.target.value })}
							justifyContent="center"
							alignItems="center"
						>
							<InputGroup>
								<Select
									value={data?.getMe.role}
									isInvalid={errors.role}
									type="role"
									placeholder={data?.getMe.role}
									aria-label="role"
									bg={'white'}
									isDisabled={true}
									color="#39414F"
								>
								</Select>
							</InputGroup>
						</FormControl>
						<FormControl onChange={getImagePreview} justifyContent="center" alignItems="center">
							<InputGroup>
								<Button alignSelf="center" bg={'white'}>
									<Input
										type="file"
										aria-label="File"
										accept="image/*"
										bg={'white'}
										cursor="pointer"
										boxSizing="border-box"
										opacity="0"
										position="absolute"
										color="#39414F"
									/>
									<Text color="#39414F">{"Changer d'image de profil"}</Text>
								</Button>
								<Avatar
									loading="eager"
									w="50px"
									h="50px"
									objectFit="cover"
									borderRadius="50%"
									m={1}
									src={baseURL + data?.getMe.imageUrl}
									alt="Preview"
								/>
							</InputGroup>
						</FormControl>
						<Button
							variant="success"
							bg="#39414f"
							color="white"
							type="submit"
							_hover={{ bg: '#eae7e1', color: '#39414f' }}
						>
							Modifier
					</Button>
					</Stack>
				</Container>
			</form>
		</Stack>
	);
}
