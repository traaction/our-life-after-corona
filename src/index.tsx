import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
