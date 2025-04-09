import { toast } from 'react-toastify';
import App_url from './common/constant';

const getCommonEnv = (env?:any) =>{
    return{
        REACT_APP_DOMAIN_NAME:env?.REACT_APP_DOMAIN_NAME,
        REACT_APP_FAVICON:env?.REACT_APP_FAVICON,
        REACT_APP_MANIFEST_JSON:env?.REACT_APP_MANIFEST_JSON,
        REACT_APP_LOGO:env?.REACT_APP_LOGO,
        REACT_APP_LOGO_NAME:env?.REACT_APP_LOGO_NAME,
        REACT_USERNAME_TWITTER:env?.REACT_USERNAME_TWITTER,
        REACT_APP_STORE_ID:env?.REACT_APP_STORE_ID,
        REACT_ANDROID_PACKAGE:env?.REACT_ANDROID_PACKAGE,
        REACT_APP_NAME:env?.REACT_APP_NAME,
        REACT_APP_PUBLIC_LOGO:env?.REACT_APP_PUBLIC_LOGO,
        API_URL:env?.API_URL,
        REACT_APP_API:env?.REACT_APP_API,

    }
}

/* eslint-disable eqeqeq */
export function uuidv4() { // Public Domain/MIT
    let d = new Date().getTime();//Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
export function getCurrentURL(context?:any) {
    const { req } = context;

    const host = req?.headers?.host;
    const protocol = req?.headers['x-forwarded-proto'] || 'http';
    return `${protocol}://${host}`;
}
const parseCookies = (cookieString) => {
    const cookies:any = {};
    cookieString.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookies[name.trim()] = decodeURIComponent(value);
    });
    return cookies;
};
function checkEmail(emailAddress?:any) {
    return String(emailAddress)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function ValidateEmail(value?:any, error1?:any, error2?:any) {
    const emailRegex = checkEmail(value)
    if (emailRegex) {
      return false;
    } else {
      if( value == ""){
        return error1 || "Enter email address";
      }
      return error2 || 'Invalid email address!';
    }
}
const checkPasswordValidity = (value?:any) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }
  
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }
  
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }
  
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }
  
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Password must contain at least one Special Symbol.";
    }
  
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }
  
    return null;
}

const crypto = require('crypto');


function base64UrlEncode(str?:any) {
    return Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function generateAuthToken(data?:any) {
    const header = {
        typ: 'JWT',
        alg: 'HS256'
    };

    const payloadData:any = {
        ...data,
        user_id: data?._id,
        exp: Math.floor(Date.now() / 1000) + 43200000 // 12 hours from now
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payloadData));
    const signature = crypto
        .createHmac('sha256', `${process.env.TOKEN_KEY}`)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const jwtToken = `${encodedHeader}.${encodedPayload}.${signature}`;

    return jwtToken;
}
const CustomCipher = {
    encode(obj, key) {
        const str = JSON.stringify(obj); // Convert object to string
        return str.split('')
                  .map((char, i) => 
                    String.fromCharCode(char.charCodeAt(0) + key.charCodeAt(i % key.length))
                  )
                  .join('');
    },

    decode(encodedStr, key) {
        const decodedStr = encodedStr.split('')
                                     .map((char, i) => 
                                       String.fromCharCode(char.charCodeAt(0) - key.charCodeAt(i % key.length))
                                     )
                                     .join('');
        return JSON.parse(decodedStr); // Convert back to object
    }
};


function base64UrlDecode(base64Url?:any) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
      base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

