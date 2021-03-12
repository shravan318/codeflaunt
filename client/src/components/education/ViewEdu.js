import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Fragment } from "react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { delEdu } from "../../actions/profile";
import {
  faPlus,
  faTrash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import Avatar from "react-avatar";

const ViewEdu = (props) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState({
    id: "",
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (edu_id) => {
    setShow(true);
    setId(edu_id);
  };
  const handleDelete = (id) => {
    props.delEdu(id);
  };
  let history = useHistory();
  const editEdu = () => history.push("/");
  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mt-5">Education</h3>
        <h3 className="mt-5">
          <Link to="/profile/addedu">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </h3>
      </div>
      {props.edu.map((edu) => (
        <div key={edu._id} className="m-5">
          <Card className="px-3 py-1">
            <div className="d-flex  justify-content-start align-items-center">
              <Avatar
                name={edu.university}
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
                    {edu.degree} in {edu.fieldofstudy} from {edu.university}{" "}
                  </p>
                  <p className=" float-end">
                    <Link className="text-muted">
                      <FontAwesomeIcon
                        style={{ marginLeft: "2em" }}
                        icon={faPencilAlt}
                        size="sm"
                        onClick={editEdu}
                      />
                    </Link>
                    <Link className="text-muted">
                      <FontAwesomeIcon
                        style={{ marginLeft: "2em" }}
                        icon={faTrash}
                        size="sm"
                        onClick={() => handleShow(edu._id)}
                      />
                    </Link>
                  </p>
                </Card.Title>
                {!edu.current ? (
                  <Card.Subtitle>
                    <Moment format="MMMM DD YYYY">{edu.from}</Moment> to{" "}
                    <Moment format="MMMM DD YYYY">{edu.to}</Moment>
                  </Card.Subtitle>
                ) : (
                  <Card.Subtitle>
                    <Moment format="MMMM DD YYYY">{edu.from}</Moment>{" "}
                    <span className="text-muted">to</span> <span>current</span>
                  </Card.Subtitle>
                )}
                <Card.Text>{edu.location}</Card.Text>
                <Card.Text>{edu.description}</Card.Text>
              </Card.Body>
            </div>
          </Card>
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Educatioun</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're deleting education details! Are you sure?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
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

ViewEdu.propTypes = {
  edu: PropTypes.array.isRequired,
  delEdu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  edu: state.profile.profile.education,
  auth: state.auth,
});
export default connect(mapStateToProps, { delEdu })(ViewEdu);
