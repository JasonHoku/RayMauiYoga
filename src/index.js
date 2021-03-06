import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./polyfills";

import "core-js";

import "core-js/features/set";

import React from "react";
import ReactDOM from "react-dom";

import { Route } from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { HashRouter } from "react-router-dom";
import "./App.scss";
import Main from "./Pages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import LoginRedirect from "./Login/LoginRedirect";
import reportWebVitals from "./reportWebVitals";

import "./Layout/backgroundeffect";
const store = configureStore();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Main />
      <Route path="/connect/google/redirect" component={LoginRedirect} />
    </HashRouter>
  </Provider>,
  rootElement
);

serviceWorkerRegistration.register();

reportWebVitals();
