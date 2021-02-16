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
                  <center>
                    <table border="1" cellpadding="1" cellspacing="1">
                      <tbody>
                        <tr>
                          <td style={{ padding: "25px" }}>
                            <p>
                              {" "}
                              <strong>Wednesday</strong>:{" "}
                              <strong>7:30-8:30am</strong>&nbsp;JODO MISSION
                              LAHAINA
                            </p>

                            <p>
                              <strong>TUESDAY</strong>:&nbsp;
                              <strong>5:30-7PM</strong>&nbsp;ISLAND SPIRIT YOGA
                              LAHAINA
                            </p>
                          </td>
                          <td style={{ padding: "25px" }}>
                            <p>
                              <strong>FRIDAY</strong>:{" "}
                              <strong>7:30am-8:30amAM</strong>&nbsp;JODO MISSION
                              LAHAINA
                            </p>

                            <p>
                              <strong>SATURDAY</strong>:&nbsp;
                              <strong>9-10:15AM</strong>&nbsp;ISLAND SPIRIT YOGA
                              LAHAINA
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </center>
                  <p>&nbsp;</p>
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
