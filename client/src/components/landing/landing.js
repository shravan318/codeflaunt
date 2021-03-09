import React, { Fragment } from "react";
import "./landing.css";

import landingBG from "../img/landingBG.png";
import { Form, Button, Container, Jumbotron } from "react-bootstrap";

export default function landing() {
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
                Code Flaunt helps you connect and share code with the developers
                around the world.
              </p>
            </div>
            <div className="row px-3">
              {" "}
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </div>
            <div className="row px-3">
              {" "}
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </div>

            <div className="row mb-3 px-3 mt-3">
              {" "}
              <Button variant="primary" type="submit" block>
                Login
              </Button>{" "}
            </div>
            <div class="register mt-5 text-center">
              <p>
                Not a member? <a href="#">Create an account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
