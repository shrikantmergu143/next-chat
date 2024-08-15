import React, { useEffect, useRef, useState } from "react";
import App_url from "../common/constant";
import Icon from "../common/Icon";
import ToolTip from "../common/PopOver";

function TextEditor() {
  const [content, setContent] = useState("");
  const [selection, setSelection] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    cleanAndSaveHistory();
  };

  const wrapSelection = (before, after) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const wrappedText = `${before}${selectedText}${after}`;
      range.deleteContents();
      const newNode = document.createElement("span");
      newNode.innerHTML = wrappedText;
      range.insertNode(newNode);
      range.setStartAfter(newNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      cleanAndSaveHistory();
    }
  };

  const handleMouseUp = () => {
    setSelection(window.getSelection().toString());
  };

  const handleInput = (e) => {
    // Ensure every text input has a tag
    const editorContent = editorRef.current.innerHTML;
    if (!editorContent.trim()) {
      setContent("<p><br></p>");
    } else if (!editorContent.startsWith("<")) {
      setContent(`<p>${editorContent}</p>`);
    } else {
      setContent(editorContent);
    }
    cleanAndSaveHistory(editorContent);
  };

  const setCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const cleanAndSaveHistory = (newContent = null) => {
    const currentContent =
      newContent !== null ? newContent : editorRef.current.innerHTML;
    const cleanedContent = currentContent.replace(/<p><br><\/p>/g, "").trim();
    const updatedHistory = [
      ...history.slice(0, historyIndex + 1),
      cleanedContent,
    ];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setContent(cleanedContent || "<p><br></p>");
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setContent(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setContent(history[newIndex]);
      setHistoryIndex(newIndex);
    }
  };

  const handleBold = () => execCommand("bold");
  const handleItalic = () => execCommand("italic");
  const handleUnderline = () => execCommand("underline");
  const handleStrikeThrough = () => execCommand("strikeThrough");
  const handleQuote = () => execCommand("formatBlock", "blockquote");
  const handleOrderedList = () => execCommand("insertOrderedList");
  const handleUnorderedList = () => execCommand("insertUnorderedList");
  const handleLink = () => {
    const url = prompt("Enter the link URL");
    if (url) execCommand("createLink", url);
  };
  const handleImage = () => {
    const url = prompt("Enter the image URL");
    if (url) execCommand("insertImage", url);
  };
  const handleClean = () => execCommand("removeFormat");
  const handleCode = () => wrapSelection("<code>", "</code>");
  const handleCodeBlock = () => wrapSelection("<pre><code>", "</code></pre>");

  useEffect(() => {
    document.execCommand("defaultParagraphSeparator", false, "p");
    if (editorRef.current) {
      setCursorToEnd(editorRef.current);
    }
    console.log("editorRef", editorRef)
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [historyIndex, history]);

  useEffect(() => {
    cleanAndSaveHistory(content);
  }, []);

  useEffect(() => {
    if (!content) {
      setContent("<p><br></p>");
    }
  }, []);
  const handleSubmit = async () => {
    if (content != "<p><br></p>" && props?.onSendMessage) {
      props?.onSendMessage(content);
    }
    setContent("<p><br></p>");
  };

  const buttons = [
    { title: "Bold", function: handleBold, icon: App_url?.icons?.Bold },
    { title: "Italic", function: handleItalic, icon: App_url?.icons?.Italic },
    { title: "Underline", function: handleUnderline, icon: App_url?.icons?.Underline, },
    { divider: true },
    { title: "StrikeThrough", function: handleStrikeThrough, icon: App_url?.icons?.Strike, },
    { divider: true },
    { title: "Ordered List", function: handleOrderedList, icon: App_url?.icons?.OrderList, },
    { title: "Unordered List", function: handleUnorderedList, icon: App_url?.icons?.UnOrderList, },
    // { divider: true },
    // { title: "Link", function: handleLink, icon: App_url?.icons?.Link },
    // { title: "Image", function: handleImage, icon: App_url?.icons?.Attach },
    // { title: "Clean", function: handleClean, icon: App_url?.icons?.Eraser },
  ];
  const buttonFooterAction = [
    {
      align:"left",
      actionList:[
        { title: "Bold", function:handleBold, icon: App_url?.icons?.PlusIcon, className:"rounded" },
        { title: "Alphabet", function:handleBold, icon: App_url?.icons?.Alphabet, },
        { title: "Smile", function:handleBold, icon: App_url?.icons?.Smile, },
        { divider:true },
        { title: "VideoRecording", function:handleBold, icon: App_url?.icons?.VideoRecording, },
        { divider:true },
        { title: "AudioRecording", function:handleBold, icon: App_url?.icons?.AudioRecording, },
      ]
    },
    {
      align:"left",
      actionList:[
        { function:handleSubmit, icon: App_url?.icons?.Send, },
      ]
    }
  ]

  const ButtonEditor = (props) => {
    const onClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("props", props);
      props?.function(e);
    };
    const renderButton = () => {
      return (
        <button className={`${props?.className}`} onClick={onClick}>
          <Icon attrIcon={props.icon} />
        </button>
      );
    };
    if (props?.divider) {
      return (
        <React.Fragment>
          <span className="divider" />
        </React.Fragment>
      );
    }
    if (!props.title) {
      return renderButton();
    }
    return (
      // <ToolTip title={props.title} placement={"top"}>
        renderButton()
      // </ToolTip>
    );
  };
  console.log("content", content);
  return (
    <div className="p-view-footer" id="p-view-footer">
      <div className="position-relative h-100 w-100">
      <div className="text-editor">
        <div className="toolbar">
          {buttons.map((item, index) => (
            <React.Fragment key={index}>
              <ButtonEditor {...item} className="text-button" />
            </React.Fragment>
          ))}
        </div>
        <div
          ref={editorRef}
          className={`editor ${ content == "" || content == "<p><br></p>" ? "editor-placeholder" : "" }`}
          contentEditable
          onMouseUp={handleMouseUp}
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={handleInput}
          data-placeholder={props?.placeholder}
          ></div>
        <div className="footer-action">
            {buttonFooterAction.map((action, index) => (
              <React.Fragment>
                <div className={`action-${action?.align}`}>
                {action?.actionList.map((item, index) => (
                  <React.Fragment key={index} >
                    <ButtonEditor {...item} className={`text-button ${item?.className}`} onClick={item.function}/>
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

export default TextEditor;
