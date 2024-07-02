import React, { useEffect, useRef, useState } from 'react'
import DropButton from '../common/DropButton'
import Icon from '../common/Icon'
import App_url from '../common/constant'
import ToolTip from '../common/PopOver'
import Scrollbar from '../common/Scrollbar'


function TextEditor() {
  const [content, setContent] = useState('');
  const [selection, setSelection] = useState(null);
  const editorRef = useRef(null);

  const execCommand = (command) => {
    document.execCommand(command, false, null);
  };

  const handleMouseUp = () => {
    setSelection(window.getSelection().toString());
  };

  const handleInput = (e) => {
    setContent(e.currentTarget.innerHTML);
    setCursorToEnd(e.currentTarget);
  };

  const setCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  useEffect(() => {
    if (editorRef.current) {
      setCursorToEnd(editorRef.current);
    }
  }, [content]);

  console.log("content", content)
  return (
    <div className="App">
      <h1>Custom Text Editor</h1>
      <div className="toolbar">
        <select onChange={(e) => execCommand('formatBlock', e.target.value)} defaultValue="">
          <option value="" disabled>Header</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="p">Paragraph</option>
        </select>
        <button onClick={() => execCommand('bold')}>Bold</button>
        <button onClick={() => execCommand('italic')}>Italic</button>
        <button onClick={() => execCommand('underline')}>Underline</button>
        <button onClick={() => execCommand('strikeThrough')}>Strike</button>
        <button onClick={() => execCommand('blockquote', 'blockquote')}>Blockquote</button>
        <button onClick={() => execCommand('insertOrderedList')}>Ordered List</button>
        <button onClick={() => execCommand('insertUnorderedList')}>Bullet List</button>
        <button onClick={() => execCommand('outdent')}>Outdent</button>
        <button onClick={() => execCommand('indent')}>Indent</button>
        <button onClick={() => {
          const url = prompt('Enter the link URL');
          if (url) execCommand('createLink', url);
        }}>Link</button>
        <button onClick={() => {
          const url = prompt('Enter the image URL');
          if (url) execCommand('insertImage', url);
        }}>Image</button>
        <button onClick={() => execCommand('removeFormat')}>Clean</button>
      </div>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onMouseUp={handleMouseUp}
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleInput}
      ></div>
      <p>Selected Text: {selection}</p>
    </div>
  );
}

export default function ChannelDetails(props) {
  return (
    <React.Fragment>
      <div className='p-view_header'>
          <DropButton title={
            <ToolTip title={"Get channel details"}>
              <div className='d-flex-center'>
                <Icon attrIcon={App_url.icons.Lock} />
                <span>{props?.channelDetails?.channel_name} {props?.channelDetails?.channel_name} {props?.channelDetails?.channel_name}</span>
              </div>
            </ToolTip>
          } />
      </div>
      <div className='p-view-body'>
        <Scrollbar style={{height:`calc(100vh - 2000px)`}} >

        </Scrollbar>
      </div>
      <div className='p-view-footer'>
        <TextEditor/>
      </div>
    </React.Fragment>
  )
}
