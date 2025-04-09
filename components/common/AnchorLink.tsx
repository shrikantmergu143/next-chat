/* eslint-disable */
import React from 'react';
import PropTypes from "prop-types";
import Link from 'next/link';

export default function AnchorLink(props) {
    const currentPath = window.location.pathname;

    let To = props?.to ? props?.to : "";

    if (props?.slash) {
        To = `${To}/`
    }

    const onClick = (e) => {
        if (props?.onClick && !props?.to) {
            e.preventDefault();
            props?.onClick?.(e)
        }
    }

    const isActive = To === currentPath; // Check if the link is active

    const Prop:any = {};
    if (props?.target) {
        Prop.as = "a";
        return (
            <a href={To} style={props?.style} {...Prop} target={props?.target === true ? "_self" : "_blank"} id={props?.id} onClick={onClick} title={props?.title} className={`${props?.className} ${isActive ? 'active-link' : ''}`}>
                {props?.children}
            </a>
        )
    }

    return (
        <Link href={To} style={props?.style} {...Prop} target={props?.target} id={props?.id} onClick={onClick} title={props?.title} className={`${props?.className} ${isActive ? 'active-link' : ''}`}>
            {props?.children}
        </Link>
    )
}

AnchorLink.propTypes = {
    className: PropTypes.any,
    to: PropTypes.any,
    target: PropTypes.any,
    id: PropTypes.any,
    onClick: PropTypes.any,
    style: PropTypes.any,
    slash: PropTypes.any,
    name: PropTypes.any,
    default: PropTypes.bool
}

AnchorLink.defaultProps = {
    className: "",
    to: "",
    target: "",
    id: "",
    default: false,
    slash: false,
    style: {},
    name: ""
}
