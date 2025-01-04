import React from 'react'
import Button from '../common/Button';
import App_url from '../common/constant';
import Icon from '../common/Icon';

export default function SideBarListItem(item) {
    const FriendsItem = () =>{
        const isActive = `${App_url.link.Friend}/${item?.friend_id}` == `${window.location.pathname}`;
        return(
          <Button to={`${App_url.link.Friend}/${item?.friend_id}`} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
            <div className="avatar_image">
              <Icon attrIcon={`${item?.mode !== "private" ? App_url.icons.Hash: App_url.icons.Lock}`} size={"ssm"} />
            </div>
            <span className='ellipsis'>{item?.email_to}</span>
          </Button>
        )
    }
    const renderBody = () =>{
        const isActive = `${App_url.link.Channel}/${item?.channel_id}` == `${window.location.pathname}`;
        return(
            <Button to={`${App_url.link.Channel}/${item?.channel_id}`} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
                <div className="avatar_image">
                    <Icon attrIcon={`${item?.mode !== "private" ? App_url.icons.Hash: App_url.icons.Lock}`} size={"ssm"} />
                </div>
                <span className='ellipsis'>{item?.channel_name || item?.name}</span>
            </Button>
        )
    }
    if(item?.friend_id){
        return (
            FriendsItem()
        )
    }
    return(
        renderBody()
    )
}