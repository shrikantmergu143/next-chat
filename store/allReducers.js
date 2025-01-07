import { uuidv4 } from "../components/utils";
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
    friendsList: {
        data:[],
        pagination: {
            total_records: "",
            limit: "",
            page: "",
            total_pages: ""
        }
    },
    chatMessagesList: {
        data:[],
    },
    ModalPopup:{
        title:"",
        data:{},
        show:"",
        callBackModal:()=>null,
        buttonSuccess:""
    },
    channelDetails: null,
    friendsDetails: null,
    activeTab: "Home",
    device_id:uuidv4()
};

export const allReducers = (state = initialData, action) => {
    switch (action?.type) {
        case ActionTypes.SET_STORE_ACTIVE_TAB:{
            return {
                ...state,
                activeTab: action?.payload,
            }
        }
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
        case ActionTypes.SET_STORE_FRIEND_LIST:{
            return {
                ...state,
                friendsList: action?.payload? action?.payload : initialData.friendsList,
            }
        }
        case ActionTypes.SET_STORE_FRIEND_DETAILS:{
            return {
                ...state,
                friendsDetails: action?.payload? action?.payload : initialData.friendsDetails,
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
        case ActionTypes.SET_STORE_CHANNELS_DETAILS:
            return{
                ...state,
                channelDetails: action?.payload,
            }
        case ActionTypes.SET_STORE_CHAT_MESSAGES_LIST:
            return{
                ...state,
                chatMessagesList: action?.payload,
            }
        case ActionTypes.SET_STORE_DEVICE_ID:
            return{
                ...state,
                device_id: action?.payload,
            }
        default:
            return state;
    }
};