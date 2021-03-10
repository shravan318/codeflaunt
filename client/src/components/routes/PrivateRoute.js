import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import setAuthToken from "../../utils/authToken";
import { loadUser } from "../../actions/auth";
import { LOGOUT } from "../../actions/constants";
import store from "../../store";
import CustomSpinner from "../spinner/Spinner";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <CustomSpinner />
        ) : isAuthenticated ? (
          <Container>
            <Component {...props} />
          </Container>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
