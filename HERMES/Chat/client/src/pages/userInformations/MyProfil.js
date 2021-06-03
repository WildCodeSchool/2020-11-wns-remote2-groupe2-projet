import React, { useState, useEffect } from 'react'
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Box, Divider, Heading, Stack, Text } from '@chakra-ui/layout';
import { useMessageState } from '../../context/message';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FormControl } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';
import { LockIcon, InfoIcon, AtSignIcon } from "@chakra-ui/icons";
import { campusList } from '../../refs/enum/campusList'
import { rolesList } from '../../refs/enum/rolesList'

export default function MyProfil(props) {
    const { user } = useMessageState();

    useEffect(() => {
        setData(user)
        setImagePreview(baseURL + user?.imageUrl)
    }, [user])

    const toast = useToast()

    const baseURL = process.env.REACT_APP_BASE_URL || "";

    const [data, setData] = useState(null)
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [variables, setVariables] = useState({
        campus: "",
        role: "",
        imageUrl: "",
    });

    console.table("RESULT", data)
    const UPDATE_USER = gql`
	mutation update(
        $campus: String!
        $role: String!
		$imageUrl: Upload
	) {
		update(
            campus: $campus
            role: $role
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

    const [updateUser, { loading }] = useMutation(UPDATE_USER, {
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
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


    const submitUpdateUserInformations = async (e) => {
        e.preventDefault();

        await updateUser({ variables }).then((ok) => {
            if (ok) (
                toast({
                    title: `Mon compte`,
                    description: "Vos informations ont bien été mise à jour.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
        );
    };

    return (
        <Box width="75%" css={{ margin: "0 auto" }}>
            <form onSubmit={submitUpdateUserInformations}>
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
                                defaultValue={user?.username}
                                isInvalid={errors.username}
                                type="name"
                                placeholder="Identifiant"
                                aria-label="Username"
                                bg="#fff"
                                value={user?.username}
                                isDisabled={true}
                            />
                        </InputGroup>
                        {errors.username && <Text fontSize="13px" color="tomato">Nom d'utilisateur déjà pris</Text>}
                    </FormControl>
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
                                defaultValue={user?.email}
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
                        value={variables.campus}
                        onChange={(e) =>
                            setVariables({ ...variables, campus: e.target.value })
                        }
                        justifyContent="center"
                        alignItems="center"
                    >
                        <InputGroup>
                            <Select
                                value={variables.campus}
                                isInvalid={errors.campus}
                                type="campus"
                                placeholder={user?.campus}
                                aria-label="campus"
                                bg="#fff"
                            >
                                {campusList.map(campus => (
                                    <option value={campus.value}>{campus.name}</option>
                                ))}
                            </Select>
                        </InputGroup>
                    </FormControl>
                    <FormControl
                        isRequired
                        value={variables.role}
                        onChange={(e) =>
                            setVariables({ ...variables, role: e.target.value })
                        }
                        justifyContent="center"
                        alignItems="center"
                    >
                        <InputGroup>
                            <Select
                                value={variables.role}
                                isInvalid={errors.role}
                                type="role"
                                placeholder={user?.role}
                                aria-label="role"
                                bg="#fff"
                            >
                                {rolesList.map(role => (
                                    <option value={role.value}>{role.name}</option>
                                ))}
                            </Select>
                        </InputGroup>
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
                                />{"Changer d'image de profil"}
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
                    <Button
                        variant="success"
                        type="submit"
                        disabled={loading}
                        bg="#39414f"
                        color="#fff"
                    >
                        {loading ? "loading…" : "Modifier"}
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

