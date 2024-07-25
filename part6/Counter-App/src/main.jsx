import React from "react";
import ReactDOM from "react-dom/client";
import App, { store } from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
