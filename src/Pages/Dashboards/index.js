import React, { lazy, Fragment } from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect,
} from "react-router-dom";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
// Pages

const HomeDashboard = lazy(() => import("./Home/"));
const GalleryPage = lazy(() => import("./Gallery/"));
const Contact = lazy(() => import("./Contact/"));
const Account = lazy(() => import("./Account/"));
const Writing = lazy(() => import("./Writing/"));
const CalendarPage = lazy(() => import("./Calendar/calendarPage"));
const Services = lazy(() => import("./Services/"));
const Projects = lazy(() => import("./Projects/"));
const Retreats = lazy(() => import("./Retreats/"));
const Videos = lazy(() => import("./Videos/"));
const Blog = lazy(() => import("./Blog/"));
// Layout

export function Dashboards({ match }) {
	return (
		<Fragment>
			<AppHeader />
			<div className="app-main">
				<AppSidebar />
				<div className="app-main__outer">
					<div className="app-main__inner">
						<Switch>
							<Route exact path={`/`} component={HomeDashboard} />
							<Route path={`/services`} component={Services} />
							<Route path={`/gallery`} component={GalleryPage} />
							<Route path={`/writing`} component={Writing} />
							<Route path={`/retreats`} component={Retreats} />
							<Route path={`/videos`} component={Videos} />
							<Route path={`/blog`} component={Blog} />
							<Route path={`/contact`} component={Contact} />
							<Route path={`/about`} component={Projects} />
							<Route path={`/calendar`} component={CalendarPage} />
							<Route path={`/account`} component={Account} />
							<Redirect to="/" />
						</Switch>
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	);
}
