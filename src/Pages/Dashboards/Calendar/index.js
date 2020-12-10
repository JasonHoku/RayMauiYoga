import React, { Component, Fragment } from "../../../../node_modules/react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { Card, CardBody, Col, Row } from "reactstrap";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

// Examples

import CalendarElements from "./calendar";

//

export default class CalendarPage extends Component {
  render() {
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Card>
            <Row>
              <Col className="colJustText">
                <CardBody>
                  <p>TUESDAY: 8-9am JODO MISSION LAHAINA</p>
                  <p>TUESDAY: 5:30-7PM ISLAND SPIRIT YOGA LAHAINA </p>
                </CardBody>
              </Col>
              <Col>
                <CardBody>
                  <p>FRIDAY: 8-9AM JODO MISSION LAHAINA</p>
                  <p>SATURDAY: 9-10;15AM ISLAND SPIRIT YOGA LAHAINA</p>
                </CardBody>
              </Col>
            </Row>
          </Card>
          <CalendarElements />
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
