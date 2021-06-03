import React, { useState } from "react";
import { Button, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputLeftElement, Stack, Textarea } from "@chakra-ui/react";
import { Box, Container, Flex } from "@chakra-ui/layout";

function Contact() {
    const [errors, setErrors] = useState({});



    const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

    return (
        <Stack spacing="30px">
            <Heading textAlign="center" color="#E9E7E1">On vous écoute !</Heading>
            <form action="http://localhost:4000/send" method="POST">
                <Container maxWidth="4xl" css={{ margin: '0 auto' }}>
                    <Stack spacing={5} justifyContent="center" alignItems="center">
                        <FormControl
                            isRequired
                            justifyContent="center"
                            alignItems="center"
                        >
                            <InputGroup>
                                <InputLeftElement />
                                <Input
                                    required
                                    type="subject"
                                    placeholder="votre sujet"
                                    aria-label="Sujet"
                                    bg={'#E9E7E1'}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl
                            isRequired
                            justifyContent="center"
                            alignItems="center">
                            <InputGroup>
                                <InputLeftElement />
                                <Textarea
                                    required
                                    bg={"#E9E7E1"}
                                    h="42vh"
                                    id="message"
                                    aria-label="message"
                                    placeholder="Votre message"
                                />
                            </InputGroup>
                        </FormControl>
                        <Button
                            variant="success"
                            bg="#39414f"
                            color="white"
                            type="submit"
                            _hover={{ bg: '#eae7e1', color: '#39414f' }}
                        >
                            Envoyer
					</Button>
                    </Stack>
                </Container>
            </form>
        </Stack>
    );
}

export default Contact;