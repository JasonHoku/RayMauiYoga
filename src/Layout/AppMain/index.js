import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import Loader from "react-loaders";

import { ToastContainer } from "react-toastify";

import { Dashboards } from "../../Pages/Dashboards";


const AppMain = () => {
	return (
		<Fragment>
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<div className="loader-wrapper d-flex justify-content-center align-items-center">
								<Loader color="#c4cfda" type="ball-triangle-path" />
							</div>
							<h2 className="mt-3" style={{ color: "black" }}>
								Loading RayMauiYoga
								<small style={{ color: "black" }}>Welcome</small>
							</h2>
						</div>
					</div>
				}
			>
				<Route component={Dashboards} />
			</Suspense>
			<ToastContainer />
		</Fragment>
	);
};

export default AppMain;
