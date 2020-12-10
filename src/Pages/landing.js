import react from "react";
import React, { Fragment } from "react";
import { useHistory } from "react-navi";
import { Route, Redirect } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickX = this.handleClick.bind(this);

    this.state = {
      sideBarVar: "1",
    };
  }

  componentDidMount() {}

  handleClick() {}

  render() {
    return (
      <Fragment>
        <CSSTransitionGroup>
          <span
            className="landingContent"
            onClick={() =>(window.location.hash = "/dashboards/home")}
          >
            <h1>RayMauiYoga.com</h1>
            <br /> <br />
            <img class="spin" src="/images/DialDecal.png"></img> <br /> <br />
            <h2>Home to Yoga education in blog and video format.</h2>
            <br /> <br />
            <h3>
              Site Under Construction. 12-10-2020 Click Anywhere to Proceed.
            </h3>
            <br /> <br /> <br /> <br />
          </span>
        </CSSTransitionGroup>{" "}
      </Fragment>
    );
  }
}

export default LandingPage;
