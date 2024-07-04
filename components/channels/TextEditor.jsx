import React, { useEffect, useRef, useState } from 'react';
import App_url from '../common/constant';
import Icon from '../common/Icon';

function TextEditor() {
  const [content, setContent] = useState('');
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
      const newNode = document.createElement('span');
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
      setContent('<p><br></p>');
    } else if (!editorContent.startsWith('<')) {
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
    const currentContent = newContent !== null ? newContent : editorRef.current.innerHTML;
    // Remove empty paragraphs
    const cleanedContent = currentContent.replace(/<p><br><\/p>/g, '').trim();
    const updatedHistory = [...history.slice(0, historyIndex + 1), cleanedContent];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setContent(cleanedContent || '<p><br></p>'); // Ensure there's always some content
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

  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  const handleStrikeThrough = () => execCommand('strikeThrough');
  const handleQuote = () => execCommand('formatBlock', 'blockquote');
  const handleOrderedList = () => execCommand('insertOrderedList');
  const handleUnorderedList = () => execCommand('insertUnorderedList');
  const handleLink = () => {
    const url = prompt('Enter the link URL');
    if (url) execCommand('createLink', url);
  };
  const handleImage = () => {
    const url = prompt('Enter the image URL');
    if (url) execCommand('insertImage', url);
  };
  const handleClean = () => execCommand('removeFormat');
  const handleCode = () => wrapSelection('<code>', '</code>');
  const handleCodeBlock = () => wrapSelection('<pre><code>', '</code></pre>');

  useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    if (editorRef.current) {
      setCursorToEnd(editorRef.current);
    }
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [historyIndex, history]);

  useEffect(() => {
    cleanAndSaveHistory(content);
  }, []);

  useEffect(() => {
    if (!content) {
      setContent('<p><br></p>');
    }
  }, []);

  console.log("content", content);
  return (
    <div className="p-view-footer">
      <div className='text-editor'>
        <div className="toolbar">
          <button onClick={handleBold}>
            <Icon attrIcon={App_url?.icons?.Bold}/>
          </button>
          <button onClick={handleItalic}>
            <Icon attrIcon={App_url?.icons?.Italic}/>
          </button>
          <button onClick={handleUnderline}>Underline</button>
          <button onClick={handleStrikeThrough}>Strike</button>
          <button onClick={handleQuote}>Quote</button>
          <button onClick={handleOrderedList}>Ordered List</button>
          <button onClick={handleUnorderedList}>Bullet List</button>
          <button onClick={handleLink}>Link</button>
          <button onClick={handleImage}>Image</button>
          <button onClick={handleClean}>Clean</button>
          <button onClick={handleCode}>Code</button>
          <button onClick={handleCodeBlock}>Code Block</button>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
        </div>
        <div
          ref={editorRef}
          className="editor"
          contentEditable
          onMouseUp={handleMouseUp}
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={handleInput}
        ></div>
      </div>
    </div>
  );
}

export default TextEditor;
