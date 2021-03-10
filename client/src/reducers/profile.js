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
      return {
        ...state,
        profiole: action.payload,
        loading: false,
      };

    case NO_PROFILE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default profileReducer;
