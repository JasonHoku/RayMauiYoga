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
										Study and connect with Ray through live, written, &amp; video events.
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
							<h3>Getting Started</h3>
						</CardHeader>
						<CardBody
							onClick={() =>
								this.setState({ hover: "visibleText" }) &
								(document.getElementsByClassName("xd123")[0].hidden = true)
							}
							id={this.state.hover}
						>
							<p>
								At times, getting started on a project, practice, conversation or health
								kick can be the most challenging phase of aany meaningful endeavor.
								While our intent may be clear and meaningful, taking action may be
								daunting. So why do we hold ourselves back when we have a plan?
							</p>
							<p>
								We might not feel confident in our skill set. Perhaps we are not
								disciplined enough to give necessary attention and focus. Whatever the
								case, taking one small step in one positive manner often leads us to
								productivity. Momentum. Get on the mat, do just one pose. Write one
								sentence. Play one note. More times than not, the simplest start will
								lead us down a positive path.
							</p>
							<p>
								Thus, I write these couple of paragraphs with the hope of completing
								this site, learning technology, posting videos and content that is
								enjoyable to create and equally enjoyable to digest. It has not been
								easy. I am intimidated by the technologies and not so confident
								implementing them. I love the yoga practice but do not always know how
								to optimally share this love.
							</p>
							<p>
								Nonetheless, I hope my intent and passion shines through in some
								meaningul way. I hope you find one moment of enjoyment with what I have
								to share. And most of all, I hope your practices are fun, meaningful and
								all of you.
							</p>
							<p>With aloha.</p>
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
									<li>Find new and coming activities</li>
									<li>Check availabilities and reserve a spot</li>
									<li>Request a home or private session</li>
									<br />
									All at the events section; By clicking here.
								</CardBody>
							</CardLink>
						</Card>
					</Row>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}
