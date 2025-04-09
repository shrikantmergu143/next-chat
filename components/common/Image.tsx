/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
type IImages = {
  type?: any;
  src?: any;
  alt?: any;
  className?: any;
  imageClassName?: any;
  width?: any;
  height?: any;
  auth?: Boolean;
  fill?: Boolean;
};
export default function Images(props: IImages) {
  // const { access_token,  } = useSelector(App_url.allReducers)
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    if(props.src){
      img.src = props.src;

      img.onload = () => {
        setImageSrc(img.src);
      };
    }
    return () => {
      img.src = '';
    };
  }, [props.src]);


  const loadImage = () =>{
    return(
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
    )
  }
  return loadImage();
}

