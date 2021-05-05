import React, { useContext } from 'react'
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';

import { SocketContext } from '../context/socketContext';
export default function Notification() {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    return (
        <Box>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h1>{call.name} is calling:</h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Answer
              </Button>
                </div>
            )}
        </Box>
    );
}
