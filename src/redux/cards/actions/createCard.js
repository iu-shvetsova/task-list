import { baseURL, endpoints } from "../../../constants/api.constants";
import { cardConstants } from "../cards.constants";
import { message } from "antd";

export const createCard = newData => {
  return dispatch => {
    dispatch(request());
    return createCardService(newData).then(answer => {
      if (answer.status === "ok") {
        dispatch(success());
        message.success("Задача добавлена");
      } else {
        dispatch(failure());
        message.error("Ошибка добавления");
      }
    });

    function request() {
      return { type: cardConstants.CREATE_CARD_REQUEST };
    }

    function success() {
      return { type: cardConstants.CREATE_CARD_SUCCESS };
    }

    function failure() {
      return { type: cardConstants.CREATE_CARD_FAILURE };
    }
  };
};

async function createCardService(newData) {
  const body = new FormData();
  body.append("username", newData.username);
  body.append("email", newData.email);
  body.append("text", newData.text);

  const requestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
    body
  };

  const query = `${baseURL}${endpoints.createTask}/?developer=Name`;

  const data = await fetch(query, requestOptions);
  const answer = await data.json();
  return answer;
}
