import React, { useMemo } from 'react'
import usePosterReducers from '../context/usePosterReducers'
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Utils from '../utils';

const MessageItem = (item) =>{

    const { channelDetails, currentUser, theme, savedPin, pinVerified } = usePosterReducers();
    const getUser = useMemo(()=>{
        if(item?.sender_id === currentUser?.id){
            return currentUser;
        }else{
            return channelDetails?.members_details?.find?.((item1)=>item1?.id == item?.sender_id);
        }
    },[item?.id]);
    const getMessage = useMemo(()=>{
        if(savedPin && pinVerified){
            return item?.message
        }
        return Utils.encode({message:item?.message}, process.env.TOKEN_KEY)
    },[item?.message, savedPin, pinVerified])
    const getUserInfo = useMemo(()=>{
        if(savedPin && pinVerified){
            return `${getUser?.first_name} ${getUser?.last_name}`
        }
        return Utils.encode({message:`${getUser?.first_name} ${getUser?.last_name}`}, process.env.TOKEN_KEY)
    },[getUser, savedPin, pinVerified])

    return(
        <div id={`messages-id-${item?.index}`} className='message-content message-kit '>
            <div className='c-message_kit__hover'>
                <div className='c-message_kit__gutter'>
                    <div className='c-message_kit__gutter__left'>
                       {!item?.hideAvatar ?  (
                        <Icon className="md rounded-2" image attrIcon={Utils.getThemeDefaultUser(theme)} />
                       ):(
                        <span className='offscreen fs-11 text-start fw-6'>{Utils?.formatTime?.(item?.created_at)?.replaceAll?.("PM", "")?.replaceAll?.("AM", "")}</span>
                       )}
                    </div>
                    <div className='c-message_kit__gutter__right'>
                        {!item?.hideAvatar && <span className='c-message__sender c-message_kit__sender'>
                            <span className='p-member_profile_hover_card'>
                                {getUserInfo}
                            </span>
                            <span className='offscreen'>{Utils.formatTime(item?.created_at)}</span>
                        </span>}
                        <div className='c-message_kit__blocks c-message_kit__blocks--rich_text'>
                            <div className='p-block_kit_renderer'>
                                <div className='p-rich_text_block'>
                                    <div dangerouslySetInnerHTML={{__html: getMessage}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MessageItem;