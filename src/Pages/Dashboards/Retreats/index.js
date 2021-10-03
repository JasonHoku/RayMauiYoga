import React, { Component, Fragment } from "react";
import {TransitionGroup} from "react-transition-group";


import MusicElements from "./retreats";

//

export default class GalleryPage extends Component {
  render() {{
    return (
      <Fragment>
        <TransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <MusicElements />
        </TransitionGroup>
      </Fragment>
    );
  }}
}
