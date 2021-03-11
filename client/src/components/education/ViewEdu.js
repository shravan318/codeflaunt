import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Fragment } from "react";

const ViewEdu = (props) => {
  console.log(props.exp);
  return (
    <Fragment>
      <h3 className="mt-5">Education</h3>
      <div className="m-5">
        <Card>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

ViewEdu.propTypes = {};

const mapStateToProps = (state) => ({
  exp: state.profile.profile.experience,
});
export default connect(mapStateToProps)(ViewEdu);
