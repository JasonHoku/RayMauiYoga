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

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
const sampleData2 = randomData(15);
const sampleData3 = randomData(8);
const sampleData4 = randomData(12);
console.info({
  sampleData,
  sampleData2,
  sampleData3,
  sampleData4,
});

export default class GalleryElements extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11",
      data: makeData(),
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
    const { data } = this.state;

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
          <Row>
            <Card>
              <CardBody>
                <p>Galleria RayMauiYoga</p>
              </CardBody>
              <CardBody className="CarouselCard">
                <CarouselBSExample />
              </CardBody>
            </Card>
            <br></br>
          </Row>
          <br></br>
          <Row>
            <Card>
              <CardHeader>Explore</CardHeader>
              <CardBody>
                An Eye-
                <br /> Opening <br />
                Experience{" "}
              </CardBody>
            </Card>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#/dashboard/contact">
              <Card style={{ width: "min-content" }}>
                <CardHeader>Contact</CardHeader>
                <CardBody>
                  RayMauiYoga Contact Page.
                  <br></br>
                </CardBody>
              </Card>
            </a>
          </Row>
          <br></br>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
