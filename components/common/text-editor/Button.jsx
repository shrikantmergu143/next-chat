import React from "react";
import Icon from "../Icon";

const Button = ({ send = false, icon, cmd, arg = null, editorRef, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(send){

    }else if(editorRef?.current) {
      const editor = editorRef.current;
      editor.focus(); // Ensure editor is focused

      // Preserve the selection before executing the command
      const selection = window.getSelection();
      if (selection.rangeCount === 0) {
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false); // Place the cursor at the end of the content
        selection.removeAllRanges();
        selection.addRange(range);
      }
      document.execCommand(cmd, false, arg);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button className={`text-button`} onClick={handleClick}>
      <Icon attrIcon={icon} />
    </button>
  );
};

export default Button;