function hashEquals(a?:any, b?:any) {
  if (a.length !== b.length) {
      return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function validateJWT(jwtToken?:any) {
  const tokenParts = jwtToken?.split('.');
  if (tokenParts.length === 3) {
      const decodedHeader = base64UrlDecode(tokenParts[0]);
      const decodedPayload = base64UrlDecode(tokenParts[1]);
      const decodedSignature = Buffer.from(tokenParts[2].replace(/-/g, '+').replace(/_/g, '/'), 'base64');

      const expectedSignature = crypto
          .createHmac('sha256', process.env.TOKEN_KEY)
          .update(`${tokenParts[0]}.${tokenParts[1]}`)
          .digest();

      if (hashEquals(decodedSignature.toString('base64'), expectedSignature.toString('base64'))) {
          const decodedHeaderArray = JSON.parse(decodedHeader);
          const decodedPayloadArray = JSON.parse(decodedPayload);

          // Validate token expiration
          if (decodedPayloadArray.exp && decodedPayloadArray.exp >= Math.floor(Date.now() / 1000)) {
              return { payload: decodedPayloadArray, status: true };
          } else {
              return { message: "Token expired", status: false };
          }
      } else {
          return { message: "Invalid JWT: Signatures don't match", status: false };
      }
  } else {
      return { message: "Invalid JWT: Signatures don't match", status: false };
  }
}

export const GetErrorValidation = (errors?:any) =>{
  const Error = {};
  const convertedData = Object.entries(errors).map(([key, value]) => ({ key, value }));
  const Message =  convertedData?.map((item)=>{
      const text = item?.value?.toString()
      Error[item?.key] = text;
          return{
          name:item?.key,
          error:text
      }
  });
  return Error;
}
export const ErrorValidateMsg = (response?:any, state?:any, show?:any)=>{
  if(response?.status === 400){
      let val = true
      if(typeof response?.data?.errors === "object"){
          if(state){
              let error:any = "";
              if(response?.data?.errors?.email){
                  error = "This email is already used."
              }
              if(response?.data?.errors?.username){
                  error = "This username is already used."
              }
              if(val == true){
                  val = false;
                  toast.info(error);
              }
          }else{
              if(response?.data?.errors){
                  const convertedData = Object.entries(response?.data?.errors).map(([key, value]) => ({ key, value }));
                  convertedData?.map((item)=>{
                      const value = item?.value?.toString()?.replaceAll(",", " ")
                      const text = value?.replaceAll("value", item?.key)
                      if(val == true){
                          val = false;
                          toast.info(text);
                      }
                  })
              }
          }
      }
      if(response?.data?.message && val == true){
          val = false;
          toast.info(response?.data?.message);
      }
      if(response?.data?.error && typeof (response?.data?.errors !== "object")){
          if(val == true){
              toast.info(response?.data?.error);
              val = false;
          }
      }
      if(response?.data?.error === "" && typeof (response?.data?.errors === "string")){
          if(val == true){
              toast.info(response?.data?.errors);
              val = false;
          }
      }
      if(response?.error === "" && typeof (response?.errors === "string")){
          if(val == true){
              toast.info(response?.errors);
              val = false;
          }
      }
  }
}
export const AuthenticateVerify = (response?:any, state?:any)=>{

  if(response?.status === 400 ){
      ErrorValidateMsg(response);
  }
  // if(response?.status === 401 || response?.status === 403){
  //       toast.info(language == "En"?"User is logging in on another device.":"Kullanıcı başka bir cihazda oturum açıyor");
  //     dispatch(getSetLogout());
  // }
}

function formatTime(dates?:any) {
    const date:any = new Date(dates);
    var hours:any = date.getHours();
    var minutes:any = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function getThemeDefaultUser(theme?:any){
    if(theme == "dark"){
        return App_url.icons.default_image;
    }else{
        return App_url.icons.default_user_light;
    }
}
function getThemeDefaultGroup(theme?:any){
    if(theme == "dark"){
        return App_url.icons.default_group;
    }else{
        return App_url.icons.default_group_light;
    }
}
export const gotoMainPageMessage = (message_info?:any, state?:any) => {
    const messageElement = document.getElementById("messageid" + message_info);
    const scrollContainer = document.querySelector("#chat-scroller-view"); // 'view' div from renderView
    console.log("messageElement scrollContainer", messageElement, scrollContainer)
    if (messageElement && scrollContainer) {
      const messageOffsetTop = messageElement.offsetTop;
      scrollContainer.scrollTop = messageOffsetTop - 50; // Adjust offset if needed
      if(!state){
        messageElement.classList.add("active_reply_message_pages");
        setTimeout(() => {
            messageElement.classList.remove("active_reply_message_pages");
        }, 1000);
      }
    }
  };
  

const Utils = {
    getCommonEnv: getCommonEnv,
    uuidv4:uuidv4,
    getCurrentURL:getCurrentURL,
    ValidateEmail:ValidateEmail,
    checkPasswordValidity:checkPasswordValidity,
    validateJWT: validateJWT,
    generateAuthToken: generateAuthToken,
    parseCookies: parseCookies,
    AuthenticateVerify: AuthenticateVerify,
    formatTime:formatTime,
    getThemeDefaultUser:getThemeDefaultUser,
    getThemeDefaultGroup:getThemeDefaultGroup,
    decode: CustomCipher.decode,
    encode: CustomCipher.encode,
    gotoMainPageMessage:gotoMainPageMessage
}
export default Utils;