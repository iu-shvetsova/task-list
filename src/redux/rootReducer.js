import { combineReducers } from "redux";

import { cardsReducer } from "./cards/reducers/cards.reducer";
import { userReducer } from "./user/reducers/user.reducer";

const rootReducer = combineReducers({
  cardsReducer,
  userReducer
});

export default rootReducer;
