import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Icon from './Icon';
import App_url from './constant';
import PropTypes from 'prop-types';
import Images from './Image';
import { DropDirection } from 'react-bootstrap/esm/DropdownContext';
type IDropButton = {
  className?: string;
  buttonClassName?: string;
  width?: number;
  onSelect?: Function;
  onClick?: Function;
  onToggle?: Function;
  option?: any[];
  placement?: DropDirection;
  classNameText?: string;
  show_down?: Boolean;
  iconButton?: Boolean;
  children?: any;
  title?: any;
};
export default function DropButton(props:IDropButton) {
  // State to manage the visibility of the dropdown menu
  const [show, setShow] = useState(false);

  // Toggle function to handle dropdown menu visibility
  const handleToggle = (e) => {
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }
    props?.onToggle?.(!show)
    setShow(!show);
  };
  const onClick = (e) =>{
    handleToggle(e);
    props?.onClick?.(e);
  }
  const styles = {}

  if(props?.width){
    styles['--width'] = `${props?.width}px`
  }
  const renderView = (item) =>{
    return(
      <React.Fragment>
         {item?.profile_url && (
            <span className='avatar'>
              <Images src={item?.profile_url} height={30} width={30} className='profile_url' />
            </span>
          )}
          <div className={`title-drop ${!item?.profile_url?"plan-text":""}`}>
            {item?.title && <span className='d-flex title'>{item?.title}</span>}
            {item?.subtitle && <span className='d-flex subtitle fs-14 fw-600'>{item?.subtitle}</span>}
          </div>
      </React.Fragment>
    )
  }
  const renderItem = (item, index)=>{
    const {button = true} = item;
    if(item?.divider){
      return <Dropdown.Divider/>
    }
    if(button){
      return(
        <Dropdown.Item className={`dropdown-item variant-${item?.variant}`}  key={index} onClick={() => {
          props?.onSelect?.(item);
          setShow(false); // Hide the menu after selecting an option
        }}>
         {renderView(item)}
        </Dropdown.Item>
      )
    }
    return(
      <Dropdown.ItemText className={`dropdown-item button variant-${item?.variant}`}  key={index} >
       {renderView(item)}
      </Dropdown.ItemText>
    )
  }
  return (
    <Dropdown className={`dropdown ${props?.className}`} style={{}} show={show} onToggle={handleToggle} drop={props?.placement}>
      <Dropdown.Toggle
        variant='hover-secondary-1'
        className={`${props?.buttonClassName} ${props?.iconButton?"btn-icons":""}`}
        onClick={onClick}
      >
        {props?.children ? (
          <React.Fragment>
            {props?.children}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className={`${props?.classNameText} dropdown-span`}>{props?.title}</span>
            {props?.show_down && <Icon className={'ms-1 xsm'} attrIcon={App_url.icons.Down} />}
          </React.Fragment>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu show={show} style={{...styles}}>
        {props?.option?.map?.((item, index) => (
          renderItem(item, index)
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
