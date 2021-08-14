import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";



class NavDummy extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Menu</h5>
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(NavDummy);
