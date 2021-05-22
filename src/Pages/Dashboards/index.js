import React, { lazy, Fragment } from "react";
import { Route } from "react-router-dom";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
// Pages

const HomeDashboard = lazy(() => import("./Home/"));
const GalleryPage = lazy(() => import("./Gallery/"));
const Contact = lazy(() => import("./Contact/"));
const Account = lazy(() => import("./Account/"));
const Writing = lazy(() => import("./Writing/"));
const CalendarPage = lazy(() => import("./Calendar/"));
const Services = lazy(() => import("./Services/"));
const Projects = lazy(() => import("./Projects/"));
const Retreats = lazy(() => import("./Retreats/"));
const Videos = lazy(() => import("./Videos/"));
const Blog = lazy(() => import("./Blog/"));
// Layout

const Dashboards = ({ match }) => (
	<Fragment>
		<AppHeader />
		<div className="app-main">
			<AppSidebar />
			<div className="app-main__outer">
				<div className="app-main__inner">
					<Route path={`${match.url}/home`} component={HomeDashboard} />
					<Route path={`${match.url}/services`} component={Services} />
					<Route path={`${match.url}/gallery`} component={GalleryPage} />
					<Route path={`${match.url}/writing`} component={Writing} />
					<Route path={`${match.url}/retreats`} component={Retreats} />
					<Route path={`${match.url}/videos`} component={Videos} />
					<Route path={`${match.url}/blog`} component={Blog} />
					<Route path={`${match.url}/contact`} component={Contact} />
					<Route path={`${match.url}/about`} component={Projects} />
					<Route path={`${match.url}/calendar`} component={CalendarPage} />
					<Route path={`${match.url}/account`} component={Account} />
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);

export default Dashboards;
