import { ActionTypes } from "./Actions";

export const initialData = {
    currentUser:{},
    access_token:"",
};

export const allReducers = (state = initialData, action) => {
    switch (action?.type) {
        case ActionTypes.GET_CURRENT_URL:
            return {
                ...state,
                location: action?.payload,
            }
        case ActionTypes.SET_STORE_ACCESS_TOKEN:{
            return {
                ...state,
                access_token: action?.payload,
            }
        }
        case ActionTypes.SET_STORE_USER_DETAILS:{
            return {
                ...state,
                currentUser: action?.payload,
            }
        }
        default:
            return state;
    }
};