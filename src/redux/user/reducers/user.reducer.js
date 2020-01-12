import { userConstants } from "../user.constants";
import { createReducer } from "../../../helpers/redux";
import { loginRequest, loginSuccess, loginFailure } from "./login";
import { logout } from "./logout";
import { getCookie } from "../../../helpers/cookie";

const initialState = {
  loading: false,
  loggedIn: getCookie("token") ? true : false,
  error: ""
};

export const userReducer = createReducer(initialState, {
  [userConstants.USER_LOGIN_REQUEST]: loginRequest,
  [userConstants.USER_LOGIN_SUCCESS]: loginSuccess,
  [userConstants.USER_LOGIN_FAILURE]: loginFailure,
  [userConstants.USER_LOGOUT]: logout
});
