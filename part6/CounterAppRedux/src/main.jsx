import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CounterContextProvider } from "./utils/CounterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CounterContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CounterContextProvider>
);
