import { baseURL } from "../../../constants/api.constants";
import { cardConstants } from "../cards.constants";

export const getCards = (
  pageNumber = 1,
  sortField = "username",
  sortDirection = "asc"
) => {
  return dispatch => {
    dispatch(request());
    return getCardsService(pageNumber, sortField, sortDirection).then(
      answer => {
        if (answer.status === "ok") {
          dispatch(
            success(answer.message, pageNumber, sortField, sortDirection)
          );
        } else {
          dispatch(failure(answer.message));
        }
      }
    );

    function request() {
      return { type: cardConstants.GET_CARDS_REQUEST };
    }

    function success(cardsInfo, pageNumber, sortField, sortDirection) {
      return {
        type: cardConstants.GET_CARDS_SUCCESS,
        cardsInfo,
        pageNumber,
        sortField,
        sortDirection
      };
    }

    function failure(error) {
      return { type: cardConstants.GET_CARDS_FAILURE, error };
    }
  };
};

async function getCardsService(pageNumber, sortField, sortDirection) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const query = `${baseURL}/?developer=Name&sort_field=${sortField}&sort_direction=${sortDirection}&page=${pageNumber}`;

  const data = await fetch(query, requestOptions);
  const answer = await data.json();
  return answer;
}
