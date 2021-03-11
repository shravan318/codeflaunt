import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Fragment } from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import Avatar from "react-avatar";

const ViewExp = (props) => {
  let history = useHistory();
  const editExp = () => history.push("/");
  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mt-5">Work Experience</h3>
        <h3 className="mt-5">
          <Link to="/profile/addexp">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </h3>
      </div>
      {props.exp.map((exp) => (
        <div className="m-5">
          <Card className="px-3 py-1">
            <div className="d-flex  justify-content-start align-items-center">
              <Avatar
                name={exp.company}
                color="#000"
                maxInitials={2}
                color="#1a1a1a"
                fgColor="#ffffff"
                size="4em"
                round="50%"
                textSizeRatio={4}
                style={{
                  width: "7%",
                }}
              />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <p>
                    {" "}
                    {exp.title} at {exp.company}{" "}
                  </p>
                  <p className=" float-end">
                    <Link className="text-muted">
                      <FontAwesomeIcon
                        style={{ marginLeft: "2em" }}
                        icon={faPencilAlt}
                        size="sm"
                        onClick={editExp}
                      />
                    </Link>
                    <Link className="text-muted">
                      <FontAwesomeIcon
                        style={{ marginLeft: "2em" }}
                        icon={faPencilAlt}
                        size="sm"
                        onClick={editExp}
                      />
                    </Link>
                  </p>
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
            </div>
          </Card>
        </div>
      ))}
    </Fragment>
  );
};

ViewExp.propTypes = {};

const mapStateToProps = (state) => ({
  exp: state.profile.profile.experience,
  auth: state.auth,
});
export default connect(mapStateToProps)(ViewExp);
