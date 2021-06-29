import React from 'react'
import {
    Box, Image, Text
} from "@chakra-ui/react";
import hermesWhite from '../../img/hermes1.png'

export default function Footer() {
    return (
        <Box display="flex" position="absolute" css={{ transform: "translate(-50%)" }} bottom="0" left="50%" spacing={5}>
            <Image loading="eager" width="75px" src={hermesWhite} bg="none" />
            <Text alignSelf="center" fontSize="smaller" color="#39414f" >
                <span>© Copyright {new Date().getUTCFullYear()} | </span>
                <span> Made with ♥ in France | </span>
                <span> Created by Adrien N., Bruno H., Moshtagh M., Victor M.</span>
            </Text>
        </Box>
    )
}
