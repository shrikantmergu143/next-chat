/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactButton from "react-bootstrap/Button";
import { useRouter } from 'next/router';
type IButton = {
  variant?: any;
  className?: any;
  type?: any;
  onClick?: any;
  size?: any;
  disabled?: any;
}


export default function IButton(props) {
  const [loader, setLoader] = useState(false);
  const navigate = useRouter();
  const onClick = async (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (props?.to) {
      setLoader(true);
      await props?.onClick?.(e);
      setLoader(false);
      navigate?.push?.(props?.to); // Replace router.push with window.location.href
    } else {
      setLoader(true);
      await props?.onClick?.(e);
      setLoader(false);
    }
  }

  return (
    <ReactButton onClick={onClick} disabled={props?.disabled} type={props?.type} variant={props?.variant} className={`btn button ${props?.className} btn-${props?.size}`}>
      {props?.children}
    </ReactButton>
  )
}