"use client";
/* eslint-disable react-hooks/rules-of-hooks */
const SendRequest = (websocket?:any, params?:any, device_id?:any)=>{

    if(device_id){
        params.device_id = device_id
    }
    var tabID = sessionStorage.tabID ? sessionStorage.tabID : sessionStorage.tabID = Math.random();
    if(tabID){
        params.tab_id = tabID;
    }
    if(websocket?.readyState === websocket?.OPEN ){
        if(params?.request !== undefined){
            setTimeout(() => {
                 websocket && websocket?.send(JSON.stringify(params))
            }, 200);
        } else {
            websocket && websocket?.send(JSON.stringify(params))
        };
    }else{
        setTimeout(()=>{
            SendRequest(websocket, params, device_id)
        },1500)
    };
};
export default SendRequest;
