/* eslint-disable */
import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import PropTypes from "prop-types"

export default function Scrollbar(props) {
    const renderTrack = ({ style, ...props }) => {
        const trackStyle = {
          display: "none"
        };
        return <div style={{ ...style, ...trackStyle }} {...props} />;
    };
    const renderThumb = ({ style, ...props }) => {
        return <div style={{ ...style }} className='custome_scroller' {...props} />;
    };
  return (
    <Scrollbars
        style={props?.style} 
        renderView={props => <div {...props} className="view"/>}
        renderTrackHorizontal={renderTrack}
        renderThumbVertical={renderThumb}
        className="ScrollbarsSidebar"
    >
        {props?.children}
    </Scrollbars>
  )
}
Scrollbar.propTypes = {
    style: PropTypes.any,
}
Scrollbar.defaultProps = {
    style:{},
}