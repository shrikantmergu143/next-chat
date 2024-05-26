import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Body>
  </Popover>
);

const PopOver = (props) => {
    return(
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
         <React.Fragment>
            {props?.children}
         </React.Fragment>
        </OverlayTrigger>
    )
}
export default PopOver;