import React, { Component, Fragment } from "react";
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
  faAlignCenter,
} from "@fortawesome/free-solid-svg-icons";

import { Sparklines, SparklinesCurve } from "react-sparklines";

import { makeData } from "../../../Tables/DataTables/Examples/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";

import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../../assets/utils/images/avatars/3.jpg";
import servicespic from "../../../../assets/images/thumbs/services.png";
import aboutpic from "../../../../assets/images/thumbs/about.png";
import publishingpic from "../../../../assets/images/thumbs/publishing.png";
import shoppic from "../../../../assets/images/thumbs/shop.png";
import audiopic from "../../../../assets/images/thumbs/audio.png";
import visualpic from "../../../../assets/images/thumbs/visual.jpg";
import logo from "../../../../assets/images/logoani.gif";
import Main from "../../../Main";
import CenterMode from "../../../Components/Carousel/Examples/Slideshow/CenterMode";
import { setBackgroundImage } from "../../../../reducers/ThemeOptions";

export default class CRMDashboard2 extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //doing some asynchronous call here which dispatches an action
    //and updates the state -> which inturn renders the component again.
    //I want component to be rendered after this happended. Is it possible ?

    let clientWidth = Math.min(
      window.innerWidth,
      document.documentElement.clientWidth
    );
    let logoWidth = null;
    let galleryPos = clientWidth;

    if (clientWidth <= "800") {
      logoWidth = clientWidth * 0.5;
      galleryPos = 25;
    }
    if (clientWidth >= "800" && clientWidth <= "1400") {
      logoWidth = clientWidth * 0.4;
      galleryPos = 100;
    }
    if (clientWidth > "1400") {
      logoWidth = clientWidth * 0.4;
      galleryPos = String(clientWidth / 6);
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
          <center>
            <meta
              name="description"
              content="MauiYogaRay.com, software development, e-commerce, education and services."
            />
          </center>
          <Row
            style={{
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          > <Card
          className="main-card mb-3"
          style={{
            boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
          }}
        >
          <CardHeader className="card-header-tab" color="light">
            <div className="card-header-title font-size-lg font-weight-normal">
              <i className="header-icon pe-7s-tools mr-3 text-muted opacity-6">
                {" "}
              </i>
              MauiYogaRay Under Construction
            </div>{" "}
            <div>
              {" "}
              <br></br>
              <br></br>
              <br></br>
            </div>
          </CardHeader>
          <CardBody>
            
            <p> <a href="https://dashboardpack.com/live-demo-preview/?livedemo=113&v=7516fd43adaa"> Template Examples</a></p>
 <p> <a href="https://github.com/JasonHoku/MauiYogaRay" > Site Source Code</a></p>        
          </CardBody>
        </Card> &nbsp;&nbsp;&nbsp;
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
                    Update: 8/17/20
                  </div>{" "}
                  <div>
                    {" "}
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                </CardHeader>
                <CardBody>
                  Private Video Example
                  <Vimeo video="477795668" autoplay />
                  <br></br>
                </CardBody>
              </Card>
          </Row>

          <Card
            className="main-card mb-3"
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            <CardHeader className="card-header-tab">
              <div className="card-header-title font-size-lg font-weight-normal">
                <i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
                  {" "}
                </i>
                BIO
              </div>{" "}
              <div> </div>
            </CardHeader>
            <CardBody>
              <p>
                Yoga is for everyone. It is the belief that guides Ray’s
                teaching. Whether it be a gentle class, a rockin’, vigorous
                practice, meditation, or private session, everyone has the
                capacity to explore themselves through yoga. Ray’s classes are
                focused, light-hearted, and designed to challenge student’s
                physical, mental and spiritual qualities.
              </p>
              <p>
                Ray, a lifetime athlete, discovered yoga in a gym class 20 years
                ago. He was intrigued at how yoga both strengthened and softened
                him. Ray has studied and practiced with a variety of teachers
                from Iyengar, Ashtanga, Hatha and Anusara traditions and began
                teaching in 2007. He continues to discover and explore how the
                qualities and values of yoga practice can help us with the
                practice of living.
              </p>
              <p>
                Ray has taught public classes, private sessions, yoga for
                seniors, yoga for kids, and yoga for athletes. He has taught
                workshops, in school settings, at Buddhist temples and at the
                beach.
              </p>
              <p>
                Ray loves living on Maui. He is grateful to teach in such a
                beautiful setting. Ray tries to get to the beach every day and
                when he is successful you will find him swimming, surfing or
                hanging with his family. He enjoys practicing yoga, jiu-jitsu,
                and writing.
              </p>
              <p>
                Ray is the proud father of his son Taj, dog Nala and four
                chickens.
              </p>
              <br></br>
              <br></br>
              <br></br>
            </CardBody>
          </Card>

          <Row></Row>

          <Card
            className="main-card mb-3"
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            <CardHeader className="card-header-tab">
              <div className="card-header-title font-size-lg font-weight-normal">
                <i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
                  {" "}
                </i>
                Update: 6/15/20
              </div>{" "}
              <div> </div>
            </CardHeader>
            <CardBody>
              <br></br>
            </CardBody>
          </Card>
          <Row></Row>

          <Card
            className="main-card mb-3"
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            <CardHeader className="card-header-tab">
              <div className="card-header-title font-size-lg font-weight-normal">
                <i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
                  {" "}
                </i>
                Update: 64/15/20
              </div>{" "}
              <div> </div>
            </CardHeader>
            <CardBody>
              <br></br>
            </CardBody>
          </Card>
          <Row></Row>

          <Card
            className="main-card mb-3"
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            <CardHeader className="card-header-tab">
              <div className="card-header-title font-size-lg font-weight-normal">
                <i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
                  {" "}
                </i>
                Update: 2/15/20
              </div>{" "}
              <div> </div>
            </CardHeader>
            <CardBody>
              <br></br>
            </CardBody>
          </Card>

          <Row></Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
