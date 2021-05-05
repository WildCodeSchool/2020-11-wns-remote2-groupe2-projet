import { Grid, Text } from '@chakra-ui/layout';
import React, { useContext } from 'react';

import { SocketContext } from '../context/socketContext';


const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    return (
        <Grid >
            {stream && (
                <Grid item xs={12} md={6}>
                    <Text variant="h5" gutterBottom>{name || 'Name'}</Text>
                    <video playsInline muted ref={myVideo} autoPlay />
                </Grid>
            )}
            {callAccepted && !callEnded && (
                <Grid item xs={12} md={6}>
                    <Text variant="h5" gutterBottom>{call.name || 'Name'}</Text>
                    <video playsInline ref={userVideo} autoPlay />
                </Grid>
            )}
        </Grid>
    );
};

export default VideoPlayer;