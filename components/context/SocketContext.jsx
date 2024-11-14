/* eslint-disable react-hooks/exhaustive-deps */
"use strict";
"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import App_url from "../common/constant";
import { WebSocketOnMessage } from "./SocketResponse";
import SendRequest from "./SocketRequest";

export const SocketConnect = createContext(null);

export const useWebSocket = () => {
  const context = useContext(SocketConnect);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

function Context(props) {
  const { children } = props;
  const [connection, setConnect] = useState(null);
  const [access_token, setAccess_token] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector(App_url.allReducers);
  const { device_id } = data;

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    if (access_token) {
      if (connection) return;

      const connectWebSocket = () => {
        const socket = new WebSocket(`ws://${process.env.REACT_APP_API}/ws/${access_token}/`);
        
        socket.addEventListener("open", () => {
          console.log("WebSocket connection established.");
          dispatch({ type: "WEBSOCKET_CONNECTED", payload: socket });
        });

        socket.addEventListener("message", async (event) => {
          // console.log("ws_onmessage", JSON.parse(event.data));
          // const { type, data, device_id: messageDeviceId } = JSON.parse(event.data);

          // // Only process messages for this device
          // console.log("messageDeviceId !== device_id",messageDeviceId, device_id)
          // if (messageDeviceId !== device_id) return;
  

          // if (data?.url === "unauthorized") {
          //   setAccess_token(null);
          //   window.location.replace(`${process.env.API_URL}/${App_url.api.USER_DEL_LOGIN}`);
          // } else if (type === 'offer') {
          //   await handleOffer(data);
          // } else if (type === 'answer') {
          //   await peerConnection.current.setRemoteDescription(data);
          // } else if (type === 'candidate') {
          //   await peerConnection.current.addIceCandidate(data);
          // }
          const { type, data, sender_device_id, receiver_device_id } = JSON.parse(event.data);
          if (receiver_device_id !== device_id){
            switch (type) {
              case 'offer':
                await handleOffer(data, sender_device_id);
                break;
              default:
                console.warn("Unknown WebSocket message type:", type);
            }
          }
          switch (type) {
            // case 'offer':
            //   await handleOffer(data, sender_device_id);
            //   break;
            case 'answer':
              await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
              break;
            case 'candidate':
              await peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
              break;
            default:
              console.warn("Unknown WebSocket message type:", type);
          }
          WebSocketOnMessage({ evt: event, ws: socket, dispatch, device_id, access_token, setAccess_token });
        });

        socket.addEventListener("error", (error) => {
          console.error("WebSocket error:", error);
        });

        socket.addEventListener("close", () => {
          console.log("WebSocket connection closed. Reconnecting...");
          setTimeout(connectWebSocket, 3000);
        });

        setConnect(socket);
      };

      connectWebSocket();
    }

    return () => {
      if (connection) {
        connection.close();
        console.log("WebSocket connection closed.");
      }
    };
  }, [access_token]);

  useEffect(() => {
    if (data?.access_token) {
      setAccess_token(data?.access_token);
    } else {
      setAccess_token("");
    }
  }, [data?.access_token]);

  const Env = props?.env ? JSON.parse(props?.env) : null;

  const sendRequest = (param) => {
    if (connection) {
      SendRequest(connection, param, device_id);
    }
  };
  const startCall = async (e) => {
    e.preventDefault();
    try {
      if (peerConnection.current) {
        console.warn("Peer connection already exists. Ignoring start call request.");
        return;
      }
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19301' }],
      });
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendRequest({ type: 'candidate', data: event.candidate, broadcast: true });
        }
      };
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          console.log("event.streams", event.streams)
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      sendRequest({ type: 'offer', data: offer, broadcast: true });
    } catch (error) {
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    }
  };
  
  const handleOffer = async (offer) => {
    // Ensure peerConnection is initialized
    if (!peerConnection.current) {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: '1' }],
      });
  
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendRequest({ type: 'candidate', data: event.candidate, broadcast: true });
        }
      };
  
      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };
    }
  
    try {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
  
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));
  
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      sendRequest({ type: 'answer', data: answer, broadcast: true });
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };
  
  return (
    <SocketConnect.Provider value={{ connect: connection, peerConnection, startCall, handleOffer, send: sendRequest, localVideoRef, remoteVideoRef, setAccess_token, env: Env }}>
      {children}
    </SocketConnect.Provider>
  );
}

export default Context;
