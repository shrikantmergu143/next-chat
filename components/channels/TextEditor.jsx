import React, { useEffect, useRef, useState } from "react";
import App_url from "../common/constant";
import Icon from "../common/Icon";
import ToolTip from "../common/PopOver";

function TextEditor(props) {
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
    // Remove empty paragraphs
    const cleanedContent = currentContent.replace(/<p><br><\/p>/g, "").trim();
    const updatedHistory = [
      ...history.slice(0, historyIndex + 1),
      cleanedContent,
    ];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setContent(cleanedContent || "<p><br></p>"); // Ensure there's always some content
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
  const isSelectionInBlockquote = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      while (container) {
        if (container.nodeType === 1 && container.tagName === "BLOCKQUOTE") {
          return true;
        }
        container = container.parentNode;
      }
    }
    return false;
  };
  const removeBlockquote = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      while (container && container.tagName !== "BLOCKQUOTE") {
        container = container.parentNode;
      }
      if (container && container.tagName === "BLOCKQUOTE") {
        const parent = container.parentNode;
        while (container.firstChild) {
          parent.insertBefore(container.firstChild, container);
        }
        parent.removeChild(container);
        cleanAndSaveHistory();
      }
    }
  };
  const handleQuote = () => {
    if (isSelectionInBlockquote()) {
      removeBlockquote();
    } else {
      execCommand("formatBlock", "blockquote");
    }
  };
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
  useEffect(() => {
    const handleClick = (event) => {
      const pViewFooter = document.getElementById("p-view-footer");
      if (pViewFooter && pViewFooter.contains(event.target)) {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const buttons = [
    { title: "Bold", function: (e) => handleBold(e), icon: App_url?.icons?.Bold },
    { title: "Italic", function: (e) => handleItalic(e), icon: App_url?.icons?.Italic },
    { title: "Underline", function: (e) => handleUnderline(e), icon: App_url?.icons?.Underline },
    { title: "StrikeThrough", function: (e) => handleStrikeThrough(e), icon: App_url?.icons?.Strike },
    { title: "Quote", function: (e) => handleQuote(e), icon: App_url?.icons?.Quote },
    { title: "Ordered List", function: (e) => handleOrderedList(e), icon: App_url?.icons?.OrderList },
    { title: "Unordered List", function: (e) => handleUnorderedList(e), icon: App_url?.icons?.UnOrderList },
    // { title: "Link", function: (e) => handleLink(e), icon: App_url?.icons?.Link },
    // { title: "Image", function: (e) => handleImage(e), icon: App_url?.icons?.Attach },
    // { title: "Clean", function: (e) => handleClean(e), icon: App_url?.icons?.Eraser },
    { title: "Code", function: (e) =>  handleCode(e), icon: App_url?.icons?.Code },
    { title: "Code Block", function: (e) => handleCodeBlock(e), icon: App_url?.icons?.CodeBlock },
    // { title: "Undo", function: ()=> undo(), icon: App_url?.icons?.Undo },
    // { title: "Redo", function: ()=> redo(), icon: App_url?.icons?.Redo },
  ];
  const buttonFooterAction = [
    {
      align:"left",
      actionList:[
        { title: "Bold", function: (e) => handleBold(e), icon: App_url?.icons?.PlusIcon, className:"rounded" },
        { title: "Alphabet", function: (e) => handleBold(e), icon: App_url?.icons?.Alphabet, },
        { title: "Smile", function: (e) => handleBold(e), icon: App_url?.icons?.Smile, },
        { title: "VideoRecording", function: (e) => handleBold(e), icon: App_url?.icons?.VideoRecording, },
        { title: "AudioRecording", function: (e) => handleBold(e), icon: App_url?.icons?.AudioRecording, },

      ]
    },
    {
      align:"left",
      actionList:[
        { function: (e) => handleBold(e), icon: App_url?.icons?.Send, },
      ]
    }
  ]
  const ButtonEditor = (props) =>{
    const onClick = (e) =>{
      e.preventDefault();
      e.stopPropagation();
      props?.onClick(e)
    }
    const renderButton = () =>{
      return(
        <button className={`${props?.className}`} onClick={onClick}>
          {props?.children}
        </button>
      )
    }
    if(!props.title){
      return renderButton();
    }
    return(
      <ToolTip title={props.title} placement={"top"}>
        {renderButton()}
      </ToolTip>
    )
  }
  console.log("content", content)
  return (
    <div className="p-view-footer" id="p-view-footer">
      <div className="position-relative h-100 w-100">
        <div className="text-editor">
          <div className="toolbar">
            {buttons.map((item, index) => (
              <ButtonEditor {...item} className="text-button" key={index} onClick={item.function}>
                <Icon attrIcon={item.icon} />
              </ButtonEditor>
            ))}
          </div>
          <div className="ql-editor">

          <div
            ref={editorRef}
            className={`editor ${content == "" || content == "<p><br></p>"?"editor-placeholder":""}`}
            contentEditable
            onMouseUp={handleMouseUp}
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={handleInput}
            data-placeholder={props?.placeholder}
          ></div>
          </div>

          <div className="footer-action">
            {buttonFooterAction.map((action, index) => (
              <React.Fragment>
                <div className={`action-${action?.align}`}>
                {action?.actionList.map((item, index) => (
                  <React.Fragment key={index} >
                    <ButtonEditor {...item} className={`text-button ${item?.className}`} onClick={item.function}>
                      <Icon attrIcon={item.icon} />
                    </ButtonEditor>
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
