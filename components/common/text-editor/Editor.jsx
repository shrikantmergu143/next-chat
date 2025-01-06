import React, { useRef } from "react";
import Button from "./Button";
import App_url from "../constant.js";

const Editor = ({ field, html, classes, onChange, placeholder }) => {
  const editorRef = useRef();
  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };
  const handleSave = (event) => {
    event.preventDefault();

    const initialHtml = html;
    const el = editorRef.current;
    const newHtml = el ? el.innerHTML : event.target.value;

    if (initialHtml !== newHtml) {
      const newEvent = Object.assign({}, event, {
        target: { name: field, value: newHtml },
      });
      onChange(newEvent);
    }
  };
  const buttonFooterAction = [
    {
      align: "left",
      actionList: [
        {
          title: "Bold",
          function: ()=>{},
          icon: App_url?.icons?.PlusIcon,
          className: "rounded",
        },
        {
          title: "Alphabet",
          function: ()=>{},
          icon: App_url?.icons?.Alphabet,
        },
        { title: "Smile", function: ()=>{}, icon: App_url?.icons?.Smile },
        { divider: true },
        {
          title: "VideoRecording",
          function: ()=>{},
          icon: App_url?.icons?.VideoRecording,
        },
        { divider: true },
        {
          title: "AudioRecording",
          function: ()=>{},
          icon: App_url?.icons?.AudioRecording,
        },
      ],
    },
    {
      align: "left",
      actionList: [{ function: ()=>{}, icon: App_url?.icons?.Send, send:true }],
    },
  ];
  const handleFooterClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
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
          <Button {...props} icon={props.icon}  editorRef={editorRef} cmd={props?.cmd} onClick={onClick} />
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
  const contentLoad = () =>{
    return (
      <div className="p-view-footer" 
        onClick={handleFooterClick}
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
            />
            <div className="footer-action">
              {buttonFooterAction.map((action, index) => (
                <React.Fragment>
                  <div className={`action-${action?.align}`}>
                    {action?.actionList.map((item, index) => (
                      <React.Fragment key={index}>
                        <ButtonEditor
                          {...item}
                          className={`text-button ${item?.className}`}
                          onClick={item.function}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return contentLoad();
};

export default Editor;
