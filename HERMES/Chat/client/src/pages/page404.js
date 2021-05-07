import React from 'react'
import Tristesse from "../img/page404.png"
import {
	Box,
    Image,
    Text,Button
} from "@chakra-ui/react";


export default function page404() {
    return (
        <Box>
            <Image w="100%" h="100vh" src={Tristesse}/>
            <Text position="absolute" top="50px" left="2em" fontSize="200px" color="#0046B5">
                404
            </Text>
            <Text position="absolute" top="5em" left="6em" fontSize="65px" color="#fff">
             Je suis positivement sûre que tu t’es perdu
            </Text>
            <Button size="lg" as="a" href="/login" textDecoration="none" cursor="pointer" position="absolute" top="26em" left="72em" bg="#0046B5" color="white">
                Se connecter
            </Button>
        </Box>
    )
}
