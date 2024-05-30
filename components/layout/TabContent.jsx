import React from 'react'
import Scrollbar from '../common/Scrollbar'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ToolTip from '../common/PopOver'
import DropButton from '../common/DropButton'

export default function TabContent() {
  return (
    <div className='view_contents--sidebar'>
        <div className='channel_list'>
            <div className='sidebar_header '>
              <div className='sidebar_header__title'>
                <DropButton/>
              </div>
              <div className='sidebar_header__controls'>
                <ToolTip title={"Filter Conversations"}>
                  <Icon
                    attrIcon={App_url.icons.Filter}
                    button
                    size={"lg"}
                    variant={"hover-secondary-1"}
                  />
                </ToolTip>
                <ToolTip title={"New Message"}>
                  <Icon
                    attrIcon={App_url.icons.Edit}
                    button
                    size={"lg"}
                    variant={"hover-secondary-1"}
                  />
                </ToolTip>
              </div>
            </div>
            <Scrollbar style={{height: "calc(100vh - 100px)"}}>
              <div className='channel_sidebar__static_list'>
              </div>
            </Scrollbar>
        </div>
    </div>
  )
}
