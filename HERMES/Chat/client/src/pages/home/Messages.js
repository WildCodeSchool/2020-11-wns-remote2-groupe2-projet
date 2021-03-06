import React, { useEffect, Fragment, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { FaPaperPlane } from 'react-icons/fa';
import { useMessageDispatch, useMessageState } from '../../context/message';

import Message from './Message';
import {
  Container,
  Box,
  Spacer,
  FormControl,
  Input,
  Text,
  Stack,
  SkeletonText,
} from '@chakra-ui/react';

const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
      reactions {
        uuid
        content
      }
    }
  }
`;

export default function Messages({ stream }) {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();
  const [content, setContent] = useState('');

  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: 'SET_USER_MESSAGES',
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (content.trim() === '' || !selectedUser) return;

    setContent('');

    // Mutation for sending the message
    sendMessage({ variables: { to: selectedUser.username, content } });
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = (
      <Text className='info-text'>Selectionnez un contact</Text>
    );
  } else if (messagesLoading) {
    selectedChatMarkup = (
      <Box>
        <Stack m={5} spacing={8}>
          <SkeletonText noOfLines={3} spacing='4' />
        </Stack>
      </Box>
    );
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message, index) => (
      <Fragment key={message.uuid}>
        <Message message={message} />
        {index === messages.length - 1 && (
          <Box className='invisible'>
            <hr className='m-0' />
          </Box>
        )}
      </Fragment>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = (
      <Text color={'#E9E7E1'}>En ligne, envoyer un message… </Text>
    );
  }

  return (
    <Container
      display="flex"
      flexDirection="column"
      maxWidth="none"
      width={{ base: "100%", md: stream ? "35%" : "100%" }}
      maxH={{ base: "35vh", md: " 100%" }}>
      <Box
        display='flex'
        flexDirection='column-reverse'
        p={3}
        css={{
          height: '95%',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {selectedChatMarkup}
      </Box>
      <Spacer />
      <Box px={3} py={2}>
        <form onSubmit={submitMessage}>
          <FormControl display='flex' alignItems='center' m={0}>
            <Input
              borderRadius='20px'
              p={6}
              bg='#f5f5f5'
              border='0'
              css={{
                '::placeholder': {
                  color: 'rgba(0, 0, 0, 0.5)',
                },
              }}
              type='text'
              color="#39414f"
              placeholder='Entrer un message…'
              _placeholder={{ color: "#39414f", opacity: "0.5" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Box color='#39414f' ml={2} onClick={submitMessage}>
              <FaPaperPlane size='30px' />
            </Box>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
