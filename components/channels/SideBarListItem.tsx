import React, { useMemo } from 'react'
import Button from '../common/Button';
import App_url from '../common/constant';
import Icon from '../common/Icon';
import {usePosterReducers} from "./../context/usePosterReducers";
import Utils from '../utils';
import action from '../../store/action';
import { useDispatch } from 'react-redux';

export default function SideBarListItem(item) {
    const {savedPin, pinVerified, theme, notificationList, access_token} = usePosterReducers();
    const dispatch = useDispatch();

    const onReadMessage = () =>{
        setTimeout(()=>{
            action?.getReadNotificationList(access_token, item?.id, dispatch);
        },400);
    }
    const getUserInfo = useMemo(()=>{
        if(savedPin && pinVerified){
            return item?.channel_name || item?.name
        }
        return Utils.encode({message:item?.channel_name || item?.name}, process.env.TOKEN_KEY)
    },[item?.name, savedPin, pinVerified]);

    const getNotificationCount = useMemo(()=>{
            return notificationList?.find?.((item1) => item1?.group_id == item?.id)
    },[item?.id, notificationList]);

    const FriendsItem = () =>{
        const isActive = `${App_url.link.ChatGroup}/${item?.id}` == `${window.location.pathname}`;
        return(
          <Button to={`${App_url.link.ChatGroup}/${item?.id}`} onClick={onReadMessage} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
            <div className="avatar_image">
              <Icon attrIcon={`${Utils.getThemeDefaultUser(theme)}`} image size={"ssm"} />
            </div>
            <span className='ellipsis'>{getUserInfo}</span>
            {getNotificationCount?.count > 0 && <span className='notification_count'>{getNotificationCount?.count}</span>}
          </Button>
        )
    }
    const renderBody = () =>{
        const isActive = `${App_url.link.ChatGroup}/${item?.id}` == `${window.location.pathname}`;
        return(
            <Button to={`${App_url.link.ChatGroup}/${item?.id}`} onClick={onReadMessage} variant={"hover-secondary-1"} className={`list-sidebar w-100 ${isActive?"active":""} mb-1`}>
                <div className="avatar_image">
                    <Icon attrIcon={`${item?.mode !== "private" ? App_url.icons.Hash: App_url.icons.Lock}`} size={"ssm"} />
                </div>
                <span className='ellipsis'>{getUserInfo}</span>
            {getNotificationCount > 0 && <span className='notification_count'>{getNotificationCount}</span>}
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