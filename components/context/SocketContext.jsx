/* eslint-disable react-hooks/exhaustive-deps */
"use strict";
"use client";
import { createContext, useContext, useEffect, useState } from "react";
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
  const { children } = props
  const [connection, setConnect] = useState(null);
  const [access_token, setAccess_token] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector(App_url.allReducers)
  const {device_id} = data;

  useEffect(() => {
    if(access_token){
      if (connection) {
        return;
      }
      const connectWebSocket = () => {
        const socket = new WebSocket(`wss://${process.env.REACT_APP_API}/ws/${access_token}/`);
        socket.addEventListener("open", (event) => {
          console.log("WebSocket connection established.");

          return { type: "WEBSOCKET_CONNECTED", payload: socket }

        });
        socket.addEventListener("message", (event) => {
            const ws_onmessage = JSON.parse(event.data);
            if(ws_onmessage?.url == "unauthorized"){
              setAccess_token(null);
              window.location.replace(`${process.env.API_URL}/${App_url.api.USER_DEL_LOGIN}`);
            }
            WebSocketOnMessage({evt:event, ws:socket, dispatch:dispatch, device_id:device_id, access_token: access_token, setAccess_token:setAccess_token})
        });
        // Error handling
        socket.addEventListener("error", (error) => {
          console.error("WebSocket error:", error);
        });
        socket.addEventListener("close", (event) => {
          console.log("WebSocket connection closed. Reconnecting...");
          setTimeout(connectWebSocket, 3000);
        });
        setConnect(socket);
      };
      connectWebSocket()
    }
    return () => {
      if (connection) {
        connection.close();
        console.log("WebSocket connection closed.");
      }
    };
  }, [access_token ]);

  useEffect(()=>{
    if(data?.access_token){
      setAccess_token(data?.access_token);
    }else{
      setAccess_token("");
    }
  },[data?.access_token])

  const Env = props?.env ? JSON.parse(props?.env):null;
  const sendRequest = (param) =>{
    if(connection){
      SendRequest(connection, param, device_id);
    }
  }
  return (
    <SocketConnect.Provider value={{connect:connection, send:sendRequest, setAccess_token:()=>{}, env: Env}}>
      {children}
      {/* <ToastContainer/> */}
    </SocketConnect.Provider>
  );
}

export default Context;
