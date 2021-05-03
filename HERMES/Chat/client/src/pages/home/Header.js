import { Avatar, AvatarBadge } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Badge, Box, Flex, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React from 'react'
import { useAuthDispatch } from '../../context/auth'
import { useMessageState } from '../../context/message'

export default function Header() {
    const authDispatch = useAuthDispatch();
    const { isOpen: isOpenUpdateInformation, onOpen: onOpenUpdateInformation, onClose: onCloseUpdateInformation } = useDisclosure()
    const { isOpen: isOpenDisconnect, onOpen: onOpenDisconnect, onClose: onCloseDisconnect } = useDisclosure()

    const { user } = useMessageState();

    const baseURL = process.env.REACT_APP_BASE_URL || "";
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const logout = () => {
        authDispatch({ type: "LOGOUT" });
        window.location.href = "/login";
    };
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            m={3}>
            <Button
                onClick={onOpenDisconnect}
            >Se déconnecter</Button>
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
            <Flex>
                <Box>
                    <Text fontWeight="bold" color="white">
                        {user?.username}
                        <Badge ml="1" colorScheme="green">New</Badge>
                    </Text>
                    <Text fontSize="sm" color="white">Developer</Text>
                </Box>
                <Avatar cursor="pointer" onClick={onOpenUpdateInformation} loading="eager" m={1} src={baseURL + user?.imageUrl} >
                    <AvatarBadge borderColor="#39414f" boxSize="0.80em" bg="green.500" />
                </Avatar>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpenUpdateInformation}
                    onClose={onCloseUpdateInformation}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Compte</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Nom d'utilisateur</FormLabel>
                                <Input ref={initialRef} value={user?.username} />
                            </FormControl>
                            {/* RAJOUTER CHAMP CAMPUS */}
                            {/* RAJOUTER CHAMP DESCRIPTION ? */}
                            <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input value={user?.email} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3}>
                                Enregister</Button>
                            <Button onClick={onCloseUpdateInformation}>Retour</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Box>

    )
}
