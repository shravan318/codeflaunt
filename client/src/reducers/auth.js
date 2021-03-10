import {
  REGISTERATION_FAILURE,
  REGISTERATION_SUCCESS,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTERATION_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTERATION_FAILURE:
    case AUTH_FAILED:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
}
export default authReducer;
