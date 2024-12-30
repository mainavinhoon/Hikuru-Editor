'use client'; 

import React, { useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  Modifier,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  ContentState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = useState(null); // Initialize with `null`
  const [isMounted, setIsMounted] = useState(false); // Tracks if component has mounted

  useEffect(() => {
    setIsMounted(true); // Mark component as mounted
    const savedContent = typeof window !== 'undefined' && localStorage.getItem('draftEditorContent');
    setEditorState(
      savedContent
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
        : EditorState.createEmpty()
    );
  }, []);

  useEffect(() => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      localStorage.setItem('draftEditorContent', JSON.stringify(convertToRaw(contentState)));
    }
  }, [editorState]);

  const handleBeforeInput = (chars) => {
    if (!editorState) return 'not-handled'; // Ensure `editorState` exists
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const blockText = contentState.getBlockForKey(blockKey).getText();

    // Handle '# ' -> Custom HEADER (Apply custom header style)
    if (chars === ' ' && blockText.startsWith('#')) {
    
      const newContentState = Modifier.removeRange(
        contentState,
        selection.merge({ anchorOffset: 0, focusOffset: 1 }), // Remove the '#'
        'backward'
      );
      let newState = EditorState.push(editorState, newContentState, 'remove-range');
  
      // Apply HEADER block style directly
      newState = RichUtils.toggleInlineStyle(newState, 'HEADER'); 
      setEditorState(newState); 
  
      return 'handled';
    }

    // Handle '* ' -> BOLD (Inline style)
    if (chars === ' ' && blockText.startsWith('*') && blockText.length === 1) {
      const newContentState = Modifier.removeRange(
        contentState,
        selection.merge({ anchorOffset: 0, focusOffset: 2 }), // Remove the '*' and space
        'backward'
      );
      let newState = EditorState.push(editorState, newContentState, 'remove-range');
      // Apply bold inline style directly after range removal
      newState = RichUtils.toggleInlineStyle(newState, 'BOLD'); // Apply bold inline style
      setEditorState(newState);
      return 'handled';
    }

    // Handle '** ' -> RED (Inline style)
    if (chars === ' ' && blockText.startsWith('**') && blockText.length === 2) {
      const newContentState = Modifier.removeRange(
        contentState,
        selection.merge({ anchorOffset: 0, focusOffset: 3 }), // Remove the '**' and space
        'backward'
      );
      let newState = EditorState.push(editorState, newContentState, 'remove-range');
      // Apply RED inline style directly after range removal
      newState = RichUtils.toggleInlineStyle(newState, 'RED'); // Apply red inline style
      setEditorState(newState);
      return 'handled';
    }

    // Handle '*** ' -> UNDERLINE (Inline style)
    if (chars === ' ' && blockText.startsWith('***') && blockText.length === 3) {
      const newContentState = Modifier.removeRange(
        contentState,
        selection.merge({ anchorOffset: 0, focusOffset: 4 }), // Remove the '***' and space
        'backward'
      );
      let newState = EditorState.push(editorState, newContentState, 'remove-range');
      // Apply underline inline style directly after range removal
      newState = RichUtils.toggleInlineStyle(newState, 'UNDERLINE'); // Apply underline inline style
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const saveContent = () => {
    if (editorState) {
      const contentState = editorState.getCurrentContent();
      localStorage.setItem('draftEditorContent', JSON.stringify(convertToRaw(contentState)));
    }
  };

  const customStyleMap = {
    RED: {
      color: 'red',
    },
    HEADER: {
      fontSize: '4rem', // Example header size
      fontWeight: 'bold',
    },
  };

  const blockRendererFn = (block) => {
    if (block.getType() === 'HEADER') {
      return { 
        props: {
          style: { 
            fontSize: '10rem', 
            fontWeight: 'bold', 
          },
        },
      };
    }
    return null; 
  };

  if (!isMounted || !editorState) {
    return <div>Loading...</div>; // Placeholder until the client renders
  }

  return (
    <div className=" w-11/12 m-2 p-4">

    <div className='flex flex-col align-middle justify-evenly m-5 md:flex-row'>
    <h1 className="text-4xl  justify-start align-top text-center p-4 font-bold">Zikuru Editor - Navin Rawat</h1>
      <button
        onClick={saveContent}
        className="p-1 ml-auto size-16 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Save
      </button>
    </div>
     
      <div className="border fixed w-10/12 min-h-44 h-fit rounded-md shadow-sm p-3">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={customStyleMap} // Make sure to pass the customStyleMap here
          blockRendererFn={blockRendererFn} 
        />
      </div>
   
    </div>
  );
}

export default MyEditor;
