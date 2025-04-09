import React, { useMemo, useState } from 'react'
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Tooltip as ReactToolTip } from 'react-bootstrap';
import PropTypes from "prop-types";
import Utils from '../utils';

export default function ToolTip(props) {
  const UUID = useMemo(()=>Utils.uuidv4(), [props?.title]);
  const [state, setState] = useState(false);
    const { children } = props;
    const RenderTooltip = (item) => {
      if( props?.header){
        return (
          <Popover id={UUID} {...item} >
            <PopoverHeader>
              {props?.header}
            </PopoverHeader>
            <PopoverBody>
              {props?.title}
            </PopoverBody>
        </Popover>
        );
      }
      return(
        <ReactToolTip id={UUID} {...item}>
          {props?.title}
        </ReactToolTip>
      );
    };

    return (
    <OverlayTrigger
      placement={props?.placement}
      delay={{ show: 100, hide: 100 }}
      trigger={props?.trigger}
      overlay={RenderTooltip}
      onToggle={setState}
      show={state}
    >
      <div className='d-content'>
        {children}
        {state && (
          <div className='back-drop' onClick={()=>setState(false)}></div>
        )}
      </div>
    </OverlayTrigger>
  );
};
ToolTip.propTypes = {
    children: PropTypes.any,
    trigger: PropTypes.any,
    title: PropTypes.any,
    placement: PropTypes.any
};
ToolTip.defaultProps = {
    children: "",
    trigger: ['hover', 'focus'],
    title: "",
    placement:"bottom"
};