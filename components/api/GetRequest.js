import axios from 'axios';

const instance = axios.create({
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// GetRequestAPI
export const GetRequestCallAPI = async (api_url, access_token, data, pdf) => {
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
    
      const getResponse = axios.get(`${process.env.REACT_APP_API_URL}/${api_url}`,header).then(function (result) {
        return result;
      }).catch((e)=>e.response)
      return getResponse;
}

// GetRequestAPI
export const GetRequestAPI = async (api_url, access_token, data, pdf) => {
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
  
    const getResponse = axios.get(`${api_url}`,header).then(function (result) {
      return result;
    }).catch((e)=>e.response)
    return getResponse;
}

export const GetFetchRequestAPI = async (api_url, access_token, data, pdf) => {
  const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  };

  if (access_token) {
      headers.Authorization = `${access_token}`;
  }

  if (pdf) {
      headers.Accept = 'application/pdf';
  }

  const url = api_url
  if (data) {
      Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
  }

  const response = await fetch(url, {
      method: 'GET',
      headers: headers,
  });

  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
