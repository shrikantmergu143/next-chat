import axios from 'axios';

const instance = axios.create({
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const PostRequestAPI = async (api_url?:any, payload?:any, access_token?:any, contentType?:any, responseType?:any, config?:any) => {

    const headers:any = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `${access_token}`
    }
    if(contentType){
      headers['Content-Type']='multipart/form-data'
    }
    const contentMethod:any = {
      headers:headers,
    }
    if(responseType){
      contentMethod.responseType = responseType
    }
    if(config){
      contentMethod.onUploadProgress = (e) =>config.onUploadProgress(e);
    }
    const getResponse = axios.post(`${process.env.REACT_APP_API_URL}/${api_url}`,payload, contentMethod).then(function (result) {
      return result;
    }).catch((e)=>e.response);
    return getResponse;
};
