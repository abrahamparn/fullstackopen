import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import noteService from "../services/notes";
import App from "./App";
import noteReducer, { createNote, appendNote, setNotes } from "../noteReducer";
import filterReducer, { filterChange } from "../reducers/filterReducer";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
