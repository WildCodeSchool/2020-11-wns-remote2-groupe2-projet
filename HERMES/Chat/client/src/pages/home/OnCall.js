import React, { useContext } from 'react';
import { Box, Container, Button, Text, IconButton } from '@chakra-ui/react';
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
        stream,
        muteUnmute,
        playStop,
        micro,
        video,
        loading,
        targetName
    } = useContext(SocketContext)

    return (
        <Container display="flex" flexDirection={{ base: "row", md: "column" }} p={0} width={{ base: "100%", md: "40%" }}>
            {(stream) && (
                <>
                    <Box position="relative">
                        <video style={{ overflowY: "auto" }} playsInline muted ref={userVideo} autoPlay />
                        <Box position="absolute" zIndex="10" css={{ transform: "translate(-50%)" }} bottom="0" left="50%">
                            <IconButton m="2px" isRound _hover="none" _focus="none" bg={micro ? "white" : "red.500"} onClick={() => muteUnmute()} >{micro ? <i className="fas fa-microphone" style={{ color: "#39414f" }}></i> : <i className="fas fa-microphone-slash" style={{ color: "#39414f" }}></i>}</IconButton>
                            <IconButton m="2px" isRound _hover="none" _focus="none" bg={video ? "white" : "red.500"} onClick={() => playStop()}>{video ? <i className="fas fa-video" style={{ color: "#39414f" }}></i> : <i className="fas fa-video-slash" style={{ color: "#39414f" }}></i>}</IconButton>
                        </Box>
                    </Box>
                    {callAccepted && <video style={{ overflowY: "auto" }} playsInline muted ref={partnerVideo} autoPlay />}

                </>)}
            {(stream && !callAccepted) &&
                <Button w="fit-content" alignSelf="center" m="5px" isLoading={loading} bg="white" color="#39414f" onClick={() => callPeer(user)} rightIcon={<MdCall />}>{loading ? "En cours…" : `Appeler ${targetName}`}</Button>}

            {
                (receivingCall && !callAccepted) && (
                    <Box display="flex" justifyContent="center" flexDirection="column" mt={5}>
                        <Text color="#39414f">{caller} vous appel !</Text>
                        <Button bg="green.500" color="white" onClick={acceptCall}>Accepter</Button>
                    </Box>
                )
            }
        </Container >
    );
}
