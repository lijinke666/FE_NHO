
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux"; 
import logger from "redux-logger";
import thunk from "redux-thunk";
import history from "libs/history";


//reducers
import reducers from "reducers";

const store = createStore(
  reducers,
  compose(applyMiddleware(routerMiddleware(history), thunk, logger))
);

export default store;
