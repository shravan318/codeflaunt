import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    // console.log(alert)
    <Alert key={alert.id} variant={alert.variant}>
      {alert.msg}
    </Alert>
  ));

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alerts);
