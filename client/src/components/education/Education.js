import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setEdu } from "../../actions/profile";

const Education = (props) => {
  return <div>education</div>;
};

Education.propTypes = {
  setEdu: PropTypes.func.isRequired,
};

export default connect(null, { setEdu })(withRouter(Education));
