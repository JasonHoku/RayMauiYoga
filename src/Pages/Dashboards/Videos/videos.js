import React, { Component, Fragment } from "react";
import scriptLoader from "react-async-script-loader";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import ReactTable from "react-table";
import { Route } from "react-router-dom";
import Vimeo from "@u-wave/react-vimeo";

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
} from "reactstrap";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  faAngleUp,
  faDotCircle,
  faAngleDown,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";

import { Sparklines, SparklinesCurve } from "react-sparklines";

import { makeData } from "../../Tables/DataTables/Examples/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";

import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../assets/utils/images/avatars/3.jpg";
import contrastus from "../../../assets/images/contrastus.png";
import collage from "../../../assets/images/collage.png";
import mandalashirt from "../../../assets/images/mandalashirt.png";

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

export default class MusicElements extends Component {
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
            <Card
              className="main-card mb-3"
              style={{
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              }}
            >
              <CardHeader className="card-header-tab" color="light">
                <div className="card-header-title font-size-lg font-weight-normal">
                  <i className="header-icon pe-7s-star mr-3 text-muted opacity-6">
                    {" "}
                  </i>
                  Update: 12/10/20
                </div>{" "}
                <div>
                  {" "}
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </CardHeader>
              <CardBody>
                Videos Coming Soon
                <Vimeo video="477795668" autoplay />
                <br></br>
              </CardBody>
            </Card>
          </Row>
          <br></br>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
