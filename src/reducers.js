import HomeReducer from "Home/reducer";
import PaperQuestionReducer from "app/routes/paperQuestion/reducer"

import { combineReducers } from "redux";

const chatReducer = combineReducers({
  HomeReducer,
  PaperQuestionReducer
});

export default chatReducer;
