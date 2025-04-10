import { IStoreDeleteMessage } from "./type";

export const ActionTypes = {
    GET_CURRENT_URL: "GET_CURRENT_URL",
    SET_STORE_ACCESS_TOKEN:"SET_STORE_ACCESS_TOKEN",
    SET_STORE_USER_DETAILS:"SET_STORE_USER_DETAILS",
    SET_STORE_CHANNELS_LIST:"SET_STORE_CHANNELS_LIST",
    SET_CONFIRM_MODAL:"SET_CONFIRM_MODAL",
    SET_SHOW_MODAL:"SET_SHOW_MODAL",
    SET_STORE_CHANNELS_DETAILS:"SET_STORE_CHANNELS_DETAILS",
    SET_STORE_FRIEND_LIST:"SET_STORE_FRIEND_LIST",
    SET_STORE_FRIEND_DETAILS:"SET_STORE_FRIEND_DETAILS",
    SET_STORE_ACTIVE_TAB:"SET_STORE_ACTIVE_TAB",
    SET_STORE_DEVICE_ID:"SET_STORE_DEVICE_ID",
    SET_STORE_CHAT_MESSAGES_LIST:"SET_STORE_CHAT_MESSAGES_LIST",
    SET_STORE_CREATE_MESSAGE:"SET_STORE_CREATE_MESSAGE",
    SET_STORE_CLEAR_GROUP_MESSAGE:"SET_STORE_CLEAR_GROUP_MESSAGE",
    SET_STORE_THEME:"SET_STORE_THEME",
    SET_STORE_SOCKET_RESPONSE:"SET_STORE_SOCKET_RESPONSE",
    SET_STORE_CLEAR_STATE:"SET_STORE_CLEAR_STATE",
    VERIFY_PIN:"VERIFY_PIN",
    SET_PIN:"SET_PIN",
    RESET_PIN:"RESET_PIN",
    SET_UPDATE_PAGINATION_LIST:"SET_UPDATE_PAGINATION_LIST",
    SET_STORE_PAGINATION_LIST:"SET_STORE_PAGINATION_LIST",
    SET_STORE_DELETE_MESSAGE:"SET_STORE_DELETE_MESSAGE",
}
export const setPin = (pin) => ({
    type: ActionTypes.SET_PIN,
    payload: pin,
});

export const verifyPin = (status) => ({
    type: ActionTypes.VERIFY_PIN,
    payload: status,
});

export const resetPin = () => ({
    type: ActionTypes.RESET_PIN,
});
export const setStoreClearState = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_CLEAR_STATE,
       payload: token,
    }
};
export const setStoreTheme = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_THEME,
       payload: token,
    }
};
export const setStoreDeviceId = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_DEVICE_ID,
       payload: token,
    }
};
export const setStoreActiveTab = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_ACTIVE_TAB,
       payload: token,
    }
};
export const setStoreCurrentURL = (token?:any) => {
    return {
       type: ActionTypes.GET_CURRENT_URL,
       payload: token,
    }
};
export const setStoreAccessToken = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_ACCESS_TOKEN,
       payload: token,
    }
};
export const setStoreUserDetails = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_USER_DETAILS,
       payload: token,
    }
};

export const setStoreChannelsList = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_CHANNELS_LIST,
       payload: token,
    }
};
export const setShowConfirmModal = (token?:any) => {
    return {
       type: ActionTypes.SET_CONFIRM_MODAL,
       payload: token,
    }
};
export const setShowModal = (token?:any) => {
    return {
       type: ActionTypes.SET_SHOW_MODAL,
       payload: token,
    }
};
export const setStoreChannelsDetails = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_CHANNELS_DETAILS,
       payload: token,
    }
};
export const setStoreFriendList = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_FRIEND_LIST,
       payload: token,
    }
};
export const setStoreChatMessagesList = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_CHAT_MESSAGES_LIST,
       payload: token,
    }
};
export const setStoreClearGroupMessage = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_CLEAR_GROUP_MESSAGE,
       payload: token,
    }
};
export const setStoreCreateChatMessage = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_CREATE_MESSAGE,
       payload: token,
    }
};
export const setStoreFriendDetails = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_FRIEND_DETAILS,
       payload: token,
    }
};
export const setStoreSocketResponse = (token?:any) => {
    return {
       type: ActionTypes.SET_STORE_SOCKET_RESPONSE,
       payload: token,
    }
};
export const setUpdatePaginationList = (payload)=>{
    return{
        type: ActionTypes.SET_UPDATE_PAGINATION_LIST,
        payload: payload
    }
}
export const setStorePaginationList = (payload)=>{
    return{
        type: ActionTypes.SET_STORE_PAGINATION_LIST,
        payload: payload
    }
}
export const setStoreDeleteMessage = (payload:IStoreDeleteMessage)=>{
    return{
        type: ActionTypes.SET_STORE_DELETE_MESSAGE,
        payload: payload
    }
}