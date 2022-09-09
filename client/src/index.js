import App from "./App";
import axios from "axios";
import React from "react";
import store from "./redux/store/index";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// require("dotenv").config();

axios.defaults.baseURL = process.env.REACT_APP_API || "https://back-finalproject.herokuapp.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_DOMAIN || "dev-ugkr2ec1.us.auth0.com"}
          clientId={
            process.env.REACT_APP_CLIENT_ID ||
            "P1mwQ32Q0Gf86JB9GAK9BlVW4WTvNBc4"
          }
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
