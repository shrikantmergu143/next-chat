export const WebSocketOnMessage = async ({
  evt,
  ws,
  dispatch,
  device_id,
  access_token,
}:any) => {
  const ws_onmessage = JSON.parse(evt.data);
  const payload = {
    request: ws_onmessage?.request,
    response: ws_onmessage?.response,
    msg: ws_onmessage?.response?.msg,
    status: ws_onmessage?.response?.status,
    url: ws_onmessage?.url,
  };
  var tab_id = sessionStorage.tabID;
  if (tab_id && tab_id != ws_onmessage?.tab_id) {
    return null;
  }
  if (ws_onmessage?.audio) {
    const audioBlob = ws_onmessage?.audio;
    const audioUrl = `data:audio/wav;base64,${audioBlob}`;
    const audio = new Audio(audioUrl);
    audio.play();
  }
  console.log("ws_onmessage", ws_onmessage);
};
