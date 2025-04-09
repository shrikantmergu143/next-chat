import React from 'react';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import App_url from '../constant';
import EmojiPicker from '../../emoji/EmojiPicker';

export default function MessageEditor({ field, html = '', classes, onChange, placeholder, onSend }:any) {
    // Function to handle inserting emojis into the textarea at the cursor position
    const handleInsertEmoji = (emojiData) => {
        const emoji = emojiData.emoji || emojiData.image; // Select emoji
        const textArea:any = document.getElementsByName(field)[0]; // Get the textarea element

        if (!textArea) return; // Prevent errors if the element is not found

        const cursorPosition = textArea.selectionStart; // Get the cursor position
        const updatedText = html?.slice?.(0, cursorPosition) + emoji + html?.slice?.(cursorPosition); // Insert emoji

        // Update the state with the new text
        onChange({ target: { name: field, value: updatedText } });

        // Move the cursor after the inserted emoji
        setTimeout(() => {
            textArea.selectionStart = textArea.selectionEnd = cursorPosition + emoji.length;
            textArea.focus(); // Ensure the textarea remains focused
        }, 0);
    };

    const onChangeHandler = (e) => {
        onChange(e);
        
        // Handle Enter key press to send message
        if (e?.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault(); // Prevent default Enter behavior
            onSend({ target: { name: field, value: e?.target?.value } }); // Send the message
        }
    };

    const onSendMessage = () => {
        const newEvent = {
            target: { name: field, value: html }
        };
        onChange(newEvent);
        onSend(newEvent);
    };

    return (
        <div className="p-view-footer">
            <div className="position-relative h-100 w-100">
                <div className={`text-editor ${classes || ""}`}>
                    <InputGroup
                        type="textarea"
                        placeholder={placeholder || "Type here..."}
                        onChange={onChangeHandler}
                        value={html}
                        name={field}
                        onSubmit={onSendMessage}
                    />
                    <div className="footer-action">
                        <div className="action-left">
                            <div className="button-view">
                                <button className="text-button">
                                    <Icon attrIcon={App_url.icons.PlusIcon} />
                                </button>
                            </div>
                            <div className="button-view">
                                <EmojiPicker onEmojiClick={handleInsertEmoji}>
                                    <button className="text-button">
                                        <Icon attrIcon={App_url.icons.Smile} />
                                    </button>
                                </EmojiPicker>
                            </div>
                            <div className="button-view">
                                <button className="text-button">
                                    <Icon attrIcon={App_url.icons.VideoRecording} />
                                </button>
                            </div>
                        </div>
                        <div className="action-left">
                            <div className="button-view">
                                <button className="text-button" onClick={onSendMessage}>
                                    <Icon attrIcon={App_url.icons.Send} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
