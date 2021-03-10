import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
const Profile = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  return (
    <div>
      <h1>profile</h1>
    </div>
  );
};

Profile.protoType = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
