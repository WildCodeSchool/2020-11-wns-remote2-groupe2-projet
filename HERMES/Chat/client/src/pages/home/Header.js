import { Avatar, AvatarBadge } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Badge, Box, Flex, Text } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/menu'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React from 'react'
import { useAuthDispatch } from '../../context/auth'
import { useMessageState } from '../../context/message'

export default function Header() {
    const authDispatch = useAuthDispatch();
    const { isOpen: isOpenDisconnect, onOpen: onOpenDisconnect, onClose: onCloseDisconnect } = useDisclosure()

    const { user } = useMessageState();

    const baseURL = process.env.REACT_APP_BASE_URL || "";

    const logout = () => {
        authDispatch({ type: "LOGOUT" });
        window.location.href = "/login";
    };
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row-reverse"
            m={3}>
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

                <Menu>
                    <MenuButton cursor="pointer" as={Avatar} colorScheme="pink">
                        <Avatar loading="eager" m={1} src={baseURL + user?.imageUrl} >
                            <AvatarBadge borderColor="#39414f" boxSize="0.80em" bg="green.500" />
                        </Avatar>
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title="Profil">
                            <MenuItem>Mon compte</MenuItem>
                            <MenuItem>Ma classe </MenuItem>
                            <MenuItem>Mon status </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title="Paramètres">
                            <MenuItem>Docs</MenuItem>
                            <MenuItem>FAQ</MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <Button onClick={onOpenDisconnect}>Deconnexion</Button>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>

    )
}
