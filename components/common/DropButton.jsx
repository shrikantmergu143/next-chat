import React from 'react'
import { Dropdown } from 'react-bootstrap'
import Icon from './Icon'
import App_url from './constant'

export default function DropButton() {
  return (
    <Dropdown>
        <Dropdown.Toggle variant='hover-secondary-1'>
        <span className='fs-17 fw-7'>Appristine Technologies</span> <Icon className={'ms-1 xsm'} attrIcon={App_url.icons.Down} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}
