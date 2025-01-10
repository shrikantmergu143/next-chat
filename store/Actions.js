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

}
export const setStoreDeviceId = (token) => {
    return {
       type: ActionTypes.SET_STORE_DEVICE_ID,
       payload: token,
    }
};
export const setStoreActiveTab = (token) => {
    return {
       type: ActionTypes.SET_STORE_ACTIVE_TAB,
       payload: token,
    }
};
export const setStoreCurrentURL = (token) => {
    return {
       type: ActionTypes.GET_CURRENT_URL,
       payload: token,
    }
};
export const setStoreAccessToken = (token) => {
    return {
       type: ActionTypes.SET_STORE_ACCESS_TOKEN,
       payload: token,
    }
};
export const setStoreUserDetails = (token) => {
    return {
       type: ActionTypes.SET_STORE_USER_DETAILS,
       payload: token,
    }
};

export const setStoreChannelsList = (token) => {
    return {
       type: ActionTypes.SET_STORE_CHANNELS_LIST,
       payload: token,
    }
};
export const setShowConfirmModal = (token) => {
    return {
       type: ActionTypes.SET_CONFIRM_MODAL,
       payload: token,
    }
};
export const setShowModal = (token) => {
    return {
       type: ActionTypes.SET_SHOW_MODAL,
       payload: token,
    }
};
export const setStoreChannelsDetails = (token) => {
    return {
       type: ActionTypes.SET_STORE_CHANNELS_DETAILS,
       payload: token,
    }
};
export const setStoreFriendList = (token) => {
    return {
       type: ActionTypes.SET_STORE_FRIEND_LIST,
       payload: token,
    }
};
export const setStoreChatMessagesList = (token) => {
    return {
       type: ActionTypes.SET_STORE_CHAT_MESSAGES_LIST,
       payload: token,
    }
};
export const setStoreClearGroupMessage = (token) => {
    return {
       type: ActionTypes.SET_STORE_CLEAR_GROUP_MESSAGE,
       payload: token,
    }
};
export const setStoreCreateChatMessage = (token) => {
    return {
       type: ActionTypes.SET_STORE_CREATE_MESSAGE,
       payload: token,
    }
};
export const setStoreFriendDetails = (token) => {
    return {
       type: ActionTypes.SET_STORE_FRIEND_DETAILS,
       payload: token,
    }
};