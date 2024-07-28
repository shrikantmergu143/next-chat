import React, { useEffect, useRef, useState } from 'react'
import DropButton from '../common/DropButton'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ToolTip from '../common/PopOver'
import Scrollbar from '../common/Scrollbar'
import TextEditor from './TextEditor'

export default function ChannelDetails(props) {
  return (
    <React.Fragment>
      <div className='p-view_header'>
          <DropButton title={
            <ToolTip title={"Get channel details"}>
              <div className='d-flex-center'>
                <Icon attrIcon={props?.channelDetails?.mode == "public" ? App_url.icons.Hash:App_url.icons.Lock} />
                <span>{props?.channelDetails?.channel_name}</span>
              </div>
            </ToolTip>
          } />
      </div>
      <div className='p-view-body'>
        <Scrollbar style={{height:`calc(100vh - 204px)`}} >

        </Scrollbar>
      </div>
        <TextEditor/>
    </React.Fragment>
  )
}
