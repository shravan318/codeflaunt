import React from "react";
import Avatar from "react-avatar";
import logo from "../img/codeflaunt.png";
import { Container, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap";
import "./nav.css";
import { Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSlidersH,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  return (
    <Fragment fluid>
      <Navbar expand="lg" bg="light">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="codeflaunt logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {!props.auth.loading && (
                <Fragment>
                  {props.auth.isAuthenticated && props.auth.user !== null ? (
                    <NavDropdown
                      title={
                        <Fragment>
                          <Avatar
                            name={props.auth.user.name}
                            maxInitials={2}
                            color="#1a1a1a"
                            fgColor="#ffffff"
                            size="30px"
                            round="50px"
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span>{props.auth.user.name}</span>
                        </Fragment>
                      }
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item href="/profile">
                        <FontAwesomeIcon
                          style={{ marginRight: "10px" }}
                          icon={faUserCircle}
                        />
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/settings">
                        <FontAwesomeIcon
                          style={{ marginRight: "10px" }}
                          icon={faSlidersH}
                        />
                        Settings
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={props.logout}>
                        <FontAwesomeIcon
                          style={{ marginRight: "10px" }}
                          icon={faSignOutAlt}
                        />
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Spinner />
                  )}
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
