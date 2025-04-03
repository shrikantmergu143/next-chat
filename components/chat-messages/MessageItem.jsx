import React, { useMemo } from 'react';
import usePosterReducers from '../context/usePosterReducers';
import Icon from '../common/Icon';
import App_url from '../common/constant';
import Utils from '../utils';
import EmojiReplacer from './EmojiReplacer';
import emojiList from "./../emoji/emoji_new.json";
// Function to replace emojis with images or fallback to emoji text
const replaceEmojisWithComponents = (htmlString) => {
    if (!htmlString) return "";
  
    // Create a new DOMParser instance
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    // Recursively process nodes
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const newNodes = [];
  
        for (let char of text) {
          if (char.match(/\p{Emoji}/u)) {
            // Find the emoji in the JSON list
            const emojiEntry = emojiList.find((e) => e.emoji === char);
  
            if (emojiEntry) {
              const emojiCode = char.codePointAt(0).toString(16).toUpperCase();
              newNodes.push(<EmojiReplacer key={emojiCode} emojiCode={emojiCode} />);
            } else {
              // Fallback: If emoji is not in JSON, keep it as text
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

const MessageItem = (item) => {
    const { channelDetails, currentUser, theme, savedPin, pinVerified } = usePosterReducers();

    // Get user details
    const getUser = useMemo(() => {
        return item?.sender_id === currentUser?.id ? currentUser : 
            channelDetails?.members_details?.find?.((member) => member?.id == item?.sender_id);
    }, [item?._id]);

    // Get encoded/decoded message
    const getMessage = useMemo(() => {
        return savedPin && pinVerified ? item?.message : 
            Utils.encode({ message: item?.message }, process.env.TOKEN_KEY);
    }, [item?.message, savedPin, pinVerified]);

    // Convert HTML string to JSX while replacing emojis
    const processedMessage = useMemo(() => replaceEmojisWithComponents(getMessage), [getMessage]);

    // Get user info
    const getUserInfo = useMemo(() => {
        return savedPin && pinVerified ? `${getUser?.first_name} ${getUser?.last_name}` : 
            Utils.encode({ message: `${getUser?.first_name} ${getUser?.last_name}` }, process.env.TOKEN_KEY);
    }, [getUser, savedPin, pinVerified]);

    return (
        <div id={`messages-id-${item?.index}`} className='message-content message-kit '>
            <div className='c-message_kit__hover' id={`messageid${item?._id}`}>
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

export default MessageItem;