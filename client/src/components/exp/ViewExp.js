import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Fragment } from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ViewExp = (props) => {
  console.log(props.exp);
  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mt-5">Work Experience</h3>
        <h3 className="mt-5">
          <Link to="/profile/addexp">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Link>
        </h3>
      </div>
      {props.exp.map((exp) => (
        <div className="m-5">
          <Card>
            <Card.Body>
              <Card.Title>
                {exp.title} at {exp.company}
              </Card.Title>
              {!exp.current ? (
                <Card.Subtitle>
                  <Moment format="MMMM DD YYYY">{exp.from}</Moment> to{" "}
                  <Moment>{exp.to}</Moment>
                </Card.Subtitle>
              ) : (
                <Card.Subtitle>
                  <Moment format="MMMM DD YYYY">{exp.from}</Moment>{" "}
                  <span className="text-muted">to</span> <span>current</span>
                </Card.Subtitle>
              )}
              <Card.Text>{exp.location}</Card.Text>
              <Card.Text>{exp.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Fragment>
  );
};

ViewExp.propTypes = {};

const mapStateToProps = (state) => ({
  exp: state.profile.profile.experience,
});
export default connect(mapStateToProps)(ViewExp);
