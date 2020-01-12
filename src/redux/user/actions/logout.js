import { userConstants } from "../user.constants";
import { setCookie } from "../../../helpers/cookie";

export const logout = () => {
  return dispatch => {
    setCookie("token", "");
    dispatch({
      type: userConstants.USER_LOGOUT
    });
  };
};
