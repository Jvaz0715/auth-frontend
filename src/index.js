import React from "react";
import ReactDOM from "react-dom";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import "./_base.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

/*

we bring in our app, base.css index.css, this is where all we worked on finally ends up (note: notice there is no export on this as all exported components will eventually end up here)

*/ 