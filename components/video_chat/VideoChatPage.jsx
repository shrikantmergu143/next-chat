import React, { useEffect, useRef, useState } from "react";
import { usePosterReducers } from "../context/usePostReducer";

const WebRTCChat = () => {
  const { access_token } = usePosterReducers();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false); // Track socket connection state

  useEffect(() => {
    // Ensure WebSocket is opened and set peerConnection after that
    const ws = new WebSocket(`ws://${process.env.REACT_APP_API}/ws/${access_token}/`);

    ws.onopen = () => {
      setSocket(ws);
      setIsSocketOpen(true);
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log("message.type", message)
      switch (message.type) {
        case "offer":
          // Ensure peerConnection is available before calling methods
            await handleOffer(message.offer);
          break;
        case "answer":
          if (peerConnection) {
            await handleAnswer(message.answer);
          }
          break;
        case "candidate":
          if (peerConnection) {
            await handleCandidate(message.candidate);
          }
          break;
        default:
          break;
      }
    };

    // WebRTC Peer Connection Setup
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendMessage({ type: "candidate", candidate: e.candidate });
      }
    };

    pc.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };

    setPeerConnection(pc);

    // Clean up the WebSocket and PeerConnection on component unmount
    return () => {
      ws.close();
      pc.close();
    };
  }, [access_token]);

  const sendMessage = (message) => {
    if (isSocketOpen && socket) {
      socket.send(JSON.stringify({...message, broadcast: true}));
    }
  };

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      // Ensure peerConnection is set before adding tracks
      if (peerConnection) {
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      }
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };
  const handleOffer = async (offer) => {
    // Check if peerConnection exists and its state
    console.log("peerConnection", peerConnection);
  
    if (!peerConnection || peerConnection.signalingState === "closed") {
      console.log("Creating a new RTCPeerConnection because the old one is closed.");
      // Create a new peer connection
      createNewPeerConnection();
    }
  
    // Make sure peerConnection is available and in valid state
    if (peerConnection && peerConnection.signalingState !== "closed") {
      try {
        // Set remote description (received offer)
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        
        // Create an answer to send back to the caller
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
  
        // Send the answer back to the caller
        sendMessage({ type: "answer", answer });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    }
  };
  
  // Function to create a new RTCPeerConnection
  const createNewPeerConnection = () => {
    // Set up the new peer connection
    const newPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
  
    newPeerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        sendMessage({ type: "candidate", candidate: e.candidate });
      }
    };
  
    newPeerConnection.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };
  
    // Re-assign peerConnection to the new one
    setPeerConnection(newPeerConnection);
  };
  

  const handleAnswer = async (answer) => {
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleCandidate = async (candidate) => {
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };
  const createOffer = async () => {
    if (peerConnection) {
      try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        sendMessage({ type: "offer", offer });
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    }
  };

  useEffect(() => {
    // Start the local video once the peer connection is ready
    if (peerConnection) {
      startLocalVideo();
    }
  }, [peerConnection]);

  return (
    <div>
      <h1>WebRTC Video Chat</h1>
      <button onClick={createOffer}>Start Call</button>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px" }} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
      </div>
    </div>
  );
};

export default WebRTCChat;
