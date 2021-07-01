import React from 'react'
import Page404 from "../img/404page.svg"
import {
    Box,
    Image, Button
} from "@chakra-ui/react";


export default function page404() {
    return (
        <Box position={'relative'}>
            <Image w="100%" h="90vh" src={Page404}/>
            <Button as="a" href="/" cursor="pointer" bg="#0046B5" color="white" position={'absolute'} bottom={'44%'} left={'42%'}>
                Se connecter
            </Button>
        </Box>
    )
}
