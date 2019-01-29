import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [routeMiddleware];

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);
export { store, history };
