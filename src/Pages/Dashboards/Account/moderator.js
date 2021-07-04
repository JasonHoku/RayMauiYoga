import React, { Component, Fragment, useState, useEffect, useRef } from "react";
import UserQueryComponent from "./UserQueryComponent.js";
import ProductManagerComponent from "./ProductManagerComponent.js";
import ContentManagerComponent from "./ContentManagerComponent.js";
import EventManagerComponent from "./EventManagerComponent.js";
import NoteManagerComponent from "./NoteManagerComponent.js";
import CommentManagerComponent from "./CommentManagerComponent.js";
import SurveyManagerComponent from "./SurveyManagerComponent.js";
import DocumentationPage from "./Documentation.js";
import VideoManager from "./VideoManager.js";
import IssueManager from "./IssueManager.js";

import classnames from "classnames";

import {
	Row,
	Col,
	Button,
	ListGroupItem,
	Card,
	CardBody,
	Form,
	FormGroup,
	Label,
	Container,
	Input,
	FormText,
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
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { relative } from "path";
import LoginPageElements from "./loginPage";
import AccountElements from "./account";
import { get, initial } from "lodash";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
var firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE,
	authDomain: "raymauiyoga-d75b1.firebaseapp.com",
	projectId: "raymauiyoga-d75b1",
	storageBucket: "raymauiyoga-d75b1.appspot.com",
	messagingSenderId: "313463385446",
	appId: "1:313463385446:web:7d2d2fd362f03913802ca7",
	measurementId: "G-S8EJTRMN63",
};

