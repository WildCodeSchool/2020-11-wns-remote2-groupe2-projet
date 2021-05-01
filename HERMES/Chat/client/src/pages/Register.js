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
import { LockIcon, InfoIcon, AtSignIcon, ViewIcon } from "@chakra-ui/icons";

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
		$imageUrl: Upload!
	) {
		register(
			username: $username
			email: $email
			password: $password
			confirmPassword: $confirmPassword
			imageUrl: $imageUrl
		) {
			username
			email
			createdAt
			imageUrl
		}
	}
`;

export default function Register(props) {
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(false);
    const [variables, setVariables] = useState({
        email: "",
        username: "",
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
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="50%"
                borderRadius="10px"
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
                                alignItems="center">
                                <InputGroup>
                                    <InputLeftElement children={<ViewIcon />} />
                                    <Input
                                        type="file"
                                        aria-label="File"
                                        accept="image/*"
                                        bg="#fff"
                                    />
                                </InputGroup>
                            </FormControl>
                            {imagePreview && (
                                <Image
                                    w="50px"
                                    h="50px"
                                    objectFit="cover"
                                    borderRadius="50%"
                                    mr={{ md: "2" }}
                                    src={imagePreview}
                                    alt="Preview"
                                />
                            )}
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
        </Container>
    );
}
