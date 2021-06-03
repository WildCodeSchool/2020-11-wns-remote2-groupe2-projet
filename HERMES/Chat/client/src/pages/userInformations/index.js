import React, { useState, useEffect } from 'react'
import MyProfil from "./MyProfil"
import { Box, Container, Flex, ListItem, OrderedList, Text } from "@chakra-ui/layout"
import { Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { useDisclosure } from "@chakra-ui/hooks"
import { useAuthDispatch } from "../../context/auth"
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
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'profil' ? "#6B7383" : "transparent"} onClick={() => onChangePath('profil')}>
                            <Text mt="10px" fontSize="xl" color={path === 'profil' ? "#E9E7E1" : "#39414f"}>Mon profil</Text>
                        </ListItem>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'campus' ? "#6B7383" : "transparent"} onClick={() => onChangePath('campus')}>
                            <Text mt="10px" fontSize="xl" color={path === 'campus' ? "#E9E7E1" : "#39414f"}>Mon campus</Text>
                        </ListItem>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'status' ? "#6B7383" : "transparent"} onClick={() => onChangePath('status')}>
                            <Text mt="10px" fontSize="xl" color={path === 'status' ? "#E9E7E1" : "#39414f"}>Mon status</Text>
                        </ListItem>
                        <ListItem textAlign="center" height="50px" cursor="pointer" backgroundColor={path === 'parametre' ? "#6B7383" : "transparent"} onClick={() => onChangePath('parametre')}>
                            <Text mt="10px" fontSize="xl" color={path === 'parametre' ? "#E9E7E1" : "#39414f"}>Paramètre</Text>
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

