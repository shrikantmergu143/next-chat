import React, { useMemo } from 'react'
import usePosterReducers from '../context/usePosterReducers'
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Images from '../common/Image';
import Utils from '../utils';

export default function ChatMessageList(props) {
    const {MessageList, channelDetails} = usePosterReducers();
    const messageItemsList = useMemo(()=>{
        // this gives an object with dates as keys
        const messageItem = MessageList?.[props?.chat_group_id];
        const groups = messageItem?.reduce?.((groups, item) => {
            const date = item?.created_at?.split?.('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
                groups[date].push(item);
            return groups;
        }, {});
        
        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                messagesList: groups[date]
            };
        });

        return groupArrays;
        
    },[MessageList?.[props?.chat_group_id]?.length, props?.chat_group_id]);
    console.log("MessageList", messageItemsList);

    const MessageItemLoad = (item) =>{
        const getUser = channelDetails?.members_details?.find?.((item1)=>item1?.sender_id == item?.id);
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
                                    <div className='p-rich_text_block'>{item?.message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const callLoadMessageGroup = () =>{
        return messageItemsList?.map?.((item, index)=>(
            <React.Fragment key={index}>
                <div className='message-grouped'>
                    <div className='c-virtual_list__item'>
                        <span className='sticky-top date-message'>{item?.date} <Icon attrIcon={App_url.icons.Down} className={"ms-1"} size="xsm" /></span>
                    </div>
                    <div className='messages_list'>
                        {item?.messagesList?.map?.((item, index)=>(
                            <React.Fragment key={index}>
                                {MessageItemLoad({...item, index: index})}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        ))
    }
  return (
    <div className='message-wrapper'>
        {callLoadMessageGroup()}
    </div>
  )
}
