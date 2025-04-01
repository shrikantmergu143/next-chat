import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "./peer";
import { useWebSocket } from "../context/SocketContext";
import usePosterReducers from "../context/usePosterReducers";

const RoomPage = () => {
    const {send, connect} = useWebSocket();
    const {socketResponse, currentUser} = usePosterReducers();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

  const sendMessage = (data) => {
    send({...data, broadcast: false});
  };

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    if (!remoteSocketId) return;
  
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
  
    const offer = await peer.getOffer();
    sendMessage({ type: "user:call", request: { to: remoteSocketId, offer } });
  }, [remoteSocketId]);

  const handleIncomingCall = async (response) => {
    const { from, offer } = response;
    setRemoteSocketId(from);
  
    if (!myStream) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setMyStream(stream);
    }
  
    const ans = await peer.getAnswer(offer);
    console.log(`Incoming Call`, {to: from, ans, offer});
    sendMessage({ type: "call:accepted", request: { to: from, ans } });
  };

  const sendStreams = useCallback(() => {
    if (!myStream) return;
    const senders = peer.peer.getSenders();
    for (const track of myStream.getTracks()) {
      const existingSender = senders.find((sender) => sender.track?.kind === track.kind);
      if (existingSender) {
        existingSender.replaceTrack(track);
      } else {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = ({ from, ans }) => {
    if (!ans || !ans.type || !ans.sdp) {
      console.error("Invalid SDP answer received:", ans);
      return;
    }
  
    if (peer.peer.signalingState !== "stable") {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    } else {
      console.warn("Skipping setLocalDescription: Connection is already stable.");
    }
  }

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    const request = {
        offer, to: remoteSocketId
    }
    sendMessage({ type: "peer:nego:needed", request });
  }, [remoteSocketId]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded, peer.peer]);

  const handleNegoNeedIncoming = useCallback(async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer);
    sendMessage({ type: "peer:nego:done", request:{to: from, ans} });
  }, []);

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    if (!ans || !ans.type || !ans.sdp) {
      console.error("Invalid SDP negotiation answer:", ans);
      return;
    }
  
    if (peer.peer.signalingState !== "stable") {
      await peer.setLocalDescription(ans);
    } else {
      console.warn("Skipping negotiation: Peer connection already stable.");
    }
  }, []);

  useEffect(() => {
    const handleTrackEvent = (ev) => {
      const remoteStream = ev.streams[0];
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream);
    };
  
    peer.peer.addEventListener("track", handleTrackEvent);
  
    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
    };
  }, []);

  useEffect(() => {
    if(connect){
      connect?.addEventListener?.("message", (event) => {
        const payload = JSON.parse(event.data);
        const data = payload
        if (data?.type === "user:joined") handleUserJoined(data?.request);
        else if (data?.type === "incoming:call") handleIncomingCall(data?.request);
        else if (data?.type === "call:accepted") handleCallAccepted(data?.request);
        else if (data?.type === "peer:nego:needed") handleNegoNeedIncoming(data?.request);
        else if (data?.type === "peer:nego:final") handleNegoNeedFinal(data?.request);
      })
    }

  }, [connect, socketResponse, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeedIncoming, handleNegoNeedFinal]);

  useEffect(()=>{
    if(connect){
      sendMessage({type: "room:join", request: { email:currentUser?.id, room:"shrikantmergu123@gmail.com" }})
    }
  },[connect])
  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer playing muted height="100px" width="200px" url={myStream} />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer playing muted height="100px" width="200px" url={remoteStream} />
        </>
      )}
    </div>
  );
};

export default RoomPage;
