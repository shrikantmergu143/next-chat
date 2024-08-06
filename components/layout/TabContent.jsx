import React, { useEffect, useState } from 'react'
import Scrollbar from '../common/Scrollbar'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ToolTip from '../common/PopOver'
import DropButton from '../common/DropButton'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../store/action'
import ChannelList from '../channels/ChannelList'
import { setShowModal } from '../../store/Actions'
import FriendsList from '../channels/FriendsList'

export default function TabContent(props) {
  const { access_token } = useSelector(App_url.allReducers);
  const [toggleChannel, setToggleChannel] = useState(false);
  const [toggleFriend, setToggleFriend] = useState(false);
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
      action.getFriendList(access_token, dispatch);
  }
  const onSelect = async (e) =>{
    if(e.key === "create_channels"){
      dispatch(setShowModal({
        show:"CREATE_CHANNEL"
      }))
    }
  }
  return (
    <div className='view_contents--sidebar'>
        <div className='channel_list'>
            <div className='sidebar_header '>
              <div className='sidebar_header__title'>
                <DropButton classNameText={"fs-17 fw-7"} title={"Community"} />
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
            <Scrollbar style={{height: "calc(100vh - 94px)"}} >
              <div className='channel_sidebar__static_list'>
                <div className='channel_sidebar__section_heading'>
                  <Icon
                    attrIcon={App_url.icons.DownDot}
                    size={"sm"}
                    className={`rotate-${toggleChannel?"-90":""}`}
                    button
                    variant={"hover-secondary-1"}
                    onClick={()=>setToggleChannel(!toggleChannel)}
                  />
                  <DropButton option={options} title={"Channels"} onSelect={onSelect} />
                </div>
              </div>
              {!toggleChannel && (
                <ChannelList/>
              )}
              <div className='channel_sidebar__static_list mt-4'>
                <div className='channel_sidebar__section_heading'>
                  <Icon
                    attrIcon={App_url.icons.DownDot}
                    size={`sm`}
                    button
                    className={`rotate-${toggleFriend?"-90":""}`}
                    variant={"hover-secondary-1"}
                    onClick={()=>setToggleFriend(!toggleFriend)}
                  />
                  <DropButton option={props?.optionsChannel} title={"Direct Message"} onSelect={props?.onSelect} />
                </div>
              </div>
              {!toggleFriend && (
                <FriendsList className={""}/>
              )}
            </Scrollbar>
        </div>
    </div>
  )
}
