import React, { createContext, useState, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

const ContextProvider = ({ children }) => {

    const [yourID, setYourID] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [user, setUser] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const [micro, setMicro] = useState(false)
    const [video, setVideo] = useState(false)
    const [loading, setLoading] = useState(false)

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();



    const startCall = async () => {
        socket.current = io.connect(baseURL);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (userVideo.current) {
                    setMicro(true)
                    setVideo(true)
                    userVideo.current.srcObject = currentStream;
                }
            })

        await socket.current.on("yourID", (id) => {
            setYourID(id);
        })
        await socket.current.on("allUsers", (users) => {
            setUser(Object.keys(users).find(user => user !== yourID));
        })

        await socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })
    }

    const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", currentStream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = currentStream;
            }
        });

        peer.signal(callerSignal);
    }

    const callPeer = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        peer.on("stream", currentStream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = currentStream;
            }
        });
        setLoading(true)

        socket.current.on("callAccepted", signal => {
            setLoading(false)
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    const muteUnmute = () => {
        const enabled = stream.getAudioTracks()[0].enabled;
        if (enabled) {
            stream.getAudioTracks()[0].enabled = false;
            setMicro(false)
        } else {
            stream.getAudioTracks()[0].enabled = true;
            setMicro(true)
        }
    }

    const playStop = () => {
        let enabled = stream.getVideoTracks()[0].enabled;
        if (enabled) {
            stream.getVideoTracks()[0].enabled = false;
            setVideo(false)
        } else {
            stream.getVideoTracks()[0].enabled = true;
            setVideo(true)
        }
    }

    const LeaveCall = () => {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === 'live') {
                track.stop();
            }
        });
        setCallEnded(true);
        setCallAccepted(false);
        setStream()

        socket.current.destroy();
    }

    return (
        <SocketContext.Provider value={{
            socket,
            yourID,
            callEnded,
            user,
            receivingCall,
            caller,
            callerSignal,
            callAccepted,
            stream,
            userVideo,
            partnerVideo,
            acceptCall,
            callPeer,
            LeaveCall,
            setCaller,
            setStream,
            setYourID,
            setReceivingCall,
            setCallerSignal,
            startCall,
            setUser,
            playStop,
            muteUnmute,
            micro,
            video,
            loading
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };