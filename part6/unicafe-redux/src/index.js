import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const dispatchAction = (event) => {
    store.dispatch({
      type: event.target.id.toUpperCase(),
    });
  };

  return (
    <div>
      <button id="GOOD" onClick={dispatchAction}>good</button>
      <button id="OK"  onClick={dispatchAction}>ok</button>
      <button id="BAD"  onClick={dispatchAction}>bad</button>
      <button id="ZERO" onClick={dispatchAction}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
