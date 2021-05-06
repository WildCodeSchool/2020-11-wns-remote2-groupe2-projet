import React, { useContext } from 'react';
import { Box, Container, Button, Text } from '@chakra-ui/react';
import { MdCall } from "react-icons/md"
import { SocketContext } from '../../context/socketContext';

export default function OnCall() {

    const {
        userVideo,
        callAccepted,
        receivingCall,
        partnerVideo,
        acceptCall,
        caller,
        callPeer,
        user,
        LeaveCall,
        stream
    } = useContext(SocketContext)

    return (
        <Container >
            <Box>
                {stream && <video playsInline muted ref={userVideo} autoPlay />}
                {(stream && !callAccepted) ? (
                    <Button bg="green.500" color="white" onClick={() => callPeer(user)} rightIcon={<MdCall />}>
                        Appeler {caller}</Button>
                ) : <video playsInline muted ref={partnerVideo} autoPlay />}
            </Box>
            <Box>

                {callAccepted && <Button bg="red.500" color="white" onClick={() => LeaveCall()} rightIcon={<MdCall />}>Raccrocher</Button>}

            </Box>
            {(receivingCall && !callAccepted) && (
                <Box>
                    <Text>{caller} vous appel !</Text>
                    <Button onClick={acceptCall}>Accepter</Button>
                </Box>
            )}
        </Container >
    );
}
