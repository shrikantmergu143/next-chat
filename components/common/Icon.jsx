/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Images from './Image'; // Import Image component directly
import LazyIcon from './LazyIcon';

export default function Icon(props) {
  
  const IconData = () =>{
    if(props?.image){
      return(
        <i onClick={props?.onClick} className={`common_icon_image radius-${props?.radius} ${props?.className} ${props?.size}` }>
          <Images src={props?.attrIcon} fill auth={props?.auth} />
        </i>
      )
    }
    return(
      <LazyIcon iconUrl={props?.attrIcon} onClick={props?.onClick} style={{...props?.style, '--icon-url':  `url(${props?.attrIcon})` }}  className={`common_icon radius-${props?.radius}  ${props?.size} ${props?.className}`} attr-icon={props?.attrIcon} />
    )
  }
  const ButtonView = ( ) =>{
    return(
      <Button disabled={props?.disabled} onClick={props?.onClick} className={`btn-icon radius-${props?.radius}  ${props?.buttonClassName}`} variant={props?.variant} size={props?.size}>
          {IconData()}
      </Button>
    )
  }
  if(props?.button){
    return(
        ButtonView()
    )
  }
  return (
    IconData()
  )
}

Icon.propTypes = {
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    auth: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    loading: PropTypes.any,
    button: PropTypes.bool,
    attrIcon: PropTypes.any,
}

Icon.defaultProps = {
    className: "",
    buttonClassName: "",
    size: "",
    variant: "",
    auth: false,
    rounded: false,
    disabled: false,
    loading: false,
    attrIcon: ""
}
