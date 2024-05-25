/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import App_url from './constant';

export default function Images(props) {
  const { access_token,  } = useSelector(App_url.allReducers)
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    if(!props?.auth || window.location.hostname !== "localhost"){
      img.src = props.src;

      img.onload = () => {
        setImageSrc(img.src);
      };
    }else if(access_token && window.location.hostname == "localhost"){
      fetchData()
    }
    return () => {
      img.src = '';
    };
  }, [props.src]);

  const fetchData = async () => {
    try {
      const response = await fetchImageWithAuthorization(props.src);
      if(response?.status == 200){
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
          setImageSrc(url);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed, such as displaying an error message to the user
    }
  };

  const fetchImageWithAuthorization = async (url) => {
    const headers = new Headers();
    headers.append('Authorization', access_token);
    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
    return fetch(url, requestOptions);
  };

  return (
    <picture className={`picture-opacity-1 ${props?.imageClassName}`}>
      {imageSrc && <source type={props.type} srcSet={imageSrc} />}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={props.alt}
          loading="eager"
          className={props.className}
          width={props?.width}
          height={props?.height}
        />
      )}
    </picture>
  );
}

Images.propTypes = {
  type: PropTypes.any,
  src: PropTypes.any,
  alt: PropTypes.any,
  className: PropTypes.any,
  imageClassName: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  auth: PropTypes.bool,
};

Images.defaultProps = {
  type: 'image/webp',
  src: '',
  alt: '',
  className: '',
  imageClassName: '',
  width: 0,
  height: 0,
  auth: false,
};
