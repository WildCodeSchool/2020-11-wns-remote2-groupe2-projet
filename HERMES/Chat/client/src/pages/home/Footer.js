import React from 'react'
import {
    Box, Image, Text
} from "@chakra-ui/react";
import hermesWhite from '../../img/hermes-white.png'

export default function Footer() {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" bottom="0" >
            <Image width="75px" src={hermesWhite} />
            <Text fontSize="smaller" color="white" >© Copyright {new Date().getUTCFullYear()}</Text>
            <Text fontSize="smaller" color="white" >Made with ♥ in France</Text>
            <Text fontSize="smaller" color="white" >Created by Adrien N., Bruno H., Moshtagh M., Victor M. </Text>
        </Box>
    )
}
