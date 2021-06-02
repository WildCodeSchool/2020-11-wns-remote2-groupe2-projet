import { Avatar, AvatarBadge } from '@chakra-ui/avatar'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { useMessageState } from '../../context/message'

export default function Header() {

    const { user } = useMessageState();

    const baseURL = process.env.REACT_APP_BASE_URL || "";



    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row-reverse"
            m={3}>
            <Flex>
                <Box>
                    <Text fontWeight="bold" color="white">
                        {user?.username}
                    </Text>
                    <Text fontSize="sm" color="white">{user?.campus}</Text>
                </Box>

                <Avatar loading="eager" m={1} src={baseURL + user?.imageUrl} >
                    <AvatarBadge borderColor="#39414f" boxSize="0.80em" bg="green.500" />
                </Avatar>
            </Flex>
        </Box>

    )
}
