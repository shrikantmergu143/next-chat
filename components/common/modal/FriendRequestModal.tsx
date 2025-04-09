import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import App_url from '../constant';
import Utils from '../../utils';
import Icon from '../Icon';
import Button from '../Button';
import usePosterReducers from '../../context/usePosterReducers';

function FriendRequestModal(props) {
    const {theme} = usePosterReducers();
    const {chatGroupDetails} = props;
    const getLinkAvatar:any = useMemo<any>(() => {
        if (chatGroupDetails?.group_type === "direct") {
          return chatGroupDetails?.profile_url
            ? { url: chatGroupDetails?.profile_url, image: true }
            : { url: Utils.getThemeDefaultUser(theme), image: true };
        } else {
          return chatGroupDetails?.mode == "public"
            ? { url: App_url.icons.Hash }
            : { url: App_url.icons.Lock };
        }
    }, [chatGroupDetails?.group_type]);
    
  return (
   <div className="modal-invites-content">
        <div className="modal-invites radius-6">
        <div className="invites-body">
            <div className="invites-profile  text-center pb-3">
            <Icon
                attrIcon={getLinkAvatar?.url}
                image={getLinkAvatar?.image}
                height={"120px"}
                width={"120px"}
            />
            </div>
            <div className="invites-message text-center">
            <h4 className="text-capitalize">
                {chatGroupDetails?.channel_name ||chatGroupDetails?.name}
            </h4>
            <p>Send you a friend request</p>
            </div>
            <div className="invites-footer">
                <Button variant={"danger"} size={"lg"} className="w-100" onClick={()=>props?.onStatusChange?.("rejected")} >Reject</Button>
                <Button variant={"green"} size={"lg"} className="w-100" onClick={()=>props?.onStatusChange?.("accepted")} >Accept</Button>
            </div>
        </div>
        </div>
    </div>
  )
}

FriendRequestModal.propTypes = {
    chatGroupDetails: PropTypes.any.isRequired,
    onStatusChange: PropTypes.func.isRequired,
}

export default FriendRequestModal

