import { setAlert } from "./alerts";
import axios from "axios";
import { GET_PROFILE, NO_PROFILE } from "../actions/constants";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_PROFILE,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
//\ create profile / update profile

export const setProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  console.log("formDataformDataformDataformData", formData);
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "profile updated" : "profile created", "success"));

    history.push("/profile");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: NO_PROFILE,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
