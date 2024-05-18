export const ActionTypes = {
    GET_CURRENT_URL: "GET_CURRENT_URL",

}
export const setStoreCurrentURL = (token) => {
    return {
       type: ActionTypes.GET_CURRENT_URL,
       payload: token,
    }
};
