import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setExp } from "../../actions/profile";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddExp = (props) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
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
    props.setExp(formData, props.history);
  };
  return (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <h5>Work Experience</h5>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Company</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="Company"
              type="text"
              name="company"
              value={formData.company}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Job Title</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row className="d-flex align-items-center my-4">
          <Col lg={2} md={12} sm={12}>
            <Form.Label>Job location</Form.Label>
          </Col>
          <Col lg={10} md={12} sm={12}>
            <Form.Control
              placeholder="location"
              type="text"
              name="location"
              value={formData.location}
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
            <Form.Label>Still Working ?</Form.Label>
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
            <Form.Label>Job description</Form.Label>
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

AddExp.propTypes = {
  setExp: PropTypes.func.isRequired,
};

export default connect(null, { setExp })(AddExp);
