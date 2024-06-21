export const WebSocketOnMessage = async ({ evt, ws, dispatch, device_id, access_token, }) =>{
    const ws_onmessage = JSON.parse(evt.data);
    const payload = {
        request: ws_onmessage?.request,
        response: ws_onmessage?.response,
        msg: ws_onmessage?.response?.msg,
        status: ws_onmessage?.response?.status,
        url: ws_onmessage?.url,
    };
    var tab_id = sessionStorage.tabID
    if(tab_id && tab_id != ws_onmessage?.tab_id){
        return null;
    }
    console.log("ws_onmessage", ws_onmessage)

}