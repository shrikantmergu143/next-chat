import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Icon from './Icon'
import App_url from './constant'
import PropTypes from "prop-types"
export default function DropButton(props) {
  return (
    <Dropdown className={`${props?.className}`}>
        <Dropdown.Toggle variant='hover-secondary-1'>
          <span className={`${props?.classNameText}`}>{props?.title}</span> <Icon className={'ms-1 xsm'} attrIcon={App_url.icons.Down} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props?.option?.map((item, index)=>(
            <Dropdown.Item key={index} onClick={()=>props?.onSelect(item)}>{item?.title}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
    </Dropdown>
  )
}

DropButton.propTypes = {
  className: PropTypes.any,
  title: PropTypes.any,
  onSelect: PropTypes.func,
  option: PropTypes.array,
}

DropButton.defaultProps = {
  className: "",
  title: "",
  onSelect: ()=>{},
  option: [],
}
