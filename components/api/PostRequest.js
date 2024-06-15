import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL, // Replace this with your API base URL
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const PostRequestAPI = async (apiurl, payload, access_token, contentType, responseType, config) => {

    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `${access_token}`
    }
    if(contentType){
      headers['Content-Type']='multipart/form-data'
    }
    const contentMethod = {
      headers:headers,
    }
    if(responseType){
      contentMethod.responseType = responseType
    }
    if(config){
      contentMethod.onUploadProgress = (e) =>config.onUploadProgress(e);
    }
    const getResponse = axios.post(`${apiurl}`,payload, contentMethod).then(function (result) {
      return result;
    }).catch((e)=>e.response);
    return getResponse;
};
