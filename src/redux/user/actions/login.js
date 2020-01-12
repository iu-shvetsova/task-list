import { userConstants } from "../user.constants";
import { setCookie } from "../../../helpers/cookie";
import { message } from "antd";
//////////////////// ВХОД //////////////////////
export const login = (username, password) => {
  return async function(dispatch) {
    dispatch(request());

    const answer = await loginService(username, password);
    if (answer && answer.status === "ok") {
      setCookie("token", answer.message.token, {
        expires: 3600 * 24
      });
      message.success("Вход выполнен");
      dispatch(success());
    } else {
      message.error(answer.message.password);
      dispatch(failure(answer.message.password));
    }
  };

  function request() {
    return { type: userConstants.USER_LOGIN_REQUEST };
  }
  function success() {
    return { type: userConstants.USER_LOGIN_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.USER_LOGIN_FAILURE, error };
  }
};

//////////////// СЕРВИС //////////////////////////////////
async function loginService(username, password) {
  var form = new FormData();
  form.append("username", username);
  form.append("password", password);

  const options = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
    body: form
  };

  // получаем токен
  const loginInfoResponse = await fetch(
    "https://uxcandy.com/~shapoval/test-task-backend/v2/login/?developer=Example",
    options
  );
  const answer = await loginInfoResponse.json();
  return answer;
}
