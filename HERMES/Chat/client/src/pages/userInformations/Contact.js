import React, { useState } from "react";
import { Button, FormControl, Heading, Input, InputGroup, Textarea, useToast } from "@chakra-ui/react";
import { Container, Stack } from "@chakra-ui/layout";
import { gql, useMutation } from "@apollo/client";
import { useMessageState } from "../../context/message";

function Contact() {
    const toast = useToast()
    const { user } = useMessageState();
    const [variables, setVariables] = useState({
        from: user?.email,
        name: user?.username,
        subject: "",
        message: "",
    });

    const SEND_MAIL = gql`
	mutation sendMail(
        $from: String
        $name: String!
		$subject: String!
		$message: String!
	) {
		sendMail(
            from: $from
            name: $name
			subject: $subject
			message: $message
		) {
            from
            name
			subject
			message
		}
	}
`;


    const [sendMail, { loading }] = useMutation(SEND_MAIL, {
        onError: (err) => console.log(err),
    });

    const submitMailForm = async (e) => {
        e.preventDefault();
        await sendMail({ variables }).then((ok) => {
            setVariables({ subject: "", message: "" })
            if (ok) (
                toast({
                    title: "Contact",
                    description: "Mail envoyé avec succès !",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
        );
    };

    return (
        <Stack spacing="30px">
            <Heading textAlign="center" color="#E9E7E1">On vous écoute !</Heading>
            <form onSubmit={submitMailForm} method="POST">
                <Container maxWidth="4xl" css={{ margin: '0 auto' }}>
                    <Stack spacing={5} justifyContent="center" alignItems="center">
                        <FormControl
                            isRequired
                            justifyContent="center"
                            alignItems="center"
                        >
                            <InputGroup>
                                <Input
                                    required
                                    type="subject"
                                    placeholder="Sujet"
                                    aria-label="Sujet"
                                    bg={'#E9E7E1'}
                                    onChange={(e) =>
                                        setVariables({ ...variables, subject: e.target.value })
                                    }
                                    value={variables.subject}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl
                            isRequired
                            justifyContent="center"
                            alignItems="center">
                            <InputGroup>
                                <Textarea
                                    required
                                    bg={"#E9E7E1"}
                                    h="42vh"
                                    id="message"
                                    aria-label="message"
                                    placeholder="Votre message"
                                    onChange={(e) =>
                                        setVariables({ ...variables, message: e.target.value })
                                    }
                                    value={variables.message}
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