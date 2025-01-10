import React, { useMemo } from 'react'
import usePosterReducers from '../context/usePosterReducers'
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Utils from '../utils';
import MessageItem from './MessageItem';

export default function ChatMessageList(props) {
    const { MessageList } = usePosterReducers();
    const messageItemsList = useMemo(()=>{
        const messageItem = MessageList?.[props?.chat_group_id];
        if(messageItem?.length){
            const groups = messageItem?.reduce?.((groups, item) => {
                const date = item?.created_at?.split?.('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                    groups[date]?.push?.(item);
                return groups;
            }, {});
            const groupArrays = Object?.keys?.(groups)?.map?.((date) => {
                return {
                    date,
                    messagesList: groups?.[date]
                };
            });
            if(groupArrays?.length>0){
                return groupArrays;
            }else{
                return [];
            }
        }else{
            return [];
        }
    },[MessageList?.[props?.chat_group_id]?.length, props?.chat_group_id]);

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
                                <MessageItem  {...item} index={index} />
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
