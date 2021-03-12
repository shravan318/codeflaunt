import {
  CLEAR_PROFILE,
  GET_PROFILE,
  NO_PROFILE,
  UPDATE_PROFILE,
  GIT_REPOS,
  NO_REPOS,
} from "../actions/constants";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true,
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case NO_PROFILE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GIT_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case NO_REPOS:
      return {
        ...state,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
