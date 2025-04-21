import { GetRequestCallAPI } from "../components/api/GetRequest";
import { PostRequestAPI } from "../components/api/PostRequest";
import App_url from "../components/common/constant";
import { setStoreChannelsDetails, setStoreChannelsList, setStoreChatMessagesList, setStoreClearGroupMessage, setStoreFriendDetails, setStoreFriendList, setStoreNotificationList, setStoreNotificationRead } from "./Actions";

const getChannelsList = async (access_token:string,  dispatch?:any, payload?:any) =>{
    const formData = { page: 1, limit: 40, search:"", group_type:"" };
    if(payload?.page){
        formData.page = payload.page
    }
    if(payload?.limit){
        formData.limit = payload.limit
    }
    const response = await GetRequestCallAPI(App_url.api.API_GET_GROUPS, access_token, formData);
    if(response?.status == 200){
        if(dispatch){
            dispatch(setStoreChannelsList(response?.data?.data))
        }else{
            return response;
        }
    }else{
        if(dispatch){
            dispatch(setStoreChannelsList())
        }else{
            return response;
        }
    }
}
const getChannelsDetails = async (access_token,  dispatch, payload) =>{
    const response = await GetRequestCallAPI(`${App_url.api.API_GET_GROUP_DETAILS}/${payload}`, access_token);
    if(response?.status == 200){
        if(dispatch){
            dispatch(setStoreChannelsDetails(response?.data?.data))
        }else{
            return response;
        }
    }else{
        if(dispatch){
            dispatch(setStoreChannelsDetails())
        }else{
            return response;
        }
    }
}
const getFriendList = async (access_token,  dispatch, payload) =>{
    
    const response = await GetRequestCallAPI(`${App_url.api.API_GET_GROUPS}`, access_token, payload);
    if(response?.status == 200){
        if(dispatch){
            dispatch(setStoreFriendList(response?.data?.data))
        }else{
            return response;
        }
    }else{
        if(dispatch){
            dispatch(setStoreFriendList())
        }else{
            return response;
        }
    }
}
const getFriendsDetails = async (access_token,  dispatch, payload) =>{
    const response = await GetRequestCallAPI(`${App_url.api.API_GET_GROUP_DETAILS}/${payload}`, access_token);
    // if(response?.status == 200){
    //     if(dispatch){
    //         dispatch(setStoreFriendDetails(response?.data?.data))
    //     }else{
    //         return response;
    //     }
    // }else{
    //     if(dispatch){
    //         dispatch(setStoreFriendDetails())
    //     }else{
    //         return response;
    //     }
    // }
}
const getChatMessagesList = async (access_token,  dispatch, payload) =>{
    const formData = { page: 1, limit: 40, search:"", updated_at:"" };
    if(payload?.page){
        formData.page = payload.page
    }
    if(payload?.limit){
        formData.limit = payload.limit
    }
    if(payload?.updated_at){
        formData.updated_at = payload.updated_at
    }
    const response = await GetRequestCallAPI(`${App_url.api.API_GET_CHAT_MESSAGES_LIST}/${payload?.group_id}`, access_token, formData);

    if(response?.status == 200){
        if(dispatch){
            dispatch(setStoreChatMessagesList({
                data:response?.data?.data?.data,
                group_id: payload?.group_id,
                totalCount: payload?.totalCount
            }));
            return response;
        }else{
            return response;
        }
    }else{
        if(dispatch){
            // if(formData?.page == 1){
            //     dispatch(setStoreClearGroupMessage(payload?.group_id))
            // }else{
            //     // dispatch(setStoreChatMessagesList({
            //     //     data:[],
            //     //     group_id: payload?.group_id
            //     // }))
            // }
            return response;
        }else{
            return response;
        }
    }
}
const addNotificationCount = async (access_token: string, message_id: string)=>{
    const response = await PostRequestAPI(App_url.api.CHAT_NOTIFICATION_ADD, {message_id: message_id}, access_token, );
    return response;
}
const getNotificationList = async (access_token: string, dispatch?:any)=>{
    const response = await GetRequestCallAPI(`${App_url.api.CHAT_NOTIFICATION_GET}`, access_token, );
    if(dispatch){
        if(response?.status == 200){
            dispatch(setStoreNotificationList(response?.data?.data))
        }else{
            dispatch(setStoreNotificationList())
        }
    }
}
const getReadNotificationList = async (access_token: string, group_id?:any, dispatch?:any)=>{
    const response = await GetRequestCallAPI(`${App_url.api.CHAT_NOTIFICATION_MARK_READ}/${group_id}`, access_token);
    if(dispatch){
        if(response?.status == 200){
            dispatch(setStoreNotificationRead(group_id))
        }else{
            dispatch(setStoreNotificationRead(group_id))
        }
    }
}

const action = {
    getChannelsList: getChannelsList,
    getChannelsDetails: getChannelsDetails,
    getFriendList: getFriendList,
    getFriendsDetails: getFriendsDetails,
    getChatMessagesList: getChatMessagesList,
    addNotificationCount: addNotificationCount,
    getNotificationList: getNotificationList,
    getReadNotificationList: getReadNotificationList,
}
export default action;