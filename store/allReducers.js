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
    },
    ModalPopup:{
        title:"",
        data:{},
        show:"",
        callBackModal:()=>null,
        buttonSuccess:""
    },
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
        case ActionTypes.SET_SHOW_MODAL:
            return{
                ...state,
                ModalPopup:action?.payload?.show ? action?.payload:initialData?.ModalPopup
            }
        case ActionTypes.SET_CONFIRM_MODAL:
            return{
                ...state,
                ConfirmPopup:action?.payload?.show ? action?.payload:initialData?.ModalPopup
            }
        default:
            return state;
    }
};