import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

import "./App.css";
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};
export const store = createStore(counterReducer);
function App() {
  return (
    <>
      <div>
        <p>{store.getState()}</p>
      </div>
      <div>
        <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
          ADD
        </button>
        <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
          MINUS
        </button>
        <button onClick={(e) => store.dispatch({ type: "ZERO" })}>ZERO</button>
      </div>
    </>
  );
}

export default App;
