import { cardConstants } from "../cards.constants";
import { createReducer } from "../../../helpers/redux";
import { getCardsRequest, getCardsSuccess } from "../reducers/getCards";

const initialState = {
  loading: false,
  cards: [],
  error: undefined,
  totalCardsCount: 0,
  pageNumber: 1,
  sortField: "username",
  sortDirection: "asc"
};

export const cardsReducer = createReducer(initialState, {
  [cardConstants.GET_CARDS_REQUEST]: getCardsRequest,
  [cardConstants.GET_CARDS_SUCCESS]: getCardsSuccess
});
