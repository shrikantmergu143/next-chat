import { ActionTypes } from "./Actions";

export const initialData = {
    currentUser:{},
    access_token:"",
    channelsList: {
        data:[],
        pagination: {
            total_records: "",
            limit: "",
            page: "",
            total_pages: ""
        }
    }
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
        case ActionTypes.SET_STORE_CHANNELS_LIST:{
            return {
                ...state,
                channelsList: action?.payload? action?.payload : initialData.channelsList,
            }
        }
        default:
            return state;
    }
};