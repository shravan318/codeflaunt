import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    position: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
  });
  return (
    <div>
      <p>create profile</p>
    </div>
  );
};
export default connect()(CreateProfile);
