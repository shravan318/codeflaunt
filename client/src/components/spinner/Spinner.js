import React from "react";
import { Spinner } from "react-bootstrap";
import "./spinner.css";

const CustomSpinner = () => {
  return (
    <div className="spinner-bg">
      <div className="spinner-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};
export default CustomSpinner;
