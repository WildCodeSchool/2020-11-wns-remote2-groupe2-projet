import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import {
  VStack,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Portal,
  Button,
  IconButton
} from '@chakra-ui/react';
import { useAuthState } from '../../context/auth';
import { gql, useMutation } from '@apollo/client';
import useSound from 'use-sound';
import ReactSound from '../../sounds/reactSound.mp3'

const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($uuid: String!, $content: String!) {
    reactToMessage(uuid: $uuid, content: $content) {
      uuid
    }
  }
`;

export default function Message({ message }) {
  const { user } = useAuthState();
  const [play] = useSound(ReactSound);
  const sent = message.from === user.username;
  const bottomRightRadius = sent ? 0 : 32;
  const bottomLeftRadius = sent ? 32 : 0;
  const alignment = sent ? "flex-end" : "flex-start";
  const received = !sent;

  const [showPopover, setShowPopover] = useState(false);
  const reactionIcons = [...new Set(message.reactions.map((r) => r.content))];

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) => setShowPopover(false),
  });

  const react = (reaction) => {
    play()
    reactToMessage({ variables: { uuid: message.uuid, content: reaction } });
  };

  const initRef = React.useRef();


  const reactButton = (
    <>
      <Popover isLazy placement='top' initialFocusRef={initRef}>
        <>
          <PopoverTrigger>
            <IconButton m="2px" bg="transparent" isRound _hover="none" _focus="none"><i class="fas fa-laugh-beam"></i></IconButton>
          </PopoverTrigger>
          <Portal>
            <PopoverContent _focus="none" borderRadius="9999px">
              <PopoverBody>
                <PopoverArrow />
                {reactions.map((reaction) => (
                  <Button
                    variant='unstyled'
                    key={reaction}
                    onClick={() => react(reaction)}
                    _hover={{ textDecoration: "none", fontSize: "lg", transition: "0.25" }}
                  >
                    {reaction}
                  </Button>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      </Popover>
    </>
  );

  return (
    <VStack mt={6} alignSelf={alignment} maxW="60%" mb="10px">
      <Box
        display="flex"
        bg={sent ? "blue.50" : "gray.100"}
        p={sent ? "12px 18px 12px 12px" : "12px 12px 12px 18px"}
        minW="min-content"
        wordBreak="break-word"
        borderTopLeftRadius={32}
        borderTopRightRadius={32}
        borderBottomLeftRadius={bottomLeftRadius}
        borderBottomRightRadius={bottomRightRadius}
        alignItems="center"
        data-aos={!sent ? "fade-left" : "fade-right"}>
        {sent && reactButton}
        <Popover
          placement={!sent ? 'right' : 'left'}
          transition={false}>
          <Box position="relative" >
            {message.reactions.length > 0 && (
              <Box position="absolute" right="-20px" bottom="-25px" fontSize="md">
                <Text color="#39414f">{reactionIcons} {message.reactions.length}</Text>
              </Box>
            )}
            <Text
              color="#39414f"
              key={message.uuid}
            >
              {message.content}
            </Text>
          </Box>
        </Popover>
        {received && reactButton}
      </Box >
      <Text alignSelf={alignment} fontSize="xs" color="gray">
        {moment(message.createdAt)
          .locale('fr')
          .format('DD MMM YYYY à HH:mm')}
      </Text>
    </VStack >
  );
}
