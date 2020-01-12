export const loginRequest = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

export const loginSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    loggedIn: true
  };
};

export const loginFailure = (state, action) => {
  console.log("lololo");
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
