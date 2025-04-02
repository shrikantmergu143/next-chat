import React from 'react';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import App_url from '../constant';
import EmojiPicker from '../../emoji/EmojiPicker';

export default function MessageEditor({ field, html, classes, onChange, placeholder, onSend }) {
    // Function to handle inserting emojis into the textarea at the cursor position
    const handleInsertEmoji = (emojiData) => {
        const emoji = emojiData.emoji || emojiData.image; // Select emoji
        const textArea = document.getElementsByName(field)[0]; // Get the textarea element
        const cursorPosition = textArea.selectionStart; // Get the current cursor position
        
        // Insert emoji at cursor position
        const newText =
            html.slice(0, cursorPosition) + emoji + html.slice(cursorPosition);
        
        // Update the value of the textarea
        onChange({ target: { name: field, value: newText } });

        // Set the cursor position to right after the inserted emoji
        setTimeout(() => {
            textArea.selectionStart = textArea.selectionEnd = cursorPosition + emoji.length;
            textArea.focus(); // Ensure the textarea remains focused
        }, 0);
    };

    const onChangeHandler = (e) => {
        onChange(e);
        console.log("e?.key", e)
        if (e?.key === 'Enter') {
            if (!e.shiftKey && !e.ctrlKey) {
                e.preventDefault(); // Prevent default Enter behavior
                onSend({ target: { name: field, value: e?.target?.value } }); // Call the send message function
            }
        }
    };
    const onSendMessage = () =>{
        const newEvent = Object.assign({}, {
          target: { name: field, value: html },
        });
        onChange(newEvent);
        onSend(newEvent);
      }
    

    return (
        <div className="p-view-footer">
            <div className="position-relative h-100 w-100">
                <div className={`text-editor ${classes ? classes : ""}`}>
                    <InputGroup
                        type="textarea"
                        placeholder={placeholder || "Type here..."}
                        onChange={onChangeHandler}
                        value={html}
                        name={field}
                        onSubmit={onSendMessage} // Listen for Enter key press
                    />
                    <div className="footer-action">
                        <div className="action-left">
                            <div className="button-view">
                                <EmojiPicker onEmojiClick={handleInsertEmoji}>
                                    <button className="text-button">
                                        <Icon attrIcon={App_url.icons.Smile} />
                                    </button>
                                </EmojiPicker>
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
