import React, { useContext } from 'react';
import { Box, Container, Button, Text, Progress } from '@chakra-ui/react';
import { MdCall } from "react-icons/md"
import { SocketContext } from '../../context/socketContext';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

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
        stream,
        muteUnmute,
        playStop,
        micro,
        video,
        loading
    } = useContext(SocketContext)

    return (
        <Container width="40%" display="flex" flexDirection="column" border="1px" borderColor="#39404F">
            {stream && <video style={{ overflowY: "auto" }} playsInline muted ref={userVideo} autoPlay />}
            {(stream && !callAccepted) ? (
                <Box>
                    {loading && <Progress size="lg" isIndeterminate />}
                    <Button bg="green.500" color="white" onClick={() => callPeer(user)} rightIcon={<MdCall />}>Appeler {caller}</Button>
                    <Button bg="purple" color="white" onClick={() => muteUnmute()} rightIcon={<SmallCloseIcon />}>{micro ? "Fermer micro" : "Allumer micro"}</Button>
                    <Button bg="brown" color="white" onClick={() => playStop()} rightIcon={video ? <ViewOffIcon /> : <ViewIcon />}>{video ? "Fermer caméra" : "Allumer caméra"}</Button>
                </Box>
            ) : <video style={{ overflowY: "auto" }} playsInline muted ref={partnerVideo} autoPlay />}

            {callAccepted && (
                <Box>
                    <Button bg="red.500" color="white" onClick={() => LeaveCall()} rightIcon={<MdCall />}>Raccrocher</Button>
                </Box>
            )}


            {(receivingCall && !callAccepted) && (
                <Box display="flex" justifyContent="center" flexDirection="column" mt={5}>
                    <Text>{caller} vous appel !</Text>
                    <Button onClick={acceptCall}>Accepter</Button>
                </Box>
            )}
        </Container >
    );
}
