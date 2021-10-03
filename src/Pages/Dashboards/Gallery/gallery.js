import React, { Component, Fragment } from "react";
import CarouselBSExample from "./Carousel";

import {TransitionGroup} from "react-transition-group";

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
	CardHeader,
	CardTitle,
	CardLink,
	CardImg,
	NavLink,
	TabContent,
	TabPane,
	Progress,
	CardFooter,
	ButtonGroup,
} from "reactstrap";

const CLIENT = {
	sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
	production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

function boxMullerRandom() {
	let phase = true,
		x1,
		x2,
		w;

	return (function () {
		if (phase) {
			do {
				x1 = 2.0 * Math.random() - 1.0;
				x2 = 2.0 * Math.random() - 1.0;
				w = x1 * x1 + x2 * x2;
			} while (w >= 1.0);

			w = Math.sqrt((-2.0 * Math.log(w)) / w);
			return x1 * w;
		} else {
			return x2 * w;
		}
	})();
}

export default class GalleryElements extends Component {
	constructor(props) {
		super(props);

		this.toggle2 = this.toggle2.bind(this);
		this.state = {
			activeTab2: "222",
			activeTab1: "11",
		};
	}

	toggle2(tab) {
		if (this.state.activeTab2 !== tab) {
			this.setState({
				activeTab2: tab,
			});
		}
	}

	toggle1(tab) {
		if (this.state.activeTab1 !== tab) {
			this.setState({
				activeTab1: tab,
			});
		}
	}

	render() {
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
					<Row
						style={{
							alignContent: "center",
							justifyContent: "center",
							marginTop: "-15px",
							marginBottom: "-15px",

							textAlign: "center",
						}}
						width="100%"
					>
						<CardTitle
							style={{
								textAlign: "center",
								borderRadius: "25px",
								backgroundColor: "#440066BB",
								paddingRight: "10px",
								paddingLeft: "10px",
								fontWeight: "900",
								color: "whitesmoke",
								fontSize: "36px",
							}}
						>
							Gallery
						</CardTitle>
					</Row>
					<br />
					<Row
						style={{
							justifyContent: "center",
							borderRadius: "0px",
							borderTopLeftRadius: "25px",
							borderTopRightRadius: "25px",
						}}
					>
						<Col
							width="100%"
							style={{
								maxWidth: "750px",
								borderRadius: "0px",
								borderTopLeftRadius: "25px",
								borderTopRightRadius: "25px",
							}}
						>
							<Card
								style={{
									maxWidth: "750px",
									borderRadius: "0px",
									borderTopLeftRadius: "25px",
									borderTopRightRadius: "25px",
								}}
							>
								<CardBody
									style={{
										maxWidth: "750px",
										borderRadius: "0px",
										borderTopLeftRadius: "25px",
										borderTopRightRadius: "25px",
									}}
								>
									<p></p>{" "}
									<center>
										<CarouselBSExample />
									</center>
									<center>
										← Slideshow →
										<br />
									</center>{" "}
								</CardBody>
							</Card>
						</Col>
					</Row>
					<br></br>

					<Row
						style={{
							textAlign: "center",
							alignSelf: "center",
							backgroundColor: "transparent",
							maxWidth: "100%",
						}}
					>
						<Col
							style={{
								textAlign: "center",
								alignSelf: "center",
								backgroundColor: "transparent",
								maxWidth: "100%",
							}}
							xs="6"
							sm="4"
							md="4"
							xl="3"
						>
							<a href="/about">
								<Card
									style={{
										borderRadius: "50%",
										boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
									}}
								>
									<CardHeader
										style={{
											textAlign: "center",
											alignSelf: "center",
											backgroundColor: "transparent",
											maxWidth: "100%",
										}}
									>
										Explore
									</CardHeader>
									<CardBody
										style={{
											textAlign: "center",
											alignSelf: "center",
											backgroundColor: "transparent",
											maxWidth: "100%",
										}}
									>
										{" "}
										An Eye-Opening Experience
									</CardBody>
								</Card>
							</a>
						</Col>

						<Col
							style={{
								marginTop: "10px",
								textAlign: "center",
								alignSelf: "center",
								backgroundColor: "transparent",
								maxWidth: "100%",
							}}
							xs="6"
							sm="4"
							md="3"
							xl="4"
						>
							<a href="/about">
								<Card>
									<CardHeader
										style={{
											textAlign: "center",
											alignSelf: "center",
											backgroundColor: "transparent",
											maxWidth: "100%",
										}}
									>
										Learn More
									</CardHeader>
									<CardBody
										style={{
											textAlign: "center",
											alignSelf: "center",
											backgroundColor: "transparent",
											maxWidth: "100%",
										}}
									>
										Discover RayMauiYoga Events.
									</CardBody>
								</Card>
							</a>
						</Col>

						<Col
							style={{
								marginTop: "15px",
								textAlign: "center",
								alignSelf: "center",
								backgroundColor: "transparent",
								maxWidth: "100%",
							}}
							xs="7"
							sm="4"
							md="4"
							xl="5"
						>
							<a href="/contact">
								<Card
									style={{
										borderRadius: "50%",
										boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
									}}
								>
									<CardHeader
										style={{
											textAlign: "center",
											alignSelf: "center",
											backgroundColor: "transparent",
											maxWidth: "100%",
										}}
									>
										Contact
									</CardHeader>
									<CardBody
										style={{
											textAlign: "center",
											alignSelf: "center",
											backgroundColor: "transparent",
											maxWidth: "80%",
										}}
									>
										For questions, comments or concerns, reach out at the contact page.
									</CardBody>
								</Card>
							</a>
						</Col>
					</Row>
					<br></br>
				</TransitionGroup>
			</Fragment>
		);
	}
}
