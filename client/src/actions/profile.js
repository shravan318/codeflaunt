import { SET_ALERT, REMOVE_ALERT } from "./constants";
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
