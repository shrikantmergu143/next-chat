import React from 'react'
import Scrollbar from '../common/Scrollbar'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ToolTip from '../common/PopOver'
import DropButton from '../common/DropButton'
import Button from '../common/Button'

export default function TabContent() {
  return (
    <div className='view_contents--sidebar'>
        <div className='channel_list'>
            <div className='sidebar_header '>
              <div className='sidebar_header__title'>
                <DropButton classNameText={"fs-17 fw-7"} title={"Appristine Technologies"} />
              </div>
              <div className='sidebar_header__controls'>
                <ToolTip title={"Filter Conversations"}>
                  <Icon
                    attrIcon={App_url.icons.FilterIcon}
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
                <div className='channel_sidebar__section_heading'>
                  <Icon
                    attrIcon={App_url.icons.DownDot}
                    size={"sm"}
                    button
                    variant={"hover-secondary-1"}
                  />
                  <DropButton  title={"Channels"} />
                </div>
              </div>
              <div className='channel_sidebar__static_list'>
                <Button variant={"hover-secondary-1"} className={"w-100"}>
                  <Icon
                    attrIcon={App_url.icons.Lock}
                    size={"sm"}
                  />
                  <span>
                    Channel
                  </span>
                </Button>
              </div>
              {[1,]?.map((item, index)=>(
                 <div className='channel_sidebar__static_list'>
                  <Button variant={"hover-secondary-1"} className={"w-100"}>
                    <Icon
                      attrIcon={"https://ca.slack-edge.com/T3CJNAPC1-U05EV3R7C4F-96707c818001-24"}
                      size={"sm"}
                      image
                      radius={1}
                    />
                    <span>
                      Channel
                    </span>
                  </Button>
                </div>
              ))}
            </Scrollbar>
        </div>
    </div>
  )
}
