const getCommonEnv = (env) =>{
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
export function getCurrentURL(context) {
    const { req } = context;

    const host = req?.headers?.host;
    const protocol = req?.headers['x-forwarded-proto'] || 'http';
    return `${protocol}://${host}`;
}
function checkEmail(emailAddress) {
    return String(emailAddress)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function ValidateEmail(value, error1, error2) {
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
const checkPasswordValidity = (value) => {
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


function base64UrlEncode(str) {
    return Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function generateAuthToken(data) {
    const header = {
        typ: 'JWT',
        alg: 'HS256'
    };

    const payloadData = {
        ...data,
        exp: Math.floor(Date.now() / 1000) + 43200 // 12 hours from now
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

// Example usage:
const data = {
    id: 1,
    email: 'example@example.com',
    access_type: 'admin'
};

// const token = generateAuthToken(data);
// console.log('Generated Token:', token);


function base64UrlDecode(base64Url) {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
      base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

function hashEquals(a, b) {
  if (a.length !== b.length) {
      return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function validateJWT(jwtToken) {
  const tokenParts = jwtToken.split('.');
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

// // Example usage:
// const token = 'your.jwt.token.here';
// const result = validateJWT(token);
// console.log('Verification Result:', result);


const Utils = {
    getCommonEnv: getCommonEnv,
    uuidv4:uuidv4,
    getCurrentURL:getCurrentURL,
    ValidateEmail:ValidateEmail,
    checkPasswordValidity:checkPasswordValidity,
    validateJWT: validateJWT,
    generateAuthToken: generateAuthToken,
}
export default Utils;