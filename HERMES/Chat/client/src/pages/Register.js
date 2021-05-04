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
    Avatar,
    useToast,
    Select
} from "@chakra-ui/react";
import { LockIcon, InfoIcon, AtSignIcon } from "@chakra-ui/icons";
import { campusList } from '../refs/enum/campusList'

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
        $campus: String!
		$password: String!
		$confirmPassword: String!
		$imageUrl: Upload!
	) {
		register(
			username: $username
			email: $email
            campus: $campus
			password: $password
			confirmPassword: $confirmPassword
			imageUrl: $imageUrl
		) {
			username
			email
            campus
			createdAt
			imageUrl
		}
	}
`;

export default function Register(props) {
    const toast = useToast()
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(false);
    const [variables, setVariables] = useState({
        email: "",
        username: "",
        campus: "",
        password: "",
        confirmPassword: "",
        imageUrl: "",
    });

    const getImagePreview = (e) => {
        setImagePreview(false);
        setVariables({ ...variables, imageUrl: e.target.files[0] });
        if (e.target.files && e.target.files.length !== 0) {
            if (
                e.target.files[0].type === "image/jpeg" ||
                e.target.files[0].type === "image/png"
            ) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = (event) => {
                    setImagePreview(event.target.result);
                };
            }
        }
    };

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, __) => props.history.push("/login", { username: variables.username }),
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    });

    const submitRegisterForm = async (e) => {
        e.preventDefault();

        await registerUser({ variables }).then((ok) => {
            if (ok) (
                toast({
                    title: `Félicitation ${variables.username}`,
                    description: "Votre compte a été créé avec succès !",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
        );
    };

    return (
        <Container
            data-aos="fade-down"
            backgroundColor="#39414f"
            alignSelf="center">
            <SimpleGrid
                columns={2}
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Image src={Logo} alt="logo hermes" width="50%" />

                <Box >
                    <Text textAlign="center"
                        fontSize="3xl"
                        fontWeight="600"
                    >
                        Inscription
					</Text>
                    <form onSubmit={submitRegisterForm}>
                        <Stack
                            spacing={5}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <FormControl
                                isRequired
                                value={variables.email}
                                onChange={(e) =>
                                    setVariables({ ...variables, email: e.target.value })
                                }
                                justifyContent="center"
                                alignItems="center"
                            >
                                <InputGroup>
                                    <InputLeftElement children={<AtSignIcon />} />
                                    <Input
                                        isInvalid={errors.email}
                                        type="email"
                                        placeholder="Adresse email"
                                        aria-label="Email"
                                        bg="#fff"
                                    />
                                </InputGroup>
                                {errors.email && <Text fontSize="13px" color="tomato">Email déjà existant</Text>}
                            </FormControl>
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
                                    />
                                </InputGroup>
                                {errors.username && <Text fontSize="13px" color="tomato">Nom d'utilisateur déjà pris</Text>}
                            </FormControl>
                            <FormControl
                                isRequired
                                value={variables.campus}
                                onChange={(e) =>
                                    setVariables({ ...variables, campus: e.target.value })
                                }
                                justifyContent="center"
                                alignItems="center"
                            >
                                <InputGroup>
                                    <Select
                                        isInvalid={errors.campus}
                                        type="campus"
                                        placeholder="Votre campus"
                                        aria-label="campus"
                                        bg="#fff"
                                    >
                                        {campusList.map(campus => (
                                            <option value={campus.value}>{campus.name}</option>
                                        ))}
                                    </Select>
                                </InputGroup>
                                {errors.username && <Text fontSize="13px" color="tomato">Nom d'utilisateur déjà pris</Text>}
                            </FormControl>
                            <FormControl
                                isRequired
                                value={variables.password}
                                onChange={(e) =>
                                    setVariables({ ...variables, password: e.target.value })
                                }
                                justifyContent="center"
                                alignItems="center"
                            >
                                <InputGroup>
                                    <InputLeftElement children={<LockIcon />} />
                                    <Input
                                        isInvalid={errors.password}
                                        type="password"
                                        placeholder="Mot de passe"
                                        aria-label="Password"
                                        bg="#fff"
                                    />
                                </InputGroup>
                                {errors.password && <Text fontSize="13px" color="tomato">Le mot de passe est incorrect</Text>}
                            </FormControl>
                            <FormControl
                                isRequired
                                value={variables.confirmPassword}
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
                                        isInvalid={errors.confirmPassword}
                                        type="password"
                                        placeholder="Confirmation mot de passe"
                                        aria-label="Password"
                                        bg="#fff"
                                    />
                                </InputGroup>
                                {errors.confirmPassword && <Text fontSize="13px" color="tomato">Le mot de passe n'est pas identique</Text>}
                            </FormControl>
                            <FormControl
                                onChange={getImagePreview}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <InputGroup>
                                    <Button alignSelf="center">
                                        <Input
                                            type="file"
                                            aria-label="File"
                                            accept="image/*"
                                            bg="#fff"
                                            cursor="pointer"
                                            boxSizing="border-box"
                                            opacity="0"
                                            position="absolute"
                                        />{"Charger une image de profil"}
                                    </Button>
                                    <Avatar
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
                            <Button
                                variant="success"
                                type="submit"
                                disabled={loading}
                                bg="#39414f"
                                color="#fff"
                            >
                                {loading ? "loading…" : "S'inscire"}
                            </Button>

                            <Text fontSize="sm" textAlign="center">
                                Vous avez un compte ? <Link to={"/login"}>Se connecter</Link>
                            </Text>
                        </Stack>
                    </form>
                </Box>
            </SimpleGrid>
        </Container >
    );
}
