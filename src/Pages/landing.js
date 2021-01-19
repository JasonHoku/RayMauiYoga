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
            onClick={() => (window.location.hash = "/dashboards/home")}
          >
            <h1 style={{ color: "black" }}>RayMauiYoga.com</h1>
            <img class="spin" src="/images/DialDecal.png"></img>
            <h2>Digital Yoga through Blog, Video &amp; Live-Stream by Ray</h2>
            <h4>
              <a
                style={{ color: "white" }}
                href="https://RayMauiYoga.com/#/dashboards/home"
              >
                Click Anywhere To Enter
              </a>
            </h4>
            <h3>
              <small>Under Construction. 1-19-2021</small>
            </h3>
            <br /> <br />
          </span>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default LandingPage;
