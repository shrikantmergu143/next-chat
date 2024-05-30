import React from 'react'
import Scrollbar from '../common/Scrollbar'
import Icon from '../common/Icon'
import App_url from '../common/constant'

export default function TabContent() {
  return (
    <div className='view_contents--sidebar'>
        <div className='channel_list'>
            <div className='sidebar_header '>
              <Icon
                attrIcon={App_url.icons.PlusIcon}
                button
                size={"lg"}
                variant={"hover-secondary"}
              />
            </div>
            <Scrollbar style={{height: "calc(100vh - 100px)"}}>
                <div className='channel_sidebar__static_list'>
                </div>
            </Scrollbar>
        </div>
    </div>
  )
}
