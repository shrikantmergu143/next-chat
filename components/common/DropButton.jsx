import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Icon from './Icon'
import App_url from './constant'

export default function DropButton(props) {
  return (
    <Dropdown>
        <Dropdown.Toggle variant='hover-secondary-1'>
          <span className={`${props?.classNameText}`}>{props?.title}</span> <Icon className={'ms-1 xsm'} attrIcon={App_url.icons.Down} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item ></Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}
