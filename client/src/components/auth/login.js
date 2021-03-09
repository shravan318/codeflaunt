import React, { useState } from "react";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth";

import landingBG from "../img/landingBG.png";
import { Form, Button, Container } from "react-bootstrap";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    props.loginUser(email, password);
  };
  //check for login or not

  if (props.isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <Container fluid>
      <div className="row d-flex">
        <div className="col-lg-6">
          <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
            {" "}
            <img src={landingBG} className="BGimage" alt="landingbg" />{" "}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-center">
            <div className="text-center mb-5">
              <h1 className="logo-title">codeFlaunt</h1>
              <p>
                codeFlaunt helps you connect and share code with the developers
                around the world.
              </p>
            </div>
            <Form onSubmit={(e) => onSubmit(e)}>
              <div className="row px-3 mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  type="email"
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
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="row mb-3 px-3 mt-3">
                {" "}
                <Button variant="primary" type="submit" block>
                  Login
                </Button>{" "}
              </div>
            </Form>
            <div className="register mt-5 text-center">
              <p>
                Not a member? <Link to="/register">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
