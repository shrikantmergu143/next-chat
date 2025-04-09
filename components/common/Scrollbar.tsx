/* eslint-disable */
import React, { forwardRef } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import PropTypes from "prop-types"
type IScrollBar = {
    style?: any;
    onScroll?: any;
    children?: any;
}
const Scrollbar = forwardRef((props:IScrollBar, ref:any) => {
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

export default React.memo(Scrollbar);
