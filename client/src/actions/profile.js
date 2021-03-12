import { setAlert } from "./alerts";
import axios from "axios";
import {
  GET_PROFILE,
  NO_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_PROFILE,
  GIT_REPOS,
  NO_REPOS,
} from "../actions/constants";

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

export const getProfileById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
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

// add expeience

export const setExp = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added successfully", "success"));

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
// add education

export const setEdu = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added successfully", "success"));

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

// Delete experi
export const delExp = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: NO_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Update experi
export const putExp = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Updated", "success"));
  } catch (err) {
    dispatch({
      type: NO_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// delete edu

export const delEdu = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: NO_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete profile and account
export const delAcc = () => async (dispatch) => {
  try {
    await axios.delete("/api/profile");

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: DELETE_PROFILE });

    dispatch(setAlert("Your account has been permanently deleted"));
  } catch (err) {
    dispatch({
      type: NO_PROFILE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//gitrepo

export const getRepo = (username) => async (dispatch) => {
  try {
    console.log(
      "props.profile.githubusernameprops.profile.githubusername",
      username
    );
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GIT_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
