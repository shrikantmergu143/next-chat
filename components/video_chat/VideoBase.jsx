import React from 'react';
import { useWebSocket } from '../context/SocketContext';

const VideoCall = () => {
  const { startCall, localVideoRef, remoteVideoRef } = useWebSocket();
  console.log("remoteVideoRef", remoteVideoRef, localVideoRef)
  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '45%', marginRight: '10px' }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '45%' }} />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoCall;
