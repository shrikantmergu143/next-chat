import { uuidv4 } from "../components/utils";
import { ActionTypes } from "./Actions";
import { IAllReducers, IReducers } from "./type";

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
    socketResponse:null,
    pinEntered: false,
    notificationList: [],
    pagination:{
        page_data:[],
        page_size:50,
        page_number:1
    }
};


export const allReducers = (state:IReducers = initialData, action:IAllReducers) => {
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
            const sortList = FriendMessage?.sort?.((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
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
            const sortList = FriendMessage?.sort?.((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            return{
                ...state,
                MessageList:{
                    ...state?.MessageList,
                    [friend]:sortList
                }
            }
        }
        case ActionTypes.SET_STORE_UPDATE_MESSAGE:{
            const friend = action?.payload?.group_id;
            const messageData = action?.payload?.data;
            const MessageState = state?.MessageList?.[friend];
            const FriendMessage = [];

            MessageState?.map?.((item, index)=>{
                if(messageData?._id == item?._id){
                    FriendMessage.push(messageData);
                }else{
                    FriendMessage.push(item)
                }
            });
            const sortList = FriendMessage?.sort?.((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
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
        case ActionTypes.SET_STORE_CLEAR_STATE:
            return{
                ...initialData,
                theme: state?.theme,
            }
        case ActionTypes.SET_PIN:
            return { ...state, savedPin: action.payload, pinVerified: true };
        case ActionTypes.VERIFY_PIN:
            return { ...state, pinVerified: action.payload };
        case ActionTypes.RESET_PIN:
            return { ...state, savedPin: null, pinVerified: false };
        case ActionTypes.SET_STORE_PAGINATION_LIST:{
            return {
                ...state,
                pagination:{
                    ...initialData?.pagination,
                    page_data:action?.payload?.page_data,
                    page_size:action?.payload?.page_size,
                    page_number:action?.payload?.page_number,
                }
            }
        };
        case ActionTypes.SET_UPDATE_PAGINATION_LIST:{
            const OldPagination = state?.pagination?.page_data;
            const newData = action?.payload;
            let old_page_number = state?.pagination?.page_number || 1;
            if(newData?.length > 0){
                newData?.map((item)=>{
                    if(OldPagination?.filter((items)=>items.id === item?.id)?.length === 0){
                        OldPagination?.push(item);
                    }
                });
                old_page_number += 1;
            }
            return {
                ...state,
                pagination:{
                    ...initialData?.pagination,
                    page_data:OldPagination,
                    page_size:state?.pagination?.page_size || 40,
                    page_number:old_page_number
                }
            }
        }
        case ActionTypes.SET_STORE_DELETE_MESSAGE:{
            const messages = state?.MessageList?.[action?.payload?.group_id];
            const listFilter = messages?.filter((item)=>item?._id !== action?.payload?.message_id);
            return{
                ...state,
                MessageList:{
                    ...state?.MessageList,
                    [action?.payload?.group_id]:listFilter
                }
            }
        }
        case ActionTypes.SET_STORE_NOTIFICATION_LIST:{
            return{
                ...state,
                notificationList:action?.payload? action?.payload : initialData?.notificationList,
            }
        }
        case ActionTypes.SET_STORE_NOTIFICATION_READ:{
            const notificationList = [];
            state?.notificationList?.map((item)=>{
                if(item?.group_id != action?.payload){
                    item.count = 0;
                    notificationList.push(item);
                }
            })
            notificationList.push({
                group_id: action?.payload,
                count: 0
            });

            return{
                ...state,
                notificationList:notificationList
            }
        }
        default:
            return state;
    }
};