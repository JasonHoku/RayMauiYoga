import React, { Component, Fragment } from "react";
import {TransitionGroup} from "react-transition-group";

import PageTitleAlt2 from "../../../Layout/AppMain/PageTitleAlt2";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

// Examples
import CRMDashboard1 from "./Examples/Variation1";
import CRMDashboard2 from "./Examples/Variation2";


//

export default class HomeDashboard extends Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
          transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>

           <PageTitleAlt2 heading="RayMauiYoga Design, Engineering &amp; Services | Website Application Development, Music, Graphic Arts, Apparel, Discussion &amp; Modern Arts Collective Non-Profit of West Maui, Hawaii"
            subheading="RayMauiYoga Design, Engineering &amp; Services | Website Application Development, Music, Graphic Arts, Apparel, Discussion &amp; Modern Arts Collective Non-Profit of West Maui, Hawaii"/>
            <CRMDashboard2 />
                 </TransitionGroup>
      </Fragment>
    )

  }
}
