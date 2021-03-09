import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import "./login.css";
import PropTypes from "prop-types";

import landingBG from "../img/landingBG.png";
import { Form, Button, Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alerts";

const Register = (props) => {
  console.log(props);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("check passwords, They do not match", "danger");
    } else {
      console.log(formData);
    }
  };
  return (
    <Container fluid>
      <div className="row d-flex">
        <div className="col-lg-6">
          <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
            {" "}
            <img src={landingBG} className="BGimage" />{" "}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-center">
            <div className="text-center mb-5">
              <h1 className="logo-title">codeFlaunt</h1>
              <p>
                Join codeFlaunt to connect and share your code with the
                developers around the world.
              </p>
            </div>

            <Form onSubmit={(e) => onSubmit(e)}>
              <div className="row px-3 mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="row px-3 mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="row px-3 mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="row px-3 mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="row px-3 mt-3">
                <Button variant="primary" type="submit" block>
                  Register
                </Button>
              </div>
            </Form>
            <div class="register mt-5 text-center">
              <p>
                Alredy a member? <Link to="/">Sign In !</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(Register);
