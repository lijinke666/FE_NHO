//项目的 store 注入了 所有的 reducer 和异步中间键
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux"; //新版不再像 之前 syncHistoryWithStore 的用法,而是改成了中间键
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
