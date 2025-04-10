import axios from 'axios';

const instance = axios.create();

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const DeleteRequest = async (
  api_url?: any,
  payload?: any,
  access_token?: any,
  contentType?: any,
  responseType?: any,
  config?: any
) => {
  const headers: any = {
    Accept: 'application/json',
  };
  if (access_token) {
    headers.Authorization = `${access_token}`;
  }
  if (contentType) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  const contentMethod: any = {
    headers,
  };
  if (responseType) {
    contentMethod.responseType = responseType;
  }
  if (config?.onUploadProgress) {
    contentMethod.onUploadProgress = (e) => config.onUploadProgress(e);
  }
  if (payload) {
    contentMethod.data = payload;
  }
  try {
    const result = await axios.delete(`${process.env.REACT_APP_API_URL}/${api_url}`, contentMethod);
    return result;
  } catch (e: any) {
    return e.response;
  }
};
