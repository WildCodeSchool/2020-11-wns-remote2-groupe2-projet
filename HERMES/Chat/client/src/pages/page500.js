import React from 'react'
import Colere from "../img/page500.png"
import {
	Box,
    Image,
    Text,Button
} from "@chakra-ui/react";


export default function page500() {
    return (
        <Box>
            <Image w="100%" h="100vh" src={Colere}/>
            <Text position="absolute" top="50px" left="4.5em" fontSize="200px" color="#F88601">
                500
            </Text>
            <Text position="absolute" top="5em" left="14em" fontSize="65px" color="#fff" align="center">
                On est à deux doigts<br />
                de la catastrophe
            </Text>
            <Button size="lg" as="a" href="/login" textDecoration="none" cursor="pointer" position="absolute" top="31em" left="62em" bg="#F88601" color="white">
                Se connecter
            </Button>
        </Box>
    )
}
