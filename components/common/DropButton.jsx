import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Icon from './Icon';
import App_url from './constant';
import PropTypes from 'prop-types';

export default function DropButton(props) {
  // State to manage the visibility of the dropdown menu
  const [show, setShow] = useState(false);

  // Toggle function to handle dropdown menu visibility
  const handleToggle = (e) => {
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }
    setShow(!show);
  };

  return (
    <Dropdown className={`${props?.className}`} show={show} onToggle={handleToggle} placement={props?.placement}>
      <Dropdown.Toggle
        variant='hover-secondary-1'
        className={`${props?.buttonClassName}`}
        onClick={handleToggle}
      >
        {props?.children ? (
          <React.Fragment>
            {props?.children}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className={`${props?.classNameText} dropdown-span`}>{props?.title}</span>
            <Icon className={'ms-1 xsm'} attrIcon={App_url.icons.Down} />
          </React.Fragment>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu show={show} >
        {props?.option?.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => {
            props?.onSelect(item);
            setShow(false); // Hide the menu after selecting an option
          }}>
            {item?.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

DropButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  title: PropTypes.string,
  onSelect: PropTypes.func,
  option: PropTypes.array,
  placement: PropTypes.string,
};

DropButton.defaultProps = {
  className: "",
  buttonClassName: "",
  title: "",
  onSelect: () => {},
  option: [],
  placement: "auto",
};
