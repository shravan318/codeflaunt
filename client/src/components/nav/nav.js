import React from "react";
import Avatar from "react-avatar";
import logo from "../img/codeflaunt.png";
import { Container, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap";
import "./nav.css";
import { Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navigation = (props) => {
  return (
    <Container fluid>
      <Navbar expand="lg">
        <Navbar.Brand href="#">
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
                      <Fragment className="navbar-dropdown">
                        <Avatar
                          name={props.auth.user.name}
                          maxInitials="2"
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
                    <NavDropdown.Item href="#action/3.1">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">
                      Settings
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={props.logout}>
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
      </Navbar>
    </Container>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
