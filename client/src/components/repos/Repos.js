import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRepo } from "../../actions/profile";
import CustomSpinner from "../spinner/Spinner";

const Repos = (props) => {
  return <div>dadasdsad</div>;
};

Repos.propTypes = {
  getRepo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getRepo })(Repos);
