import React from "react";
import "./nav.css";

import logo from "../img/codeflaunt.png";
import { Navbar } from "react-bootstrap";

export default function Nav() {
  return (
    <div className="pagewrapper">
      <Navbar expand="lg">
        <Navbar.Brand href="#">
          <img
            src={logo}
            height="40"
            className="d-inline-block align-top"
            alt="codeflaunt logo"
          />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
