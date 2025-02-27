import { uuidv4 } from "../components/utils";
import { ActionTypes } from "./Actions";

export const initialData = {
    currentUser:{},
    access_token:"",
    channelsList: {
        data:[],
        page: 1,
        limit: 10,
        totalRecords: 0,
        totalPages: 0
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
    MessageList:{},
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
    device_id:uuidv4(),
    theme:"light",
    socketResponse:null
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
        case ActionTypes.SET_STORE_SOCKET_RESPONSE:{
            return {
                ...state,
                socketResponse: action?.payload,
            }
        }
        case ActionTypes.SET_STORE_CHANNELS_LIST:{
            if(action?.payload){
                const groupData = action?.payload?.data?.map((item)=>{
                    if(item?.group_type === "direct"){
                        const getNotRegister = item?.invites?.find((item)=>item?.status != "accepted");
                        if(getNotRegister?.email == state?.currentUser?.email){
                            item.group_status = getNotRegister?.status
                            item.getUser = state?.currentUser
                        }
                    }
                    return item;
                })
                return {
                    ...state,
                    channelsList: {
                        ...action?.payload,
                        data: groupData
                    },
                }
            }else{
                return {
                    ...state,
                    channelsList: initialData.channelsList,
                }
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
        case ActionTypes.SET_STORE_CHAT_MESSAGES_LIST:{
            const friend = action?.payload?.group_id;
            const MessageState = state?.MessageList?.[friend];
            const FriendMessage = [];
            if(MessageState?.length){
                action?.payload?.data?.map?.((item)=>{
                    FriendMessage?.push(item);
                })
                MessageState?.map?.((item, index)=>{
                    const checkMatch = FriendMessage?.find?.((item1)=>item?._id == item1?._id);
                    if(!checkMatch){
                        FriendMessage.push(item)
                    }
                })
            }else{
                action?.payload?.data?.map?.((item)=>{
                    FriendMessage?.push(item);
                })
            }
            const sortList = FriendMessage?.sort?.((a, b) => new Date(a.created_at) - new Date(b.created_at));
            return{
                ...state,
                MessageList:{
                    ...state?.MessageList,
                    [friend]:sortList
                }
            }
        }
        case ActionTypes.SET_STORE_CREATE_MESSAGE:{
            const friend = action?.payload?.group_id;
            const messageData = action?.payload?.data;
            const MessageState = state?.MessageList?.[friend];
            const FriendMessage = [];

            MessageState?.map?.((item, index)=>{
                const checkMatch = FriendMessage?.find?.((item1)=>item?._id == item1?._id);
                if(!checkMatch){
                    FriendMessage.push(item)
                }
            });
            if(messageData){
                FriendMessage.push(messageData);
            }
            const sortList = FriendMessage?.sort?.((a, b) => new Date(a.created_at) - new Date(b.created_at));
            return{
                ...state,
                MessageList:{
                    ...state?.MessageList,
                    [friend]:sortList
                }
            }
        }
        case ActionTypes.SET_STORE_CLEAR_GROUP_MESSAGE:{
            const friend = action?.payload;
            return{
                ...state,
                MessageList:{
                    ...state?.MessageList,
                    [friend]:[]
                }
            }
        }
        case ActionTypes.SET_STORE_DEVICE_ID:
            return{
                ...state,
                device_id: action?.payload,
            }
        case ActionTypes.SET_STORE_THEME:
            return{
                ...state,
                theme: action?.payload || initialData?.theme,
            }
        default:
            return state;
    }
};