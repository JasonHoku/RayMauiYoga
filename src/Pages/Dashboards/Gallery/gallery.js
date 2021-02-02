import React, { Component, Fragment } from "../../../../node_modules/react";
import scriptLoader from "../../../../node_modules/react-async-script-loader";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "../../../../node_modules/classnames";
import ReactTable from "../../../../node_modules/react-table";
import { Route } from "../../../../node_modules/react-router-dom";
import CarouselBSExample from "./Carousel";

import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardLink,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
} from "../../../../node_modules/reactstrap";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
} from "../../../../node_modules/recharts";

import PerfectScrollbar from "../../../../node_modules/react-perfect-scrollbar";

import {
  faAngleUp,
  faDotCircle,
  faAngleDown,
  faStrikethrough,
} from "../../../../node_modules/@fortawesome/free-solid-svg-icons";

import { makeData } from "../../Tables/DataTables/Examples/utils";

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

function boxMullerRandom() {
  let phase = true,
    x1,
    x2,
    w;

  return (function () {
    if (phase) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}



export default class GalleryElements extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11",
    };
  }

  toggle2(tab) {
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab,
      });
    }
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

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
          <Row
            style={{
              alignContent: "center",
              justifyContent: "center",
              marginTop: "-15px",
              marginBottom: "-15px",

              textAlign: "center",
            }}
            width="100%"
          >
            <CardTitle
              style={{
                textAlign: "center",
                borderRadius: "25px",
                backgroundColor: "#440066BB",
                paddingRight: "10px",
                paddingLeft: "10px",
                fontWeight: "900",
                color: "whitesmoke",
                fontSize: "36px",
              }}
            >
              Galleria
            </CardTitle>
          </Row>
          <br />
          <Row style={{ justifyContent: "center" }}>
            <Col width="100%" style={{ maxWidth: "750px" }}>
              <Card>
                <CardBody>
                  <p></p>{" "}
                  <center>
                    <CarouselBSExample />
                  </center>
                  <center>
                    ← Slideshow →
                    <br />
                  </center>{" "}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br></br>

          <Row>
            <Col xs="6" sm="4" md="4" xl="3">
              <a href="/#/dashboards/about">
                <Card>
                  <CardHeader>Explore</CardHeader>
                  <CardBody> An Eye-Opening Experience</CardBody>
                </Card>
              </a>
            </Col>

            <Col style={{ marginTop: "10px" }} xs="6" sm="4" md="3" xl="4">
              <a href="/#/dashboards/about">
                <Card>
                  <CardHeader>Learn More</CardHeader>
                  <CardBody>Discover RayMauiYoga Events.</CardBody>
                </Card>
              </a>
            </Col>

            <Col style={{ marginTop: "15px" }} xs="7" sm="4" md="4" xl="5">
              <a href="#/dashboard/contact">
                <Card>
                  <CardHeader>Contact</CardHeader>
                  <CardBody>
                    For questions, comments or concerns, reach out at the
                    contact page.
                  </CardBody>
                </Card>
              </a>
            </Col>
          </Row>
          <br></br>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
