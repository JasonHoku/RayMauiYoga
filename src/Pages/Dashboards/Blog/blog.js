import React, { Component, Fragment, setState } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import CKEditor from "ckeditor4-react";

import firebase from "firebase";

import {
	Row,
	Button,
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

export default class BlogElements extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab2: "222",
			content: "Hello World",
			gotFirestoreBlogs: [],
			selectedBlog: 0,
			activeTab1: "11",
		};
		this.setContent = this.setContent.bind(this);
	}

	//------ Test for race condition ------ //
	setContent() {
		this.setState({
			content: "Hello World " + Math.random(),
		});
	}

	onChange(evt) {}

	onBlur(evt) {}

	getFirestoreBlogData() {
		let tempDataArray = [];
		console.log("");
		var db = firebase.firestore();
		db
			.collection("BlogPage")
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

				document.getElementById("BlogBodyDiv").innerHTML =
					tempDataArray[this.state.selectedBlog].body;
			});
	}

	componentDidMount() {
		let tempDataArray = [];
		console.log("");
		var db = firebase.firestore();
		db
			.collection("BlogPage")
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
				document.getElementById("BlogBodyDiv").innerHTML =
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
					<Row
						style={{
							textAlign: "center",
							alignContent: "center",
							justifyContent: "center",
							boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
							alignItems: "center",
							backgroundColor: "#feffff",
							borderRadius: "0px",
							borderTopLeftRadius: "25px",
							borderTopRightRadius: "25px",
						}}
					>
						<Card
							style={{
								width: "90%",
								backgroundColor: "#feffff",
								borderRadius: "0px",
								borderTopLeftRadius: "25px",
								borderTopRightRadius: "25px",
							}}
						>
							<h1
								style={{
									textAlign: "center",
									paddingTop:"25px",
								}}
							>
								<h1>On and Off the Mat</h1>
							</h1>
							<CardTitle
								style={{ width: "100%", textAlign: "center", justifyContent: "center" }}
							>
								{" "}
								<br />
								{this.state.gotFirestoreBlogs.map((el, index) => {
									return (
										<span>
											<button
												style={{
													width: "auto",
													margin: "20px",
													fontSize: "20px",
													backgroundColor: "transparent",
													fontFamily: "Montserrat",
													fontWeight: "bold",
												}}
												onClick={() => {
													this.setState({ selectedBlog: index });
													this.getFirestoreBlogData();
													console.log(index);
												}}
											>
												<span
													style={{
														position: "relative",
														top: "-3px",

														color: this.state.selectedBlog === index ? "darkGreen" : "blue",
													}}
												>
													{this.state.gotFirestoreBlogs[index].title}
												</span>
											</button>
										</span>
									);
								})}
							</CardTitle>
							<TabContent>
								<TabPane id="1">
									<br />
									<Card style={{ maxWidth: "100%" }}>
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
											id="BlogBodyDiv"
										></pre>
									</Card>
								</TabPane>
							</TabContent>
						</Card>
					</Row>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}
