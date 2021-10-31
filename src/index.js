import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

import "./Custom.scss";
import reducer, { initialState } from "./Reducer";
import { Context } from "./Context";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Context initialState={initialState} reducer={reducer}>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
