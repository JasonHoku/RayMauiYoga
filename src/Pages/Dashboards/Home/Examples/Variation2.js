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
    this.state = {
      hover: "hiddenText",
    };
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
              content="RayYogaMaui.com, software development, e-commerce, education and services."
            />
          </center>
          <Row
            style={{
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            {" "}
            <Card
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
                  RayYogaMaui Under Construction
                </div>{" "}
                <div>
                  {" "}
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  {" "}
                  <a href="https://dashboardpack.com/live-demo-preview/?livedemo=113&v=7516fd43adaa">
                    {" "}
                    Template Examples
                  </a>
                </p>
                <p>
                  {" "}
                  <a href="https://github.com/JasonHoku/RayYogaMaui">
                    {" "}
                    Site Source Code
                  </a>
                </p>
              </CardBody>
            </Card>{" "}
            &nbsp;&nbsp;&nbsp;
          </Row>

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
                Strength in Surrender
              </div>{" "}
              <div> </div>
            </CardHeader>
            <CardBody
              onMouseOver={() => this.setState({ hover: "visibleText" })}
              id={this.state.hover}
              onMouseLeave={() => this.setState({ hover: "hiddenText" })}
              id={this.state.hover}
            >
              <p>
                {" "}
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
                {" "}
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
          </Card>
          <Row></Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
