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
            <br /> <h1>RayMauiYoga.com</h1> <br />
            <img class="spin" src="/images/DialDecal.png"></img> <br /> <br />
            <h2>Digital Yoga through Blog, Video &amp; Live-Stream by Ray</h2>
            <br />
            <h3>Site Under Construction. 12-10-2020</h3>
            <br />
            <h4>Click To Enter</h4>
            <br /> <br /> <br /> <br />
          </span>
        </CSSTransitionGroup>{" "}
      </Fragment>
    );
  }
}

export default LandingPage;
