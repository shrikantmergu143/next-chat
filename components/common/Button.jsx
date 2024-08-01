/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactButton from "react-bootstrap/Button";
import { useRouter } from 'next/router';

export default function Button(props) {
  const [loader, setLoader] = useState(false);
  const navigate = useRouter();
  const onClick = async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (props?.to) {
      navigate.push(props?.to); // Replace router.push with window.location.href
    } else {
      setLoader(true);
      await props?.onClick(e);
      setLoader(false);
    }
  }

  return (
    <ReactButton onClick={onClick} disabled={props?.disabled} type={props?.type} variant={props?.variant} className={`btn button ${props?.className} btn-${props?.size}`}>
      {props?.children}
    </ReactButton>
  )
}

Button.propTypes = {
  variant: PropTypes.any,
  className: PropTypes.any,
  type: PropTypes.any,
  onClick: PropTypes.func,
  size: PropTypes.any,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  variant: "",
  className: "",
  size: "",
  onClick: () => { },
  type: "button",
}
