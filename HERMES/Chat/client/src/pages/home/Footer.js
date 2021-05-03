import React from 'react'
import {
    Box, Avatar, Text
} from "@chakra-ui/react";
import hermesWhite from '../../img/hermes-white.png'

export default function Footer() {
    return (
        <Box display="flex" position="fixed" alignItems="center" bottom="0"
            spacing={5}>
            <Avatar loading="eager" width="75px" src={hermesWhite} bg="none" />
            <Text fontSize="smaller" color="white" >
                <span>| © Copyright {new Date().getUTCFullYear()} | </span>
                <span> Made with ♥ in France | </span>
                <span> Created by Adrien N., Bruno H., Moshtagh M., Victor M.</span>
            </Text>
        </Box>
    )
}
