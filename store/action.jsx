import { GetRequestCallAPI } from "../components/api/GetRequest";
import App_url from "../components/common/constant";
import { setStoreChannelsDetails, setStoreChannelsList } from "./Actions";

const getChannelsList = async (access_token,  dispatch, payload) =>{
    const formData = { page: 1, limit: 40 };
    if(payload?.page){
        formData.page = payload.page
    }
    if(payload?.limit){
        formData.limit = payload.limit
    }
    const response = await GetRequestCallAPI(App_url.api.API_CHANNELS, access_token, formData);
    if(response?.status == 200){
        if(dispatch){
            dispatch(setStoreChannelsList(response?.data))
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
    const response = await GetRequestCallAPI(`${App_url.api.API_CHANNELS}/${payload}`, access_token);
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
const action = {
    getChannelsList: getChannelsList,
    getChannelsDetails: getChannelsDetails
}
export default action;