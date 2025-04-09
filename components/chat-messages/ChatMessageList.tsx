import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePosterReducers from '../context/usePosterReducers';
import Icon from '../common/Icon';
import App_url from '../common/constant';
import MessageItem from './MessageItem';
import { PaginationList } from '../channels/ChannelDetails';
import { setUpdatePaginationList } from '../../store/Actions';
import { useDispatch } from 'react-redux';

function ChatMessageList(props) {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const { MessageList, pagination } = usePosterReducers();
    const scrollRef = useRef<any>(null);
    const [previousHeight, setPreviousHeight] = useState(0);

    const scrollToBottom = () => {
        const el = scrollRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    };

    useEffect(() => {
        // Scroll to bottom when chat group changes
        setTimeout(() => {
            scrollToBottom();
        }, 100);
    }, [props?.chat_group_id]);

    const messageItemsList = useMemo(() => {
        const messageItem = MessageList?.[props?.chat_group_id];
        if (!messageItem?.length) return [];

        const groups = messageItem.reduce((groups, item, index, array) => {
            const date = item?.created_at?.split?.('T')[0];
            if (!groups[date]) groups[date] = [];

            const previousItem = array[index - 1];
            const hideAvatar =
                previousItem &&
                previousItem.sender_id === item.sender_id &&
                (new Date(item.created_at).getTime() - new Date(previousItem.created_at).getTime()) / 60000 <= 10
            groups[date].push({ ...item, hideAvatar });
            return groups;
        }, {});

        return Object.keys(groups).map(date => ({
            date,
            messagesList: groups[date],
        }));
    }, [MessageList?.[props?.chat_group_id], props?.chat_group_id]);

    const callLoadMessageGroup = () => {
        return messageItemsList?.map((item, index1) => (
            <div className='message-grouped' key={index1}>
                <div className='c-virtual_list__item'>
                    <span className='sticky-top date-message'>
                        {item?.date}
                        <Icon attrIcon={App_url.icons.Down} className='ms-1' size='xsm' />
                    </span>
                </div>
                <div className='messages_list'>
                    {item?.messagesList?.map((msg, index) => (
                        <div key={index} id={`messageid${msg?.id}`}>
                            <MessageItem {...msg} index={`${index}.${index1}`} />
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    const onScroll = async (e) =>{
        const MessagesAllList = MessageList?.[props?.group_id];
        const scrollTop = e?.target?.scrollTop
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

          if(scrollTop == 0 && loader !== true){
            setLoader(true);
            await props?.callGetMessages(MessagesAllList?.[0]?.updated_at);
            setLoader(false);
              const Data = PaginationList(MessagesAllList, 40, (pagination?.page_number||1)+1);
              if(Data?.length){
                  dispatch(setUpdatePaginationList(Data?.reverse()));
              }
          }
      }
    

    return (
        <div
            id="chat-scroller-view"
            ref={scrollRef}
            style={{ height: 'calc(100vh - 210px)', overflowY: 'auto' }}
            onScroll={onScroll}
        >
            <div className='message-wrapper'>{callLoadMessageGroup()}</div>
        </div>
    );
}

export default React.memo(ChatMessageList);
