import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

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
          transitionName="MainAnimation2"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionEnter={true}
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
                maxWidth: "750px",
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
              }}
            >
              <CardHeader className="card-header-tab" color="light">
                <h1>Welcome</h1>
              </CardHeader>
              <CardBody>
                <h3>
                  <a href="/#/dashboards/account">
                    Study and connect with Ray through live, written, &amp;
                    video events.
                  </a>
                </h3>
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
        </CSSTransitionGroup>
        <CSSTransitionGroup
          component="div"
          transitionName="MainAnimation3"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnterTimeout={1000}
          transitionEnter={true}
          transitionLeave={false}
        >
          <Card
            className="main-card mb-3"
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            <CardHeader className="card-header-tab">
              <h3> Strength in Surrender</h3>
            </CardHeader>
            <CardBody
              onClick={() =>
                this.setState({ hover: "visibleText" }) &
                (document.getElementsByClassName("xd123")[0].hidden = true)
              }
              id={this.state.hover}
            >
              Isvara Pranidhana is one of yogas niyamas (positive observances)
              that we practice to cultivate more healthy living, a positive
              outlook and a liberated state of existence. Isvara translates as
              “supreme being”, “ultimate reality”, “true self” or dare I say
              “God” (the God that resides within, of course)! Pranidhana is to
              “dedicate”, “devote” or “surrender”. Thus, a dedication or
              devotion to our true self, ultimate reality, or God.. In Western
              terms we often find the word “surrender” or “letting go” as a more
              neat and clean translation for Isvara Pranidhana. And in Western
              terms this act of “surrender” has certainly become quite cliche in
              spiritual dialogue.
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
              onClick={() =>
                this.setState({ hover: "visibleText" }) &
                (document.getElementsByClassName("xd123")[0].hidden = true)
              }
              id={this.state.hover}
            >
              <span id="readMore">
                <span id="readMore">
                  <Button>Click To Read More</Button>
                </span>
              </span>
            </CardBody>
          </Card>
          <Row>
            <Card
              className="main-card mb-3"
              style={{
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                width: "95%",
              }}
            >
              <CardLink href="/#/dashboards/calendar">
                <CardHeader className="card-header-tab">
                  <h3>Join An Upcoming Event</h3>
                </CardHeader>
                <CardBody>
                  {" "}
                  Find new and coming activities with Ray by visiting the Events
                  Page.
                </CardBody>
              </CardLink>
            </Card>
          </Row>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
