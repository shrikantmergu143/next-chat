/* eslint-disable */
import React, { forwardRef } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import PropTypes from "prop-types"

const Scrollbar = forwardRef((props, ref) => {
    const renderTrack = ({ style, ...trackProps }) => {
        const trackStyle = {
            display: "none"
        };
        return <div style={{ ...style, ...trackStyle }} {...trackProps} />;
    };

    const renderThumb = ({ style, ...thumbProps }) => {
        return <div style={{ ...style }} className='custome_scroller' {...thumbProps} />;
    };

    return (
        <Scrollbars
            style={props?.style}
            renderView={viewProps => <div {...viewProps} className="view" />}
            renderTrackHorizontal={renderTrack}
            renderThumbVertical={renderThumb}
            className="ScrollbarsSidebar"
            ref={ref}
            onScrollFrame={props?.onScroll}
        >
            {props?.children}
        </Scrollbars>
    );
});

Scrollbar.propTypes = {
    style: PropTypes.any,
    onScroll: PropTypes.func,
    children: PropTypes.node,
};

Scrollbar.defaultProps = {
    style: {},
};

export default React.memo(Scrollbar);
