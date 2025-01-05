import React from 'react'
import Button from '../common/Button';
import App_url from '../common/constant';
import Icon from '../common/Icon';
import {usePosterReducers} from "./../context/usePosterReducers";

export default function SideBarListItem(item) {
    const {currentUser} = usePosterReducers
    const FriendsItem = () =>{
        const isActive = `${App_url.link.ChatGroup}/${item?.id}` == `${window.location.pathname}`;
        const getEmailId = item?.users?.find?.((item)=>item!=currentUser?.email)
        return(
          <Button to={`${App_url.link.ChatGroup}/${item?.id}`} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
            <div className="avatar_image">
              <Icon attrIcon={`${App_url.icons.default_image}`} image size={"ssm"} />
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