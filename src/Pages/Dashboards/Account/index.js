import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Container,
  Input,
  FormText,
  CardHeader,
  CardLink,
  CardImg,
  NavLink,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";

// Examples

import AccountElements from "./account";
import AdminElements from "./admin";
import ModeratorElements from "./moderator";
import LoginPageElements from "./loginPage";
//

var CLIIP;

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("https://api.ipify.org")
      .then((response) => response.text())
      .then((response) => {
        CLIIP = response;
      })
      .then(function (parsedData) {})
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    let adminCardEle;
    if (localStorage.getItem("jwt") == null) {
      {
        adminCardEle = (
          <Col>
            <LoginPageElements />
          </Col>
        );
      }
    }
    if (localStorage.getItem("jwt") != null) {
      adminCardEle = (
        <Row>
          <Col>
            <AccountElements />
          </Col>
        </Row>
      );
    }
    if (
      (localStorage.getItem("jwt") != null &&
        localStorage.getItem("username") == "microAdmin2") ||
      window.location == "http://localhost:9999/#/dashboards/account"
    ) {
      adminCardEle = <AdminElements />;
    }
    if (
      (localStorage.getItem("jwt") != null &&
        localStorage.getItem("username") == "microAdmin") ||
      localStorage.getItem("username") == "raymauiyoga"
    ) {
      adminCardEle = (
        <span
          style={{
            backgroundColor: "transparent",
            width: "100%",
            justifyContent: "center",
            alignSelf: "center",
            opacity: 100,
          }}
        >
          <ModeratorElements />
        </span>
      );
    }
    return <Fragment>{adminCardEle}</Fragment>;
  }
}
