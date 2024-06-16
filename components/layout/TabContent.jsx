import React, { useEffect } from 'react'
import Scrollbar from '../common/Scrollbar'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ToolTip from '../common/PopOver'
import DropButton from '../common/DropButton'
import Button from '../common/Button'
import { PostRequestAPI } from '../api/PostRequest'
import { useDispatch, useSelector } from 'react-redux'
import { GetRequestCallAPI } from '../api/GetRequest'
import action from '../../store/action'
import ChannelList from '../channels/ChannelList'

export default function TabContent() {
  const {access_token, channelsList} = useSelector(App_url.allReducers);
  const dispatch = useDispatch();
  const options = [
    {
      title:"Create Channels",
      key:"create_channels"
    },
    {
      title:"Manage",
      key:"manage_channels"
    }
  ];
  useEffect(()=>{
    callGetChannelList();
  },[])
  const callGetChannelList = async (e) =>{
      action.getChannelsList(access_token, dispatch);
  }
  const onSelect = async (e) =>{
    if(e.key === "create_channels"){
      const response = await PostRequestAPI(App_url.api.API_CHANNELS, {channel_name:"channelsList"}, access_token);
      if(response?.status === 200){
        callGetChannelList();
      }else{

      }
    }
  }
  console.log("channelsList", channelsList)
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
                  <DropButton option={options} title={"Channels"} onSelect={onSelect} />
                </div>
              </div>
              <ChannelList/>
            </Scrollbar>
        </div>
    </div>
  )
}
