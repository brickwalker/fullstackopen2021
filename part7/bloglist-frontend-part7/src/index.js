import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import messageReducer from "./reducers/messageReducer";
import usersReducer from "./reducers/usersReducer";
import App from "./App";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  message: messageReducer,
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
