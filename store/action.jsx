import { GetRequestCallAPI } from "../components/api/GetRequest";
import App_url from "../components/common/constant";
import { setStoreChannelsList } from "./Actions";

const getChannelsList = async (access_token,  dispatch, payload) =>{
    const response = await GetRequestCallAPI(App_url.api.API_CHANNELS, access_token);
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
const action = {
    getChannelsList: getChannelsList,
}
export default action;