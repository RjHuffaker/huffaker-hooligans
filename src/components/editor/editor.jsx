import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editor-toolbar";
import "react-quill/dist/quill.snow.css";
// import "./styles.css";

export const Editor = ({ value, setValue }) => {
  
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;