import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./polyfills";

import "core-js";

import "core-js/features/set";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { Router } from "react-router-dom";
import "./App.scss";
import Main from "./Pages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import "./Layout/backgroundeffect";
const store = configureStore();
const rootElement = document.getElementById("root");

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	</Provider>,
	rootElement
);

serviceWorkerRegistration.register();

reportWebVitals();
