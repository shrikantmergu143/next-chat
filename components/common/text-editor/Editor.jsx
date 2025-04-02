import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import App_url from "../constant.js";
import EmojiPicker from "../../emoji/EmojiPicker.jsx";
import EmojiButton from "./EmojiButton.jsx";

const Editor = ({ field, html, classes, onChange, placeholder, onSend }) => {
  const editorRef = useRef();
  const [showEmoji, onShowEmoji]= useState(false)
  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };
  const handleSave = (event, eventSend) => {
    event.preventDefault();

    const initialHtml = html;
    const el = editorRef.current;
    const newHtml = el ? el.innerHTML : event.target.value;

    if (initialHtml !== newHtml && !eventSend) {
      const newEvent = Object.assign({}, event, {
        target: { name: field, value: newHtml },
      });
      onChange(newEvent);
    }
    if(eventSend){
      const newEvent = Object.assign({}, event, {
        target: { name: field, value: newHtml },
      });
      onChange(newEvent);
      onSend(newEvent);
      el.innerText = "";
    }
  };
  const onSendMessage = () =>{
    const initialHtml = html;
    const el = editorRef.current;
    const newHtml = el ? el.innerHTML : event.target.value;
    const newEvent = Object.assign({}, {
      target: { name: field, value: newHtml },
    });
    onChange(newEvent);
    onSend(newEvent);
    el.innerText = "";
  }

  const handleFooterClick = () => {
    // if (editorRef.current) {
    //   editorRef.current.focus();
    // }
  };
    const ButtonEditor = (props) => {
      const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        props?.onClick?.(e);
        if(props?.send){

        }else{
          handleFooterClick();
        }
      };
      const RenderButton = () => {
        return (
          <div className="button-view">
            <Button {...props} icon={props.icon}  editorRef={editorRef} cmd={props?.cmd} onClick={onClick} />
            {props?.render || props?.render?.()}
          </div>
        );
      };
      if (props?.divider) {
        return (
          <React.Fragment>
            <span className="divider" />
          </React.Fragment>
        );
      }
      return (
        <RenderButton/>
      );
    }
    const buttons = [
      {cmd: "bold", icon: App_url?.icons?.Bold, },
      {cmd: "italic", icon: App_url?.icons?.Italic, },
      {cmd: "underline", icon: App_url?.icons?.Underline, },
      {cmd: "strikeThrough", icon: App_url?.icons?.Strike, },
      {cmd: "insertOrderedList", icon: App_url?.icons?.OrderList, },
      {cmd: "insertUnorderedList", icon: App_url?.icons?.UnOrderList, },
      {cmd: "formatBlock", icon: App_url?.icons?.Quote, arg:"blockquote"  },
    ]
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        if (event.ctrlKey || event.shiftKey) {
          event.preventDefault();
          document.execCommand("insertHTML", false, "<br><br>");
        } else {
          event.preventDefault();
          const el = editorRef.current;
          const newHtml = el ? el.innerHTML : event.target.value;
          const newEvent = Object.assign({}, event, {
            target: { name: field, value: newHtml },
          });
          handleSave(event, true);
          // onSend?.(newEvent);
          
        }
      }
    };
  
    const ButtonIconContent = () => {
      return (
        <React.Fragment>
          <div className="toolbar">
          {buttons.map((item, index) => (
            <React.Fragment  key={index}>
              {ButtonEditor({...item, editorRef:editorRef})}
            </React.Fragment>
          ))}
          </div>
        </React.Fragment>
      );
    };
    const handleInsertImage = (imageUrl) => {
      const el = editorRef.current;
      if (!el) return;
  
      const imgTag = `<img src="${imageUrl?.image}" alt="emoji" style="width: 24px; height: 24px;">`;
  
      document.execCommand("insertHTML", false, imgTag);
  };
    const emojiPickerMemo = useMemo(() => (showEmoji ? <EmojiPicker onEmojiClick={handleInsertImage} /> : null), [showEmoji]);

    const renderBottom = () =>{
      return(
        <div className="footer-action">
          <div className={`action-left`}>
            <ButtonEditor
              title={ "Bold"}
              onClick={ ()=>{}}
              icon={ App_url?.icons?.PlusIcon}
              className={ "rounded"}
            />
            <ButtonEditor
              title={ "Alphabet"}
              onClick={ ()=>{}}
              icon={ App_url?.icons?.Alphabet}
              className={ "rounded"}
            />
            <EmojiButton
              editorRef={editorRef}
              ButtonEditor={ButtonEditor}
            />
            <ButtonEditor
              title={ "VideoRecording"}
              onClick={ ()=>{}}
              icon={ App_url?.icons?.VideoRecording}
              className={ "rounded"}
            />
          </div>
          <div className={`action-left`}>
            <ButtonEditor
              icon={App_url?.icons?.Send}
              onClick={onSendMessage}
              send={true}
            />
          </div>
        </div>
      )
    }
  const contentLoad = () =>{
    return (
      <div className="p-view-footer" 
        // onClick={handleFooterClick}
      >
        <div className="position-relative h-100 w-100">
          <div className={`text-editor ${classes ? classes : ""}`}>
            {ButtonIconContent()}
            <div
              ref={editorRef}
              className={`editor editable`}
              dangerouslySetInnerHTML={{ __html: html }}
              contentEditable={true}
              data-placeholder={placeholder}
              onBlur={handleSave}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
            />
            {renderBottom()}
          </div>
        </div>
      </div>
    );
  }
  return contentLoad();
};

export default Editor;
