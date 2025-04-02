import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import App_url from "../constant.js";
import EmojiPicker from "../../emoji/EmojiPicker.jsx";

const EmojiButton = ({ editorRef, ButtonEditor }) => {
  const [showEmoji, onShowEmoji] = useState(false);
  const handleFooterClick = () => {
    // if (editorRef.current) {
    //   editorRef.current.focus();
    // }
  };

  const handleInsertImage = (imageUrl) => {
    const el = editorRef.current;
    if (!el) return;

    const imgTag = `<img src="${imageUrl?.image}" alt="emoji" style="width: 24px; height: 24px;">`;

    document.execCommand("insertHTML", false, imgTag);
  };
  const emojiPickerMemo = useMemo(
    () => (showEmoji ? <EmojiPicker onEmojiClick={handleInsertImage} /> : null),
    [showEmoji]
  );

  const renderBottom = () => {
    return (
      <ButtonEditor
        title={"Smile"}
        onClick={() => onShowEmoji(!showEmoji)}
        icon={App_url?.icons?.Smile}
        className={"rounded"}
        // render={emojiPickerMemo}
      />
    );
  };

  return renderBottom();
};

export default EmojiButton;
