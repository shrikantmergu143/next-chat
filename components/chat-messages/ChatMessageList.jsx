import React, { useEffect, useMemo, useRef, useState } from 'react'
import usePosterReducers from '../context/usePosterReducers'
import Icon from '../common/Icon';
import App_url from '../common/constant';
import MessageItem from './MessageItem';
import Scrollbar from '../common/Scrollbar';
import { PaginationList } from '../channels/ChannelDetails';
import { setUpdatePaginationList } from '../../store/Actions';
import { useDispatch } from 'react-redux';

function ChatMessageList(props) {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const { MessageList, pagination } = usePosterReducers();
    const scrollRef = useRef();
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollToBottom();
        }
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when component mounts
    }, [props?.chat_group_id]);


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
      const onScroll = (e) =>{
        const MessagesAllList = MessageList?.[props?.group_id];
        const scrollTop = e?.scrollTop
          const scrollHeight = e?.scrollHeight;
          let min_height = 290;
          if(screen.height>1000){
              min_height = 522;
          }else if(screen.height>960){
              min_height = 500;
          }else if(screen.height>840){
              min_height = 420;
          }else if(screen.height>750){
              min_height = 290;
          }
          const maxScrollTop = scrollHeight - scrollTop - min_height;
          if(scrollTop === 0 && loader !== true){
            props?.callGetMessages();
              const Data = PaginationList(MessagesAllList, 40, (pagination?.page_number||1)+1);
              if(Data?.length){
                  setLoader(true);
                  dispatch(setUpdatePaginationList(Data?.reverse()));
                  setTimeout(()=>setLoader(false), 2000)
              }
          }
      }
  return (
    <Scrollbar ref={scrollRef} style={{ height: `calc(100vh - 210px)` }} onScroll={onScroll}>
        <div className='message-wrapper'>
            {callLoadMessageGroup()}
        </div>
    </Scrollbar>
  )
}
export default React.memo(ChatMessageList)