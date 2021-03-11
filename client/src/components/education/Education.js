import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setEdu } from "../../actions/profile";
import { Form, Row, Col, Button } from "react-bootstrap";

const Edu = (props) => {
  const [formData, setFormData] = useState({
    university: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, setDisabled] = useState(false);
  const { current } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    props.setEdu(formData, props.history);
  };
  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <h5>Education Details</h5>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>University</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="university"
              type="text"
              name="university"
              value={formData.university}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Degree</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="degree"
              type="text"
              name="degree"
              value={formData.degree}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Field of study</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="fieldofstudy"
              type="text"
              name="fieldofstudy"
              value={formData.fieldofstudy}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>From</Form.Label>
          </Col>
          <Col lg={2} md={12} sm={12}>
            <Form.Control
              placeholder="from"
              type="date"
              name="from"
              value={formData.from}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>

        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Currently Pursuing ?</Form.Label>
          </Col>
          <Col lg={1} md={12} sm={12}>
            <Form.Control
              className="d-flex justify-content-start"
              placeholder="location"
              type="checkbox"
              name="location"
              checked={formData.current}
              value={formData.current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !current,
                });
                setDisabled(!toDateDisabled);
              }}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>To</Form.Label>
          </Col>
          <Col lg={2} md={12} sm={12}>
            <Form.Control
              placeholder="to"
              type="date"
              name="to"
              value={formData.to}
              onChange={(e) => handleChange(e)}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Course description</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="description"
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="m-5">
            Submit
          </Button>{" "}
          <Link to="/profile" className="m-5" variant="link">
            <Button variant="link">Back to profile</Button>
          </Link>{" "}
          <Link to="/" className="m-5" variant="link">
            <Button variant="link">Home</Button>
          </Link>{" "}
        </div>
      </Form>{" "}
    </Fragment>
  );
};

Edu.propTypes = {
  setEdu: PropTypes.func.isRequired,
};

export default connect(null, { setEdu })(Edu);
