import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePosterReducers from '../context/usePosterReducers';
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Utils from '../utils';
import EmojiReplacer from './EmojiReplacer';
import emojiList from "../emoji/emoji_new.json";
import DropButton from '../common/DropButton';
import { useDispatch } from 'react-redux';
import { DeleteRequest } from '../api/DeleteRequest';
import { IMessageItem } from '../../store/type';
import { setStoreDeleteMessage } from '../../store/Actions';
import action from '../../store/action';
// Function to replace emojis with images or fallback to emoji text
const replaceEmojisWithComponents = (htmlString) => {
    if (!htmlString) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const newNodes = [];
        for (let char of text) {
          if (char.match(/\p{Emoji}/u)) {
            const emojiEntry = emojiList.find((e) => e.emoji === char);
            if (emojiEntry) {
              const emojiCode = char.codePointAt(0).toString(16).toUpperCase();
              newNodes.push(<EmojiReplacer key={emojiCode} emojiCode={emojiCode} />);
            } else {
              newNodes.push(<span key={char}>{char}</span>);
            }
          } else {
            newNodes.push(char);
          }
        }
        return newNodes;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        return React.createElement(
          node.tagName.toLowerCase(),
          {},
          ...Array.from(node.childNodes).map(processNode)
        );
      }
      return null;
    };
    return Array.from(doc.body.childNodes).map(processNode);
};
interface IMessageItemProps extends IMessageItem{
  setShowMenu?: Function;
  showMenu?: any;
}
const MessageItem = (item:IMessageItemProps) => {
  const dispatch = useDispatch();
  const messageRef = useRef(null);
  const hasMarkedRead = useRef(false); // to prevent duplicate calls
  const [isHovered, setIsHovered] = useState(false);
  const { channelDetails, currentUser, theme, savedPin, pinVerified, access_token } = usePosterReducers();
  const getUser = useMemo(() => {
      return item?.sender_id === currentUser?.id ? currentUser : 
          channelDetails?.members_details?.find?.((member) => member?.id == item?.sender_id);
  }, [item?._id]);
  const getMessage = useMemo(() => {
      return savedPin && pinVerified ? item?.message : 
          Utils.encode({ message: item?.message }, process.env.TOKEN_KEY);
  }, [item?.message, savedPin, pinVerified]);
  const processedMessage = useMemo(() => replaceEmojisWithComponents(getMessage), [getMessage]);
  const getUserInfo = useMemo(() => {
      return savedPin && pinVerified ? `${getUser?.first_name} ${getUser?.last_name}` : 
          Utils.encode({ message: `${getUser?.first_name} ${getUser?.last_name}` }, process.env.TOKEN_KEY);
  }, [getUser, savedPin, pinVerified]);

  const options = [
    {
      value:"edit",
      title:"Edit message",
    },
    {
      value:"delete",
      title:"Delete message...",
      variant:"danger"
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasMarkedRead.current && item?.sender_id !== currentUser?.id && !item?.messages_status[currentUser?.id]) {
          hasMarkedRead.current = true;
          try {
            await action.callReadMessage(item?._id, access_token, dispatch); // 👈 API to mark as read
            console.log(`Message ${item?._id} marked as read`);
          } catch (error) {
            console.error('Failed to mark message as read:', error);
          }
        }
      },
      { threshold: 0.5 } // visible when at least 50% of the message is in view
    );
  
    if (messageRef.current) {
      observer.observe(messageRef.current);
    }
  
    return () => {
      if (messageRef.current) observer.unobserve(messageRef.current);
    };
  }, [item?._id, currentUser?.id]);

  const onSelectMenu =async (event) =>{
    if(event?.value == "delete"){
      const response = await DeleteRequest(`${App_url.api.API_DELETE_MESSAGE}/${item?._id}`, null, access_token);
      if(response?.status == 200){
        dispatch(setStoreDeleteMessage({
          group_id: item?.group_id,
          message_id: item?._id,
        }))
      }else{

      }
      console.log("response", response);
    }
  }
  const onToggle = (event) =>{
    item?.setShowMenu?.(event?item?._id:"");
  }
  const renderMessageTool = () =>{
    if(!isHovered || (item?.showMenu && item?.showMenu != item?._id)) return;
    return (
      <div className={`message-tool ${item?.showMenu == item?._id?"menu-open":""}`}>
        <Icon button className="md rounded-2 green" variant='secondary-1' attrIcon={App_url.icons.Check} />
        {item?.sender_id == currentUser?.id && (
          <DropButton iconButton option={options} onClick={()=>item?.setShowMenu?.(item?._id)} onToggle={onToggle} onSelect={onSelectMenu} >
          <Icon className="md rounded-2" attrIcon={App_url.icons.Dot} />
        </DropButton>
        )}
      </div>
    )
  }
  const onMouseEnter = () => {
    setIsHovered(true)
  }
  const onMouseLeave = () => {
    if(item?.showMenu != item?._id){
      setIsHovered(false)
    }
  }
  return (
    <div id={`messages-id-${item?.index}`}   ref={messageRef} className={`message-content message-kit ${item?.showMenu == item?._id?"message-opened":"message-closed"} `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='c-message_kit__hover' id={`messageid_${item?._id}`}>
        {renderMessageTool()}
          <div className='c-message_kit__gutter'>
              <div className='c-message_kit__gutter__left'>
                  {!item?.hideAvatar ? (
                      <Icon className="md rounded-2" image attrIcon={Utils.getThemeDefaultUser(theme)} />
                  ) : (
                      <span className='offscreen fs-11 text-start fw-6 ms-auto'>
                          {Utils?.formatTime?.(item?.created_at)?.replaceAll?.("PM", "")?.replaceAll?.("AM", "")}
                      </span>
                  )}
              </div>
              <div className='c-message_kit__gutter__right'>
                  {!item?.hideAvatar && (
                      <span className='c-message__sender c-message_kit__sender'>
                          <span className='p-member_profile_hover_card'>{getUserInfo}</span>
                          <span className='offscreen'>{Utils.formatTime(item?.created_at)}</span>
                      </span>
                  )}
                  <div className='c-message_kit__blocks c-message_kit__blocks--rich_text'>
                      <div className='p-block_kit_renderer'>
                          <div className='p-rich_text_block'>{processedMessage}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);