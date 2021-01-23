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
              <h1>Events</h1>
            </Row>
            <Row>
              <Col className="colJustText">
                <CardBody>
                  <p>
                    <b>TUESDAY</b>: <b>8-9am</b> JODO MISSION LAHAINA
                  </p>
                  <p>
                    <b>TUESDAY</b>: <b>5:30-7PM</b> ISLAND SPIRIT YOGA LAHAINA{" "}
                  </p>
                </CardBody>
              </Col>
              <Col>
                <CardBody>
                  <p>
                    <b>FRIDAY</b>: <b>8-9AM</b> JODO MISSION LAHAINA
                  </p>
                  <p>
                    <b>SATURDAY</b>: <b>9-10:15AM</b> ISLAND SPIRIT YOGA LAHAINA
                  </p>
                </CardBody>
              </Col>
            </Row>
            <div style={{ height: "600px" }}>
              <CalendarElements />
            </div>
            <span style={{ textAlign: "center" }}>
              Please reach out through the contact page for more information.
            </span>
          </Card>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
