import React, { useMemo } from 'react'
import usePosterReducers from '../context/usePosterReducers'
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Utils from '../utils';

const MessageItem = (item) =>{

    const { channelDetails, currentUser } = usePosterReducers();
    const getUser = useMemo(()=>{
        if(item?.sender_id === currentUser?.id){
            return currentUser;
        }else{
            return channelDetails?.members_details?.find?.((item1)=>item1?.id == item?.sender_id);
        }
    },[item?.id]);

    return(
        <div id={`messages-id-${item?.index}`} className='message-content message-kit '>
            <div className='c-message_kit__hover'>
                <div className='c-message_kit__gutter'>
                    <div className='c-message_kit__gutter__left'>
                        <Icon className="md rounded-2" image attrIcon={App_url.icons.default_image} />
                    </div>
                    <div className='c-message_kit__gutter__right'>
                        <span className='c-message__sender c-message_kit__sender'>
                            <span className='p-member_profile_hover_card'>
                                {getUser?.first_name} {getUser?.last_name}
                            </span>
                            <span className='offscreen'>{Utils.formatTime(item?.created_at)}</span>
                        </span>
                        <div className='c-message_kit__blocks c-message_kit__blocks--rich_text'>
                            <div className='p-block_kit_renderer'>
                                <div className='p-rich_text_block'>
                                    <div dangerouslySetInnerHTML={{__html: item?.message}}></div>
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