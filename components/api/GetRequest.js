import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL, // Replace this with your API base URL
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// GetRequestAPI
export const GetRequestCallAPI = async (apiurl, access_token, data, pdf) => {
    const headers = {
      'Content-type':"application/json, application/vnd.ms-excel",
      'Accept':"application/json",
    }
  
    if(access_token){
      headers.Authorization = `${access_token}`
    }
    if(pdf){
      headers.Accept = "application/pdf"
    }
    const header = {
      headers:headers
    }
    if(data){
      header.params = data
    }
    
      const getResponse = axios.get(`${apiurl}`,header).then(function (result) {
        return result;
      }).catch((e)=>e.response)
      return getResponse;
}

// GetRequestAPI
export const GetRequestAPI = async (apiurl, access_token, data, pdf) => {
  const headers = {
    'Content-type':"application/json",
    'Accept':"application/json",
  }

  if(access_token){
    headers.Authorization = `${access_token}`
  }
  if(pdf){
    headers.Accept = "application/pdf"
  }
  const header = {
    headers:headers
  }
  if(data){
    header.params = data
  }
  
    const getResponse = axios.get(`${apiurl}`,header).then(function (result) {
      return result;
    }).catch((e)=>e.response)
    return getResponse;
}