import React from 'react'
import Button from '../common/Button';
import App_url from '../common/constant';
import Icon from '../common/Icon';
import {usePosterReducers} from "./../context/usePosterReducers";
import Utils from '../utils';

export default function SideBarListItem(item) {
    const {currentUser, theme} = usePosterReducers
    const FriendsItem = () =>{
        const isActive = `${App_url.link.ChatGroup}/${item?.id}` == `${window.location.pathname}`;
        const getEmailId = item?.users?.find?.((item)=>item!=currentUser?.email)
        return(
          <Button to={`${App_url.link.ChatGroup}/${item?.id}`} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
            <div className="avatar_image">
              <Icon attrIcon={`${Utils.getThemeDefaultUser(theme)}`} image size={"ssm"} />
            </div>
            <span className='ellipsis'>{item?.name}</span>
          </Button>
        )
    }
    const renderBody = () =>{
        const isActive = `${App_url.link.ChatGroup}/${item?.id}` == `${window.location.pathname}`;
        return(
            <Button to={`${App_url.link.ChatGroup}/${item?.id}`} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
                <div className="avatar_image">
                    <Icon attrIcon={`${item?.mode !== "private" ? App_url.icons.Hash: App_url.icons.Lock}`} size={"ssm"} />
                </div>
                <span className='ellipsis'>{item?.channel_name || item?.name}</span>
            </Button>
        )
    }
    if(item?.group_type === "direct"){
        return (
            FriendsItem()
        )
    }
    return(
        renderBody()
    )
}