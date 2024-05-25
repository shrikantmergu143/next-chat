/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Images from './Image'; // Import Image component directly

export default function Icon(props) {
  
  const IconData = () =>{
    if(props?.image){
      return(
        <i onClick={props?.onClick} className={`common_icon_image ${props?.className}` }>
          <Images src={props?.attrIcon} fill auth={props?.auth} />
        </i>
      )
    }
    return(
      <i onClick={props?.onClick} style={{...props?.style, '--icon-url':`url(${props?.attrIcon})`}}  className={`common_icon ${props?.className}`} attr-icon={props?.attrIcon} />
    )
  }
  const ButtonView = ( ) =>{
    return(
      <Button disabled={props?.disabled} onClick={props?.onClick} className={`btn-icon ${props?.buttonClassName}`} variant={props?.variant} size={props?.size}>
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
