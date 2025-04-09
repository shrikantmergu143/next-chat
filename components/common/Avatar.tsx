import React from 'react'
import PropTypes from "prop-types"
import Images from './Image'

export default function Avatar(props) {
  return (
    <div className={`avatar avatar-${props?.size}`}>
      <Images
        src={props?.src}
        alt={props?.alt}
      />
    </div>
  )
}

Avatar.propTypes = {
    variant: PropTypes.any,
    className: PropTypes.any,
    src: PropTypes.any,
    onClick: PropTypes.func,
    size: PropTypes.any,
}

Avatar.defaultProps = {
    variant: "",
    className: "",
    src: "",
    size: "",
    onClick: () => { },
}
