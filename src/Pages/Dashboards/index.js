import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Pages

import HomeDashboard from "./Home/";
import Services from "./Services/";
import ShopPage from "./Shop/";
import GalleryPage from "./Gallery/";
import Writing from "./Writing/";
import Retreats from "./Retreats";
import Videos from "./Videos";
import Blog from "./Blog";
import Contact from "./Contact/";
import Projects from "./Projects/";
import CalendarPage from "./Calendar/";
import Account from "./Account/";
// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions/";

const Dashboards = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}/home`} component={HomeDashboard} />
          <Route path={`${match.url}/services`} component={Services} />
          <Route path={`${match.url}/shop`} component={ShopPage} />
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
