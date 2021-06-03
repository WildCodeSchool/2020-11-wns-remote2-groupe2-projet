import React, { useState, useEffect } from 'react'
import MyProfil from "./MyProfil"
import Contact from "./Contact"
import { Box, Container, Flex, ListItem, OrderedList, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import { Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useDisclosure } from "@chakra-ui/hooks"
import { useAuthDispatch } from "../../context/auth"
import User from "../../img/user.svg"
import Email from "../../img/email.svg"
import Parametre from "../../img/parametres.svg"
import { Button } from '@chakra-ui/button'

export default function Index() {

    const [path, setPath] = useState('profil')
    const onChangePath = (e) => {
        setPath(e)
    }
    useEffect(() => {
        onChangePath(path)
    }, [path])

    const authDispatch = useAuthDispatch();

    const { isOpen: isOpenDisconnect, onOpen: onOpenDisconnect, onClose: onCloseDisconnect } = useDisclosure()

    const handleInformationBlock = () => {
        switch (path) {
            case 'profil':
                return <MyProfil />


            case 'contact':

                return <Contact />

            case 'paramètre':

                break;

            default:
                break;
        }
    }

    const logout = () => {
        authDispatch({ type: "LOGOUT" });
        window.location.href = "/login";
    };

    return (
        <>
            <Container
                width="30%"
                borderBottomLeftRadius="10px"
                m={0}
                p={0}
                backgroundColor="rgba(244,239,230,0.8)"
                color="#39414F"
                css={{
                    overflowX: "scroll",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                <Flex justifyContent="space-between" flexDirection="column" h="100%">
                    <OrderedList display="flex" flexDirection="column" justifyContent={"center"} m={0}>
                        <ListItem textAlign="center" height="50px" cursor="pointer"
                            backgroundColor={path === 'profil' ? "#C4C6CB" : "transparent"} color="#39414F"
                            onClick={() => onChangePath('profil')}>
                            <Box display="flex" flexDirection={"row"} justifyContent="center" mt="8px">
                                <Image src={User} alt="user"
                                    maxWidth="25px"
                                />
                                <Text fontSize="xl" display={{ base: "none", md: "flex" }} marginLeft="1rem">
                                    Mon profil
                                </Text>
                            </Box>
                        </ListItem>

                        <ListItem textAlign="center" height="50px" cursor="pointer"
                            backgroundColor={path === 'contact' ? "#C4C6CB" : "transparent"} color="#39414F"
                            onClick={() => onChangePath('contact')}>
                            <Box display="flex" flexDirection={"row"} justifyContent="center" mt="8px">
                                <Image src={Email} alt="user"
                                    maxWidth="25px"
                                />
                                <Text fontSize="xl" display={{ base: "none", md: "flex" }} marginLeft="1rem">
                                    Contact
                                </Text>
                            </Box>
                        </ListItem>

                        <ListItem textAlign="center" height="50px" cursor="pointer"
                            backgroundColor={path === 'parametre' ? "#C4C6CB" : "transparent"} color="#39414F"
                            onClick={() => onChangePath('parametre')}>
                            <Box display="flex" flexDirection={"row"} justifyContent="center" mt="8px">
                                <Image src={Parametre} alt="user"
                                    maxWidth="25px"
                                />
                                <Text fontSize="xl" display={{ base: "none", md: "flex" }} marginLeft="1rem">
                                    Paramètres
                                </Text>
                            </Box>
                        </ListItem>
                    </OrderedList>

                    <OrderedList display="flex" flexDirection="column" m={0}>
                        <ListItem textAlign="center" bg="#9B2C2C" cursor="pointer" height="50px" colorScheme="red"
                            color="white" onClick={onOpenDisconnect}>
                            <Text mt="10px" fontSize="xl">Deconnexion</Text>
                        </ListItem>
                    </OrderedList>

                </Flex>

                <Modal
                    isCentered
                    onClose={onCloseDisconnect}
                    isOpen={isOpenDisconnect}
                    motionPreset="slideInBottom"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign="center">Etes-vous sur de vouloir vous déconnecter de HERMES
                            ?</ModalHeader>
                        <Box m={3} display="flex" justifyContent="space-between">
                            <Button bg="#39414f" color="white" width="33%" onClick={onCloseDisconnect}>Non</Button>
                            <Button bg="#39414f" color="white" width="33%" onClick={logout}>Oui</Button>
                        </Box>
                    </ModalContent>
                </Modal>
            </Container>
            <Container
                width={"75%"}
                display="flex"
                flexDirection="column"
                maxWidth="none"
                bg="#6B7383"
                justifyContent="center"
                borderBottomRadius="10px">
                {handleInformationBlock()}
            </Container>
        </>
    )
}

