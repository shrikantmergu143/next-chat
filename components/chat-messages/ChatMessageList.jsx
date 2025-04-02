import React, { useMemo } from 'react'
import usePosterReducers from '../context/usePosterReducers'
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Utils from '../utils';
import MessageItem from './MessageItem';

export default function ChatMessageList(props) {
    const { MessageList } = usePosterReducers();
    const messageItemsList = useMemo(() => {
        const messageItem = MessageList?.[props?.chat_group_id];
    
        if (!messageItem?.length) return [];
    
        const groups = messageItem.reduce((groups, item, index, array) => {
            const date = item?.created_at?.split?.('T')[0];
    
            if (!groups[date]) {
                groups[date] = [];
            }
    
            // Get the previous message
            const previousItem = array[index - 1];
    
            // Check if the previous message exists, has the same sender, and is within 10 minutes
            const hideAvatar =
                previousItem &&
                previousItem.sender_id === item.sender_id &&
                (new Date(item.created_at) - new Date(previousItem.created_at)) / 60000 <= 10; // Convert ms to minutes
    
            groups[date].push({ ...item, hideAvatar });
            return groups;
        }, {});
    
        return Object.keys(groups).map((date) => ({
            date,
            messagesList: groups[date],
        }));
    }, [MessageList?.[props?.chat_group_id], props?.chat_group_id]);
    

    const callLoadMessageGroup = () =>{
        return messageItemsList?.map?.((item, index1)=>(
            <React.Fragment key={index1}>
                <div className='message-grouped'>
                    <div className='c-virtual_list__item'>
                        <span className='sticky-top date-message'>{item?.date} <Icon attrIcon={App_url.icons.Down} className={"ms-1"} size="xsm" /></span>
                    </div>
                    <div className='messages_list'>
                        {item?.messagesList?.map?.((item, index)=>(
                            <React.Fragment key={index}>
                                <MessageItem  {...item} index={`${index}.${index1}`} />
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
