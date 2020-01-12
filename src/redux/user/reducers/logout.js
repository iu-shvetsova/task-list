export const logout = (state, action) => {
  return { ...state, loggedIn: false };
};
