import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";



// Examples




import ProjectElements from "./aboutPage";



//

export default class Projects extends Component {
	render() {
		return (
			<Fragment>
				<CSSTransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
					transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>


					<ProjectElements />
				</CSSTransitionGroup>
			</Fragment>
		)

	}
}
