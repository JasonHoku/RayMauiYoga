import React, { Component, Fragment } from "react";
import {TransitionGroup} from "react-transition-group";


// Examples




import BlogElements from "./blog";



//

export default class Blog extends Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
          transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>


            <BlogElements />
                 </TransitionGroup>
      </Fragment>
    )

  }
}
