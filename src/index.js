import "./polyfills";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";

import { Route } from "react-router-dom";

import { HashRouter } from "react-router-dom";
import "./App.scss";
import Main from "./Pages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import LoginRedirect from "./Login/LoginRedirect";

import reportWebVitals from "./reportWebVitals";
const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
        <Route path="/connect/google/redirect" component={LoginRedirect} />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

reportWebVitals();
renderApp(Main);

