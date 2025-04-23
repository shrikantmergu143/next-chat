/* eslint-disable */
import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Images from './Image'; // Import Image component directly
import LazyIcon from './LazyIcon';
import ToolTip from './PopOver';

type IIcon = {
  image?: any;
  radius?: any;
  style?: CSSProperties;
  className?: string;
  buttonClassName?: string;
  size?: string;
  variant?: string;
  title?: any;
  auth?: Boolean;
  rounded?: Boolean;
  disabled?: Boolean;
  onClick?: any;
  loading?: any;
  button?: Boolean;
  attrIcon?: any;
  height?: any;
  width?: any;
}

export default function Icon(props: IIcon) {
  const styles = {};
  if (props?.height) {
    styles[`--height`] = props?.height;
  }
  if (props?.width) {
    styles[`--width`] = props?.width;
  }
  const IconData = () => {
    if (props?.image) {
      return (
        <i onClick={props?.onClick} style={{ ...props?.style, ...styles, }} className={`common_icon_image radius-${props?.radius} ${props?.className} ${props?.size}`}>
          <Images src={props?.attrIcon} fill auth={props?.auth} />
        </i>
      )
    }
    return (
      <LazyIcon iconUrl={props?.attrIcon} onClick={props?.onClick} style={{ ...props?.style, ...styles, '--icon-url': `url(${props?.attrIcon})` }} className={`common_icon radius-${props?.radius}  ${props?.size} ${props?.className}`} attr-icon={props?.attrIcon} />
    )
  }
  const ButtonView = () => {
    return (
      <Button disabled={props?.disabled} onClick={props?.onClick} className={`btn-icon radius-${props?.radius}  ${props?.buttonClassName}`} variant={props?.variant} size={props?.size}>
        {IconData()}
      </Button>
    )
  }
  if (props?.button) {
    return (
      ButtonView()
    )
  }
  if (props?.title) {
    return (
      <ToolTip title={props?.title}>
        {IconData()}
    </ToolTip>
    )
  }
  return (
    IconData()
  )
}
