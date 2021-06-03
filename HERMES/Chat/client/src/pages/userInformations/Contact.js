import {useForm} from "react-hook-form";
import React from "react";
import {Button, FormControl, FormErrorMessage, Input, Stack, Textarea} from "@chakra-ui/react";
import {Box, Container, Flex} from "@chakra-ui/layout";

function Contact() {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
            }, 3000);
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container maxWidth="4xl" mt={32}>

                <Stack display="flex" flexDirection="column" spacing={6}>
                    <Box flex={1}>
                        <FormControl isInvalid={errors.sujet}>
                            <Input
                                id="sujet"
                                placeholder="Sujet :"
                                {...register("sujet", {
                                    required: "This is required",
                                    minLength: {value: 4, message: "Minimum length should be 4"}
                                })}
                            />
                            <FormErrorMessage>
                                {errors.sujet && errors.sujet.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box flex={1}>
                        <FormControl isInvalid={errors.message}>
                            <Textarea
                                h="42vh"
                                id="message"
                                placeholder="Votre message"
                                {...register("message", {
                                    required: "This is required",
                                    minLength: {value: 4, message: "Minimum length should be 4"}
                                })}
                            />
                            <FormErrorMessage>
                                {errors.message && errors.message.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button bg="#39414f" color="white" isLoading={isSubmitting} type="submit"
                                _hover={{bg: "#eae7e1", color:"#39414f"}}>
                            Envoyer
                        </Button>
                    </Box>
                </Stack>

            </Container>

        </form>
    );
}

export default Contact;