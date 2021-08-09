import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import firebase from "firebase";
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
	CardLink,
	CardImg,
	NavLink,
	TabContent,
	TabPane,
	Progress,
	CardFooter,
	ButtonGroup,
} from "reactstrap";

export default class ProjectElements extends Component {
	constructor(props) {
		super(props);

		this.toggle2 = this.toggle2.bind(this);

		this.state = {
			activeTab2: "222",
			content: "Hello World",
			gotFirestoreBlogs: [],
			selectedBlog: 0,
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

	componentDidMount() {
		let tempDataArray = [];
		console.log("");
		var db = firebase.firestore();
		db
			.collection("BioPage")
			.get()
			.then((snapshot) => {
				snapshot.forEach((ele) => {
					console.log(ele.data());
					tempDataArray.push(ele.data());
				});
				console.log(tempDataArray);

				this.setState({
					gotFirestoreBlogs: tempDataArray,
				});
				document.getElementById("BioBodyDiv").innerHTML =
					tempDataArray[this.state.selectedBlog].body;
			});
	}

	render() {

		return (
			<Fragment>
				<CSSTransitionGroup
					component="div"
					transitionName="TabsAnimation"
					transitionAppear={true}
					transitionAppearTimeout={0}
					transitionEnter={false}
					transitionLeave={false}
				>
					<br></br>

					<Row style={{
						marginTop: "15px",
						textAlign: "center",
						alignSelf: "center",
						backgroundColor: "transparent",
						maxWidth: "100%",
					}}>
						<Col style={{
							marginTop: "15px",
							textAlign: "center",
							alignSelf: "center",
							backgroundColor: "transparent",
							maxWidth: "100%",
						}} xs="auto" sm="auto" md="auto" xl="auto">

							<Card
								className="main-card mb-3"
								style={{
									boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
									position: "relative",
									backgroundColor: "#eeffff",
									top: "-16px",
									maxWidth: "1000px",
									borderTopLeftRadius: "25px",
									borderTopRightRadius: "25px",
								}}
							>
								<CardHeader style={{
									marginTop: "15px",
									textAlign: "center",
									alignSelf: "center",
									backgroundColor: "transparent",
									maxWidth: "100%",
								}} className="card-header-tab">
									<div className="card-header-title font-size-lg font-weight-normal">
										<i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
											{" "}
										</i>
										Ray's BIO
									</div>{" "}
									<div> </div>
								</CardHeader>
								<CardBody style={{
									marginTop: "15px",
									textAlign: "center",
									alignSelf: "center",
									backgroundColor: "transparent",
									maxWidth: "100%",
								}}>

									<pre
										style={{
											width: "100%",
											minWidth: "200px",
											whiteSpace: "pre-wrap",
											paddingLeft: "25px",
											paddingRight: "25px",
											fontFamily: "Montserrat",
											lineHeight: "25px",
											fontSize: "22px",
											fontWeight: "600",
											textAlign: "left",
										}}
										id="BioBodyDiv"
									></pre>
									<br></br>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<br></br>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}