function ModeratorElements() {
	const [message, setMessage] = useState("Hi there, how are you?");
	const [formName, setformName] = useState([]);
	const [formEmail, setformEmail] = useState([]);
	const [activeTab, setactiveTab] = useState("1");
	const [userMetric, setuserMetric] = useState("");
	const [issuesMetric, setissuesMetric] = useState("");
	const [fruit, setFruit] = useState("banana");
	const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
	const [loadedTotalIDs, setloadedTotalIDs] = useState("0");
	const [loadedTotalUsers, setloadedTotalUsers] = useState("0");
	const [loadedSnapshotData, setloadedSnapshotData] = useState("");

	const [loadStage, setloadStage] = useState("1");
	const isInitialMount = useRef(true);

	useEffect(() => {
		let concData = [];
		let concData2 = [];
		if (isInitialMount.current === true) {
			console.log("LoadStage: " + loadStage);
			if (loadStage === "1") {
				const loadsnapshot = async () => {
					const snapshot = await firebase.firestore().collection("users").get();
					snapshot.forEach((doc) => {
						concData = concData.concat({
							[doc.id]: [doc.data()],
						});
						concData2 = concData2.concat(doc.id);
					});
					setloadedSnapshotData(concData);
				};
				loadsnapshot().then(async () => {
					if (loadedSnapshotData != "") {
						setloadStage("2");
					}
				});
			}
			if (loadStage === "2") {
				setuserMetric(loadedSnapshotData.length);
				setloadStage("3");
			}
			if (loadStage === "3") {
				isInitialMount.current = false;
			}
		}
	}, [loadStage, loadedSnapshotData]);

	function loadProducts(props) {
		if (activeTab === "Products") {
			return <ProductManagerComponent />;
		}
	}
	function loadEvents(props) {
		if (activeTab === "Events") {
			return <EventManagerComponent />;
		}
	}
	function loadContentManagerComponent(props) {
		if (activeTab === "Content") {
			return <ContentManagerComponent />;
		}
	}
	function getMetrics() {
		console.log("Updating Metrics");
		this.setState({
			userMetric: localStorage.getItem("ActiveUserCount"),
			chatMetric: localStorage.getItem("ActiveChatUserCount"),
			issuesMetric: localStorage.getItem("ActiveIssueCount"),
			commentsMetric: localStorage.getItem("CommentsCount"),
			SurveyMetric: localStorage.getItem("NewSurveyCount"),
		});
	}
	function toggle(tab) {
		if (activeTab !== tab) {
			setactiveTab(tab);
		}
	}
	function onImageChange(event) {
		console.log(event.target.files);

		this.setState({
			images: event.target.files,
		});
	}

	function handleInputChange(event) {
		this.setState({
			formName: event.target.value,
		});
	}
	function handlePriceInputChange(event) {
		localStorage.setItem(
			"localData7",
			event.target.value - localStorage.getItem("localData4")
		);
		this.setState({
			adminPrice: event.target.value,
		});
	}
	function valueCheck() {
		if (!localStorage.getItem("localData3")) {
			localStorage.setItem("localData3", 0);
		}
	}

	function loadProductsComponent(props) {
		if (activeTab === "Products") {
			return <ProductManagerComponent />;
		}
	}
	function loadAccountElementsComponent(props) {
		if (activeTab === "User View") {
			return <AccountElements />;
		}
	}

	function loadCommentManagerComponent(props) {
		if (activeTab === "Comments") {
			return <CommentManagerComponent />;
		}
	}

	function loadUserQueryComponent(props) {
		if (activeTab === "Users") {
			return <UserQueryComponent />;
		}
	}
	// function loadLiveChatManager() {
	// 	if (activeTab === "Live Chat") {
	// 		return <LiveChatManager />;
	// 	}
	// }

	function loadVideoManagerComponent() {
		if (activeTab === "Video") {
			return <VideoManager />;
		}
	}

	// function loadListingManagerComponent() {
	// 	if (activeTab === "Listing Manager") {
	// 		return <ListingManagerComponent />;
	// 	}
	// }
	function loadEventManagerComponent(props) {
		if (activeTab === "Events") {
			return <EventManagerComponent />;
		}
	}

	function loadIssueManagerComponent(props) {
		if (activeTab === "Issues") {
			return <IssueManager />;
		}
	}

	function loadSurveyManagerComponent(props) {
		if (activeTab === "Surveys") {
			return <SurveyManagerComponent />;
		}
	}
	function loadNoteManagerComponent(props) {
		if (activeTab === "Notes") {
			return <NoteManagerComponent />;
		}
	}

	return (
		<Fragment>
			<Container
				className="ModeratorBackground"
				fluid
				style={{
					backgroundColor: "#FFFFFFDD",
					borderRadius: "55px",
				}}
			>
				<TabContent
					activeTab={activeTab}
					style={{
						backgroundColor: "transparent",
						opacity: 0.9,
						justifyContent: "center",
						alignSelf: "center",
						width: "100%",
					}}
				>
					<CardHeader
						className="ponoTitle"
						style={{
							justifyContent: "center",
							backgroundColor: "transparent",
							alignSelf: "center",
							borderBottom: "none",
							marginBottom: "-25px",
							width: "100%",
							opacity: 100,
						}}
					>
						<h2>
							<i className="pe-7s-tools icon-gradient bg-plum-plate"></i>
							Moderator Controls
						</h2>
					</CardHeader>
					<CardHeader
						style={{
							marginBottom: "-35px",
							justifyContent: "center",
							backgroundColor: "transparent",
							borderBottom: "none",
							alignSelf: "center",
						}}
					>
						<Button
							size="sm"
							outline
							color="alternate"
							className={
								"btn-pill btn-wide " + classnames({ active: activeTab === "1" })
							}
							onClick={() => {
								toggle("1");
							}}
						>
							Tools
						</Button>
						<Button
							outline
							color="alternate"
							className={
								"btn-pill btn-wide " + classnames({ active: activeTab === "User View" })
							}
							onClick={async () => {
								toggle("User View");
								setTimeout(
									() =>
										document.getElementById("id001").scrollIntoView({
											behavior: "smooth",
											block: "center",
											inline: "center",
										}),
									100
								);
							}}
						>
							User View
						</Button>
					</CardHeader>
					<br />
					<br />
					<Row style={{ justifyContent: "center" }}>
						<Row>
							{" "}
							<Card
								style={{
									width: "auto",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									height: "100%",
									marginTop: "-5px",
									marginBottom: "-10px",
									marginLeft: "25px",
									marginRight: "25px",
									alignItems: "center",
								}}
							>
								<CardTitle
									style={{
										justifyContent: "center",
										alignSelf: "center",
										marginBottom: "-15px",
									}}
								>
									<h4>Main Website Tools:</h4>
								</CardTitle>
								<span
									style={{
										marginLeft: "10px",
										marginTop: "5px",
										display: "block",
									}}
								>
									{/* <button
										style={{
											backgroundColor: "#009900",
											borderRadius: "16px",
											height: "35px",
											fontSize: "120%",
											marginTop: "5px",
										}}
										onClick={async () => {
											toggle("Documentation");
											setTimeout(
												() =>
													document.getElementById("id002").scrollIntoView({
														behavior: "smooth",
														block: "start",
														inline: "center",
													}),
												100
											);
										}}
									>
										{" "}
										Documentation{" "}
									</button>
									&nbsp; */}
									<button
										style={{
											backgroundColor: "#009999",
											borderRadius: "16px",
											height: "35px",
											fontSize: "120%",
											marginTop: "5px",
										}}
										onClick={async () => {
											setTimeout(
												() =>
													document.getElementById("id002").scrollIntoView({
														behavior: "smooth",
														block: "start",
														inline: "center",
													}),
												100
											);
											toggle("Content");
										}}
									>
										<span style={{ position: "relative", top: "-4px" }}>
											{" "}
											Content Editor{" "}
										</span>
									</button>
									&nbsp;
									<button
										style={{
											backgroundColor: "#006699",
											borderRadius: "16px",
											height: "35px",
											fontSize: "120%",
											marginTop: "5px",
										}}
										onClick={async () => {
											setTimeout(
												() =>
													document.getElementById("id002").scrollIntoView({
														behavior: "smooth",
														block: "start",
														inline: "center",
													}),
												100
											);
											toggle("Video");
										}}
									>
										<span style={{ position: "relative", top: "-4px" }}>
											{" "}
											Video Manager{" "}
										</span>
									</button>
									&nbsp;
									<button
										style={{
											backgroundColor: "#0033AA",
											borderRadius: "16px",
											height: "35px",
											fontSize: "120%",
											marginTop: "5px",
										}}
										onClick={async () => {
											setTimeout(
												() =>
													document.getElementById("id002").scrollIntoView({
														behavior: "smooth",
														block: "start",
														inline: "center",
													}),
												100
											);
											toggle("Users");
										}}
									>
										<span style={{ position: "relative", top: "-4px" }}>
											{" "}
											User Management{" "}
										</span>
									</button>
									{/* //Comment Manager Button
                      &nbsp;
                      <button
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#0000CC",
                          borderRadius: "16px",
                          height: "35px",
                          fontSize: "120%",
                          marginTop: "5px",
                        }}
                         onClick={async () => {
                          setTimeout(
                            () =>
                              document.getElementById("id002").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "center",
                              }),
                            100
                          );
                          toggle("Comments");
                        }}
                      >
                        {" "}
                        Comments{" "}
                      </button>*/}
									{/*
                      &nbsp;
                      <button
                        style={{
                          marginTop: "10px",
                          backgroundColor: "#3300CC",
                          borderRadius: "16px",
                          height: "35px",
                          fontSize: "120%",
                          marginTop: "5px",
                        }}
                         onClick={async () => {
                          setTimeout(
                            () =>
                              document.getElementById("id002").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "center",
                              }),
                            100
                          );
                          toggle("Products");
                        }}
                      >
                        {" "}
                        Products{" "}
                      </button>*/}
									&nbsp;
									{/*
                      &nbsp;
                      <button
                        style={{
                          backgroundColor: "#BB0066",
                          borderRadius: "16px",
                          height: "35px",
                          fontSize: "120%",
                          marginTop: "5px",
                        }}
                         onClick={async () => {
                          setTimeout(
                            () =>
                              document.getElementById("id002").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "center",
                              }),
                            100
                          );
                          toggle("Live");
                        }}
                      >
                        {" "}
                        Live Chat{" "}
                      </button>*/}
									&nbsp;
									{/*
                      <button
                        style={{
                          backgroundColor: "#BB0033",
                          borderRadius: "16px",
                          height: "35px",
                          fontSize: "120%",
                          marginTop: "5px",
                        }}
                        onClick={async () => {
                          setTimeout(
                            () =>
                              document.getElementById("id002").scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "center",
                              }),
                            100
                          );
                          toggle("Issue");
                        }}
                      >
                        {" "}
                        Report Issue{" "}
                      </button>
                      &nbsp;*/}
									<br />
									<br />
								</span>
							</Card>
						</Row>{" "}
						<br />{" "}
					</Row>
					<Row>
						<TabPane
							className="ponoTitle"
							tabId="1"
							style={{
								height: "100%",
								backgroundColor: "transparent",
								alignContent: "center",
								opacity: 100,
							}}
						>
							<Card
								style={{
									width: "auto",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									height: "100%",
									marginTop: "15px",
									alignItems: "center",
									marginBottom: "25px",
								}}
							>
								<h4>
									Highlight Metrics: <br />
									Users: {userMetric}
									<br />
									<span id="id002"></span>
								</h4>
							</Card>
						</TabPane>
					</Row>
					<TabPane id="id001" tabId="User View">
						<Row style={{ justifyContent: "center" }}>
							<Card
								style={{
									backgroundColor: "transparent",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								<CardHeader> Registered User View:</CardHeader>
								{loadAccountElementsComponent()}
							</Card>
						</Row>
					</TabPane>{" "}
					<TabPane tabId="3">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							></Card>
						</Row>
					</TabPane>
					<TabPane tabId="Comments">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadCommentManagerComponent()}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Events">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadEventManagerComponent()}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Products">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadProductsComponent()}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Content">{loadContentManagerComponent()}</TabPane>
					<TabPane tabId="Notes">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadNoteManagerComponent()}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Surveys">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadSurveyManagerComponent()}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Live">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{/* {loadLiveChatManager()} */}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Documentation">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								<DocumentationPage />
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Video">{loadVideoManagerComponent()}</TabPane>
					<TabPane tabId="Users">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadUserQueryComponent()}
							</Card>
						</Row>
					</TabPane>
					<TabPane tabId="Issue">
						<Row style={{ justifyContent: "center" }}>
							{" "}
							<Card
								style={{
									width: "95%",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									alignContent: "center",
									alignItems: "center",
								}}
							>
								{loadIssueManagerComponent()}
							</Card>
						</Row>
					</TabPane>
				</TabContent>
			</Container>
		</Fragment>
	);
}

export default ModeratorElements;
