/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Images(props) {
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
