import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Box, Container, Grid, Text } from '@chakra-ui/layout';

import { SocketContext } from '../context/socketContext';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';

export default function Options({ children }) {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');


    return (
        <Container >
            <Box elevation={10} >
                <form noValidate autoComplete="off">
                    <Grid container c>
                        <Grid item xs={12} md={6} >
                            <Text gutterBottom variant="h6">Account Info</Text>
                            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                            <CopyToClipboard text={me} >
                                <Button variant="contained" color="primary" fullWidth >
                                    Copy Your ID
                  </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Text gutterBottom variant="h6">Make a call</Text>
                            <Input label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                            {callAccepted && !callEnded ? (
                                <Button variant="contained" color="secondary" fullWidth onClick={leaveCall} >
                                    Hang Up
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" fullWidth onClick={() => callUser(idToCall)} >
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Box>
        </Container>
    )
}
