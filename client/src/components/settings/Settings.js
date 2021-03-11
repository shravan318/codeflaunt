import React, { Fragment, useState } from "react";
import { Button, Jumbotron, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { delAcc } from "../../actions/profile";
import { PropTypes } from "prop-types";

const Settings = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.delAcc();
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Fragment>
      <Jumbotron>
        <h1>Hello, {props.auth.user.name}</h1>
        <p>
          This will permanently delete your account and data! Do you wish to
          continue?
        </p>
        <p>
          <Button variant="danger" block onClick={handleShow}>
            Delete Account
          </Button>
        </p>
      </Jumbotron>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Woohoo, you're deleting profile! Are you sure?
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
    </Fragment>
  );
};
Settings.propTypes = {
  delAcc: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { delAcc })(Settings);
