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
								backgroundColor: "#eeffff",
								boxShadow: "0px 0px 10px 25px rgba(50,50,50, .3)",
								borderRadius: "100px",
								borderBottomLeftRadius: "10px",
							}}
						>
							<CardBody style={{
								textAlign: "center",
								left: "50%",
								borderRadius: "100px",
								borderBottomLeftRadius: "10px",
							}}><div style={{ height: "50px" }}></div>
								<div style={{ fontSize: "28px" }}>	Welcome To RayMauiYoga.com</div>
								<div style={{ height: "50px" }}></div>
								<h4>
									<a href="/#/dashboards/about">
										<b>A community resource of wellness education in the forms of live, written, &amp; video events.</b>
									</a>
								</h4>
							</CardBody>
							<CardBody
								style={{
									textAlign: "center",
									alignSelf: "center",
									backgroundColor: "transparent",
									overflow: "hidden",
									maxWidth: "100%",
								}}
							>
								<div style={{ minWidth: "100%", minHeight: "100%" }}>
									<CarouselBSExample />
								</div>
							</CardBody>
						</Card>
					</Row><div style={{ height: "25px" }}></div>
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

					<Row style={{ textAlign: "center" }}><Card
						className="main-card mb-3"
						style={{
							backgroundColor: "#eeffff",
							maxWidth: "1000px",
							borderTopLeftRadius: "25px",
							borderTopRightRadius: "25px",
						}}
					>
						<div style={{
							backgroundColor: "#eeffff",
							borderRadius: "0px",
							borderTopLeftRadius: "25px",
							borderTopRightRadius: "25px",
						}}>
							<h2 style={{ padding: "10px" }}>Getting Started <small>By Ray</small></h2>
						</div>
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
					</Card></Row>
					<Row style={{ textAlign: "center", }}><Card
						className="main-card mb-3"
						style={{
							position: "relative",
							backgroundColor: "#eeffff",
							top: "-16px",
							maxWidth: "1000px",
							borderBottomRightRadius: "25px",
							borderBottomLeftRadius: "25px",
						}}
					>
						<div style={{
							backgroundColor: "#eeffff",
							borderRadius: "15px",
						}}>
							<h2 style={{
								padding: "10px",
								backgroundColor: "#eeffff",
								borderRadius: "15px",
							}}>
								Yoga Deep Dive <br />
								"Restore the Balance"<br />
								Workshop with Ray</h2>
						</div>
						<CardBody style={{
							backgroundColor: "#eeffff",
							borderRadius: "15px",
						}}>

							Join Ray Mohrman for Yoga Deep Dive: Restore the Balance. In this workshop students will reflect on their
							practice over the past year amidst the challenges of the global pandemic. Through pose sequences, meditation,
							breath work and small journal reflections, students will participate in a practice to restore balance and rejuvenate..
							The workshop is open to all levels. An open mind and willingness to explore your practice are the only
							prerequisites.<br />
							<br />
							Friday, July 30: 4:30pm-7pm Island Spirit Yoga, Lahaina *Happy Hour to follow!
							<br /><br />
							Contact Ray Mohrman - raymauiyoga@gmail.com - 808-214-8877
							<br /><br />
							15 Student maximum. Sign up early. Virtual option available upon req
							<br /><br />
							$45: Reserve with Venmo: @Ray-Mohrman
							<br /><br />
							*Yoga Deep Dive is a series of yoga workshops designed to deepen and
							fine tune your yoga practice. Each two and a half hour session
							will be guided by a yoga theme integrated into poses, breath work,
							meditation, and journaling to support life on and off the mat.
							<br />
						</CardBody>
					</Card></Row>
					<Row style={{ textAlign: "center" }}>	<Card
						className="main-card mb-3"
						style={{
							boxShadow: "0px 0px 0px 5px rgba(50,50,50, .2)",
							borderRadius: "25px",
							backgroundColor: "#eeffff",
							maxWidth: "1000px",
							minWidth: "50%",
						}}
					>
						<CardLink href="/#/dashboards/calendar">
							<div style={{
								backgroundColor: "#eeffff",
								borderRadius: "25px",
							}}>
								<h2 style={{
									padding: "10px",
									backgroundColor: "#eeffff",
									borderRadius: "15px",
									textAlign: "center"
								}}>Discover More Upcoming Events</h2>
							</div>
							<CardBody>
								<li>Find new and coming activities</li>
								<li>Check availabilities and reserve a spot</li>
								<li>Request a home or private session</li>
								<br />
								All at the events section; By clicking here.
							</CardBody>
						</CardLink>
					</Card></Row>
				</CSSTransitionGroup>
			</Fragment >
		);
	}
}
