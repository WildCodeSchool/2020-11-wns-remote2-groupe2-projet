import { Box, Container } from '@chakra-ui/layout'
import React from 'react'

import VideoPlayer from "../../components/VideoPlayer"
import Notifications from "../../components/Notifications"
import Options from "../../components/Options"

export default function OnCall() {
    return (
        <Container>
            <Box>

                <VideoPlayer />
            </Box>
            <Box>

                <Options>
                    <Notifications />
                </Options>
            </Box>
        </Container>
    )
}
