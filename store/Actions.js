export const ActionTypes = {
    GET_CURRENT_URL: "GET_CURRENT_URL",
    SET_STORE_ACCESS_TOKEN:"SET_STORE_ACCESS_TOKEN",
    SET_STORE_USER_DETAILS:"SET_STORE_USER_DETAILS",

}
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
