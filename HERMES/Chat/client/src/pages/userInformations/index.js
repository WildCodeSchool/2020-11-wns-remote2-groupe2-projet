import React, { useState } from 'react'
import MyProfil from "./MyProfil"
import { Box, Container, Flex, ListItem, OrderedList, Text } from "@chakra-ui/layout"
import { Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useDisclosure } from "@chakra-ui/hooks"
import { useAuthDispatch } from "../../context/auth"
import { CloseIcon, InfoIcon, SettingsIcon, StarIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/button'

export default function Index() {

    const [path, setPath] = useState('profil')

    const authDispatch = useAuthDispatch();

    const { isOpen: isOpenDisconnect, onOpen: onOpenDisconnect, onClose: onCloseDisconnect } = useDisclosure()

    const handleInformationBlock = () => {
        switch (path) {
            case 'profil':
                return <MyProfil />


            case 'campus':

                break;

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
                    <OrderedList display="flex" flexDirection="column" m={0}>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'profil' ? "#C4C6CB" : "transparent"} color="#39414F" onClick={() => setPath('profil')}>
                            <Text mt="10px" fontSize="xl">Mon profil</Text>
                        </ListItem>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'campus' ? "#C4C6CB" : "transparent"} color="#39414F" onClick={() => setPath('campus')}>
                            <Text mt="10px" fontSize="xl">Mon campus</Text>
                        </ListItem>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'status' ? "#C4C6CB" : "transparent"} color="#39414F" onClick={() => setPath('status')}>
                            <Text mt="10px" fontSize="xl">Mon status</Text>
                        </ListItem>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'parametre' ? "#C4C6CB" : "transparent"} color="#39414F" onClick={() => setPath('parametre')}>
                            <Text mt="10px" fontSize="xl">Paramètre</Text>
                        </ListItem>
                    </OrderedList>
                    <OrderedList display="flex" flexDirection="column" m={0}>
                        <ListItem textAlign="center" bg="#9B2C2C" cursor="pointer" height="50px" colorScheme="red" color="white" onClick={onOpenDisconnect}>
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
                        <ModalHeader textAlign="center" >Etes-vous sur de vouloir vous déconnecter de HERMES ?</ModalHeader>
                        <Box m={3} display="flex" justifyContent="space-between">
                            <Button bg="#39414f" color="white" width="33%" onClick={onCloseDisconnect}>Non</Button>
                            <Button bg="#39414f" color="white" width="33%" onClick={logout}>Oui</Button>
                        </Box>
                    </ModalContent>
                </Modal>
            </Container>
            <Container width={"75%"} display="flex" flexDirection="column" maxWidth="none">
                {handleInformationBlock()}
            </Container>
        </>
    )
}

