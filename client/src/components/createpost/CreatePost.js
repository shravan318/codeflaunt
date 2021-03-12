import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PropTypes } from "prop-types";
import "./createPost.css";
import { Button } from "react-bootstrap";
import { addPost } from "../../actions/post";
import { connect } from "react-redux";

const CreatePost = (props) => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const onEditorChange = (value) => {
    setFormData({
      content: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormData("");

    props.addPost(formData);
    console.log(formData);
  };

  CreatePost.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  CreatePost.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="quill-wrapper">
      {/* <EditorToolbar /> */}
      <ReactQuill
        theme="snow"
        value={formData.content}
        onChange={onEditorChange}
        placeholder={"Create an awesome post..."}
        modules={CreatePost.modules}
        formats={CreatePost.formats}
      />
      <div className="d-flex justify-content-center">
        <Button onClick={handleSubmit}>Submit Post</Button>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired,
};
export default connect(null, { addPost })(CreatePost);
