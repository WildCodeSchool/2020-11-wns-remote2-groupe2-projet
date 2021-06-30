import { Avatar, AvatarBadge } from '@chakra-ui/avatar'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { useMessageState } from '../../context/message'
import { useBreakpointValue } from '@chakra-ui/media-query'

export default function Header() {

    const { user } = useMessageState();
    const avatarSize = useBreakpointValue({ base: "sm", sm: "md" })

    const baseURL = process.env.REACT_APP_BASE_URL || "";



    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row-reverse"
            m={3}>
            <Flex alignItems="center" >
                <Box display={{ base: "none", md: "block" }} flexDirection="column" >
                    <Text fontWeight="bold" color="#39414f" fontSize={{ xs: 'xs', sm: "xs", md: "xs", lg: "sm" }} >
                        {user?.username}
                    </Text>
                    {/* fontSize={{ base: "24px", md: "40px", lg: "56px" }} */}
                    <Text fontSize={{ xs: 'xs', sm: "xs", md: "xs", lg: "sm" }} color="#39414f">{user?.campus}</Text>
                </Box>

                <Avatar size={avatarSize} loading="eager" m={1} src={baseURL + user?.imageUrl} >
                    <AvatarBadge borderColor="transparent" boxSize="0" bg="green.500" />
                </Avatar>
            </Flex>
        </Box >

    )
}
