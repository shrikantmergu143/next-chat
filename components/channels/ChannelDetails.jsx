import React from 'react'
import { Dropdown } from 'react-bootstrap'

export default function ChannelDetails(props) {
  return (
    <div>
        <div className='p-view_header'>
            <Dropdown children={props?.channelDetails?.channel_name} />
        </div>
    </div>
  )
}
