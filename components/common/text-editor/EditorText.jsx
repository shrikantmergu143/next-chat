import React, { useState, Fragment } from "react";
import Editor from "./Editor";

export default {
  component: Editor,
  title: "React Text Editor"
};

export const EditorText = () => {
  const [values, setValues] = useState({ text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Fragment>
      <Editor
        field="text"
        html={values.text}
        onChange={handleChange}
        placeholder="Temporal placeholder..."
      />
    </Fragment>
  );
}