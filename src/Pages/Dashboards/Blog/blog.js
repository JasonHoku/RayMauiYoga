import React, { Component, Fragment } from "react";
import scriptLoader from "react-async-script-loader";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import ReactTable from "react-table";
import { Route } from "react-router-dom";

import CKEditor from "ckeditor4-react";

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
  Input,
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



export default class BlogElements extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      content: "Hello World",
      activeTab1: "11",
    };
    this.setContent = this.setContent.bind(this);
  }

  //------ Test for race condition ------ //
  setContent() {
    this.setState({
      content: "Hello World " + Math.random(),
    });
  }

  onChange(evt) {}

  onBlur(evt) {}

  afterPaste(evt) {}

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
              textAlign: "center",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                width: "90%",
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                height: "80vh",
              }}
            >
              <CardHeader>
                <h1>Blog Explorer</h1>
              </CardHeader>
              <CardHeader style={{ width: "100%", justifyContent: "center" }}>
                <Button> A </Button> &nbsp;&nbsp;&nbsp;
                <Button> B </Button> &nbsp;&nbsp;&nbsp;
                <Button> C </Button> &nbsp;&nbsp;&nbsp;
                <Button> ... </Button>
              </CardHeader>
              <TabContent>
                {" "}
                <TabPane id="1">
                  <Card>
                    <CardBody>
                      {" "}
                      Recent Updates, Written Articles &amp; Notifications
                      Coming Soon.
                    </CardBody>
                  </Card>{" "}
                </TabPane>
              </TabContent>
            </Card>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
