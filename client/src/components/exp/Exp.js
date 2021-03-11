import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setExp } from "../../actions/profile";

const Exp = (props) => {
  return <div>Exp </div>;
};

Exp.propTypes = {
  setExp: PropTypes.func.isRequired,
};

export default connect()(Exp);
