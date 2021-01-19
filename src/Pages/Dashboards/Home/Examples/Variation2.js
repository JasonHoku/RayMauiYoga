import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import ReactTable from "react-table";
import { Route } from "react-router-dom";
import CarouselBSExample from "./HomeCarousel";

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
  CardLink,
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

export default class CRMDashboard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: "hiddenText",
    };
  }

  componentDidMount() {
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
          <Row
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              className="main-card mb-3"
              style={{
                width: "75%",
                maxWidth:"750px",
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              }}
            >
              <CardHeader className="card-header-tab" color="light">
                <div className="card-header-title font-size-lg font-weight-normal">
                  <i className="header-icon pe-7s-tools mr-3 text-muted opacity-6">
                    {" "}
                  </i>
                  RayMauiYoga Under Construction
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  RayMauiYoga, study and connect with the self, through Ray's
                  Live, Written, &amp; Video Events.
                </p>
                <p>
                  {" "}
                  <a href="https://github.com/JasonHoku/RayMauiYoga">
                    Open-Source
                  </a>
                </p>
              </CardBody>
              <CardBody
                style={{
                  maxWidth: "500px",
                  textAlign: "center  ",
                  alignSelf: "center",
                }}
              >
                <CarouselBSExample />
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
                Strength in Surrender
              </div>{" "}
              <div> </div>
            </CardHeader>
            <CardBody
              onMouseOver={() =>
                this.setState({ hover: "visibleText" }) &
                (document.getElementsByClassName("xd123")[0].hidden = true)
              }
              id={this.state.hover}
            >
              <p>
                Isvara Pranidhana is one of yogas niyamas (positive observances)
                that we practice to cultivate more healthy living, a positive
                outlook and a liberated state of existence. Isvara translates as
                “supreme being”, “ultimate reality”, “true self” or dare I say
                “God” (the God that resides within, of course)! Pranidhana is to
                “dedicate”, “devote” or “surrender”. Thus, a dedication or
                devotion to our true self, ultimate reality, or God.. In Western
                terms we often find the word “surrender” or “letting go” as a
                more neat and clean translation for Isvara Pranidhana. And in
                Western terms this act of “surrender” has certainly become quite
                cliche in spiritual dialogue.
              </p>
              <p>
                Surrender doesn’t seem to invoke much courage, strength or power
                on the surface. However, in yoga tradition surrender is NOT
                giving up. Surrender is NOT weak or passive. Surrender is NOT
                throwing up our arms and raising the white flag. Surrender is
                NOT allowing something outside ourselves to determine our
                condition. What this niyama teaches us is to be driven by our
                intention and focus, to take actions that we hold with the
                highest integrity, to align with the divine. Then, and only then
                do we surrender any expectations or attachments we might have to
                the highest; the best we can and the best we know how.
              </p>{" "}
              <p>
                Isvara Pranidhana is perhaps the most courageous act we can do.
                When we can fully integrate our thoughts, deeds and actions
                through mindful and attentive living, and in that, let go of our
                small self (ego), we begin to shed what limits us. Doors open
                that were otherwise closed, synchronicities abound, and we find
                our way with less resistance and more freedom. We’ve all had
                glimpses at one time or another: doing our work only for the joy
                of doing the work, practicing a pose for years until we
                celebrate, “I did It!”, committing to a relationship and
                discovering deeper, wonderful layers to it, teaching a child
                over and over and when we least expect it, they get it. Whatever
                shape or situation, we realize that it’s the courage and
                strength of the inner warrior that generates our most profound
                surrender.
              </p>{" "}
              <p>
                So the next time we find ourselves struggling with our situation
                consider:
              </p>{" "}
              Am I living in my highest….integrity, honesty, truth?. Have I
              taken actions that convey my highest? If I am, it’s all good. I
              can surrender to the perfect way the situation will unfold. If I’m
              not, how can I live in my highest truth?
            </CardBody>

            <CardBody
              className="xd123"
              style={{ justifyContent: "center", textAlign: "center" }}
              onMouseOver={() =>
                this.setState({ hover: "visibleText" }) &
                (document.getElementsByClassName("xd123")[0].hidden = true)
              }
              id={this.state.hover}
            >
              {" "}
              <span id="readMore">
                <span id="readMore">Click To Read More</span>
              </span>
            </CardBody>
          </Card>
          <Row>
            <Card
              className="main-card mb-3"
              style={{
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              }}
            >
              <CardLink href="/#/dashboards/calendar">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg font-weight-normal">
                    <i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
                      {" "}
                    </i>
                    Join An Upcoming Event.
                  </div>{" "}
                  <div> </div>
                </CardHeader>
                Find new and coming activities with Ray by visiting the Events
                Page.
              </CardLink>
            </Card>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
