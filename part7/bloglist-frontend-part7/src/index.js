import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import messageReducer from "./reducers/messageReducer";
import App from "./App";

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  message: messageReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
