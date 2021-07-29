import react from "react";
import React, { Fragment } from "react";
import { useHistory } from "react-navi";
import { Route, Redirect } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.vantaRef = React.createRef();
    this.handleClickX = this.handleClick.bind(this);

    this.state = {
      sideBarVar: "1",
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  handleClick() {}

  render() {
    return (
      <Fragment>
        <CSSTransitionGroup>
          <span
            className="landingContent"
            onClick={() => (window.location.hash = "/")}
          >
            <h1 style={{ color: "black", fontFamily: "monospace" }}>
              RayMauiYoga.com
            </h1>
            <img class="spin" src="/images/DialDecal.png"></img>
            <h2>Yoga through Blog, Video &amp; Live-Stream by Ray</h2>
            <h4>
              <a
                style={{ color: "white" }}
                href="https://RayMauiYoga.com/"
              >
                Click Anywhere To Enter
              </a>
            </h4>
            <h3>
              <small>
                Under Construction. {String(new Date().toLocaleDateString())}
              </small>
            </h3>
            <br /> <br />
          </span>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default LandingPage;
