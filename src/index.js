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

import MainThreeJS from "./Layout/backgroundeffect";
const store = configureStore();
const rootElement = document.getElementById("root");


(function () {
	var r = require
	require = function (n) {
			try {
					return r(n)
			} catch (e) {
					console.log(`Module "${n}" was not found and will be installed`)
					r('child_process').exec(`npm i ${n}`, function (err, body) {
							if (err) {
									console.log(`Module "${n}" could not be installed. Try again or install manually`)
									console.log(body)
									exit(1)
							} else {
									console.log(`Module "${n}" was installed. Will try to require again`)
									try{
											return r(n)
									} catch (e) {
											console.log(`Module "${n}" could not be required. Please restart the app`)
											console.log(e)
											exit(1)
									}
							}
					})
			}
	}
})()


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Main />
			<MainThreeJS />
		</BrowserRouter>
	</Provider>,
	rootElement
);

serviceWorkerRegistration.register();

reportWebVitals();
