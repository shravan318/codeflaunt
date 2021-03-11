import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Modal } from "react-bootstrap";
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
import { delExp } from "../../actions/profile";

const ViewExp = (props) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState({
    id: "",
  });

  const handleClose = () => {
    setShow(false);
    props.delExp(id);
  };
  const handleShow = (exp_id) => {
    setShow(true);
    setId(exp_id);
  };

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
        <div key={exp._id} className="m-5">
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
                  <p>
                    <FontAwesomeIcon
                      style={{ marginLeft: "2em", cursor: "pointer" }}
                      icon={faPencilAlt}
                      size="sm"
                      onClick={editExp}
                    />

                    <FontAwesomeIcon
                      style={{ marginLeft: "2em", cursor: "pointer" }}
                      icon={faTrash}
                      size="sm"
                      onClick={() => handleShow(exp._id)}
                    />
                  </p>
                </Card.Title>
                {!exp.current ? (
                  <Card.Subtitle>
                    <Moment format="MMMM DD YYYY">{exp.from}</Moment> to{" "}
                    <Moment format="MMMM DD YYYY">{exp.to}</Moment>
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
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Experience</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're deleting this work experiencel! Are you sure?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
      ))}
    </Fragment>
  );
};

ViewExp.propTypes = {
  exp: PropTypes.array.isRequired,
  delExp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exp: state.profile.profile.experience,
  auth: state.auth,
});
export default connect(mapStateToProps, { delExp })(ViewExp);
