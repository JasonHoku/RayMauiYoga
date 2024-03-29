import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import {TransitionGroup} from "react-transition-group";
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
import Calendar from "react-calendar";

import "../../../assets/components/Calendar.css";

import "../Account/chat.css";

import { useCollectionData } from "react-firebase-hooks/firestore";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

function EventManagerComponent() {
	const [loadStage, setloadStage] = useState("1");

	const [loadElements, setloadElements] = useState(null);

	const [loadedEvents, setloadedEvents] = useState([]);

	const [loadedEventIDs, setloadedEventIDs] = useState([]);
	const [categorizedMenuArray, setCategorizedMenuArray] = useState([]);

	const [contactFormName, setContactFormName] = useState(" ");

	const [gotEventsData, setGotEventsData] = useState([]);

	const [selectedDateEvents, setSelectedDateEvents] = useState([]);
	const [setDate, setsetDate] = useState(
		String(
			new Date().toLocaleTimeString([], {
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})
		)
	);
	const [eventsFormDescription, seteventsFormDescription] = useState("");
	const [editedDescription, seteditedDescription] = useState("");
	const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
	const [file, setFile] = useState(null);
	const [loadedDescription, setloadedDescription] = useState("");
	const [loadedEzID, setloadedEzID] = useState("1");
	const [formValue, setFormValue] = useState("");

	const auth = firebase.auth();
	const firestore = firebase.firestore();

	const messagesRef2 = firestore.collection("EventsPage");
	const ContactSubmissionsRef = firestore.collection("ContactSubmissions");
	const [messages2] = useCollectionData(messagesRef2);


	function submitContact() {




		if (
			(formValue.length !== null && formValue.length < 1)
		) {
			alert("You must fill this form entirely.");
		} else {
			sendRequest()
			document.getElementById("SendButton").innerHTML = "Sending";
			document.getElementById("SendButton").disabled = true;
			async function sendRequest(props) {

				try {


					var useEmulator = true;
					//Emulator local url for development:
					let fetchURL = "";
					const urlLocal = `http://localhost:5001/raymauiyoga-d75b1/us-central1/processSendEmail`;

					//Live  url:
					const urlLive =
						"https://us-central1-raymauiyoga-d75b1.cloudfunctions.net/processSendEmail";

					if (
						useEmulator &&
						window.location.hostname.includes("localhost")
					) {
						fetchURL = urlLocal;
					} else {
						fetchURL = urlLive;
					}

					//Send Details to Functions
					const rawResponse = await fetch(fetchURL, {
						method: "POST",
						mode: "cors",
						headers: new Headers({
							"Content-Type": "application/json",
							Accept: "application/json",
							HeaderTokens: JSON.stringify({
								//
								// //
								// refreshToken: auth.currentUser.refreshToken,
								// authDomain: auth.currentUser.authDomain,
								// uid: auth.currentUser.uid,
								// name: auth.currentUser.displayName,
								// email: auth.currentUser.email,
								hostname: window.location.hostname,
							}),
						}),
						body: JSON.stringify({
							name: "EventRequestPage",
							contact: contactFormName,
							message: formValue,
							// UUID: auth.currentUser.uuid,
						}),
					});
					const content = await rawResponse.json();
					console.log(content.res)

					if (content.res === "success") {
						alert("Your message has sent successfully!");
						document.getElementById("SendButton").innerHTML = "Success!";
					} else {

						document.getElementById("SendButton").innerHTML = "Try Again?";

						alert("The message did not send. Perhaps you've lost internet? \n" + JSON.stringify
						)
					}
				} catch (error) {

					alert("The message did not send. Perhaps you've lost internet? \n" + JSON.stringify(error)); document.getElementById("SendButton").innerHTML = "Try Again?";
				}
			}



		}
	}

	function EventDataSelectedDate(props) {
		const auth = firebase.auth();
		const firestore = firebase.firestore();
		const { EventDate, EventTitle, id } = props.message;
		const dex = props.index;

		const messageClass = "sent";

		for (var i = 0; i < loadedEvents.length; i++) {
			let gotDate = new Date(EventDate);
			let are24hFrom0 = new Date(new Date(setDate));
			are24hFrom0.setDate(are24hFrom0.getDate(setDate) - 1);
			var are24hFrom1 = new Date(setDate);
			are24hFrom1.setDate(are24hFrom1.getDate(setDate) + 1);
			if (gotDate >= are24hFrom0) {
				if (gotDate <= are24hFrom1) {
					return (
						<>
							<div className={` message ${messageClass}`}>
								<br />
								<p className="pchat ">
									{EventTitle}
									<br />
									<b style={{ textAlign: "right" }}>{EventDate}</b>
								</p>
							</div>
						</>
					);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
		return null;
	}
	function getDocID() {
		try {
			if (window.location.pathname.includes("calendar")) {
				// console.log(messages2[0].body);
				document.getElementById("WeeklyScheduleSpan").hidden = false;
				return (document.getElementById("WeeklyScheduleSpan").innerHTML =
					messages2[0].body);
			}
		} catch (error) { }
	}
	function handleInputChange(e) {
		seteventsFormDescription(e.target.value);
	}
	const isInitialMount = useRef(true);
	const dbDataRef = useRef(true);
	const eventsWithinDate = useRef(true);
	const loadStageRef = useRef(0);

	useEffect(() => {
		// console.log(contactFormName.length)
		console.log("State Refresh Stage " + loadStageRef.current);
		//
		if (loadStageRef.current === 3) {
			loadStageRef.current = 4;
		}
		if (loadStageRef.current === 4) {
			setTimeout(() => {
				loadStageRef.current = 0;
			}, 10);
		}

		//
		if (loadStageRef.current === 0) {
			eventsWithinDate.current = [];
			console.log("State Stage: " + loadStageRef.current);
			let dbData = {};
			var db = firebase.firestore();
			db
				.collection("EventsData")
				.get()
				.then((userData) => {
					userData.forEach((doc) => {
						var key = doc.id;
						var data = doc.data();
						data["key"] = key;
						dbData[key] = data;
					});
					dbDataRef.current = Object.values(dbData);
					// console.log(dbDataRef.current);
					loadStageRef.current = 1;
					setGotEventsData(dbDataRef.current);
				});
		}

		if (loadStageRef.current === 1) {
			eventsWithinDate.current = [];
			console.log("Stage 1 Confirm");
			if (dbDataRef.current.length > 0) {
				for (var i = 0; i < dbDataRef.current.length; i++) {
					// console.log(dbDataRef.current[i].EventDate);
					let gotDate = new Date(String(dbDataRef.current[i].EventDate));
					// console.log(setDate);
					// console.log(gotDate);
					let are24hFrom0 = new Date(new Date(setDate));
					are24hFrom0.setDate(are24hFrom0.getDate(setDate) - 1);
					var are24hFrom1 = new Date(setDate);
					are24hFrom1.setDate(are24hFrom1.getDate(setDate) + 1);
					if (gotDate >= are24hFrom0 && gotDate <= are24hFrom1) {
						//						console.log(" True ");
						eventsWithinDate.current.push(dbDataRef.current[i]);
						setSelectedDateEvents(eventsWithinDate.current);
						// console.log(selectedDateEvents);
						loadStageRef.current = 3;
						document.querySelector("#EventsWithinDateSpan").hidden = false;
					} else {
						setSelectedDateEvents([
							{
								EventTitle:
									"\r\n No Additonal Reserved Or Special Events Found At Date. \r \n\r \n You may also use the form below to request an event or meeting.",
							},
						]);

						loadStageRef.current = 3;
					}
				}
			}
		}
		isInitialMount.current = false;
	}, [gotEventsData, setDate, selectedDateEvents]);

	// useEffect(() => {
	// 	if (loadStageRef.current === 0) {
	// 		loadStageRef.current = 1;
	// 	}

	// 	let concData = [];
	// 	let concData2 = [];
	// 	let concData3 = [];
	// 	//
	// 	//
	// 	if (isInitialMount.current === false) {
	// 		console.log("Updating, Stage: " + loadStage);
	// 	} else {
	// 		if (loadStageRef.current === 1) {
	// 			const loadsnapshot = async () => {
	// 				const snapshot = await firebase.firestore().collection("EventsPage").get();
	// 				snapshot.forEach((doc) => {
	// 					concData = concData.concat({
	// 						[doc.id]: [doc.data()],
	// 					});

	// 					concData2 = concData2.concat(doc.id);
	// 				});
	// 				setloadedEvents(concData);
	// 				setloadedEventIDs(concData2);
	// 				loadStageRef.current = 2;
	// 			};
	// 			loadsnapshot();
	// 		}
	// 		if (loadStageRef.current === 2) {
	// 			if (loadedEvents.length < 2) {
	// 				console.log(loadedEvents);
	// 				for (var i = 0; i < loadedEvents.length; i++) {
	// 					localStorage.setItem("eventCounter", loadedEvents.length);
	// 					let gotDate = new Date(loadedEvents[i][loadedEventIDs[i]][0].EventDate);
	// 					let are24hFrom0 = new Date(new Date(setDate));
	// 					are24hFrom0.setDate(are24hFrom0.getDate(setDate) - 1);
	// 					var are24hFrom1 = new Date(setDate);
	// 					are24hFrom1.setDate(are24hFrom1.getDate(setDate) + 1);
	// 					if (gotDate >= are24hFrom0) {
	// 						if (gotDate <= are24hFrom1) {
	// 							concData3 = concData3.concat(
	// 								"\n" + loadedEvents[i][loadedEventIDs[i]][0].EventTitle
	// 							);
	// 							setSelectedDateEvents(
	// 								String(concData3)
	// 									.split("\n")
	// 									.map((str, index) => <h5 key={index}>{str}</h5>)
	// 							);
	// 							console.log(setSelectedDateEvents);
	// 							loadStageRef.current = 3;
	// 						}
	// 					} else {
	// 						return (loadStageRef.current = 3);
	// 					}
	// 				}
	// 			} else {
	// 				return (loadStageRef.current = 3);
	// 			}
	// 		}

	// 		loadStageRef.current = 1;
	// 		isInitialMount.current = false;
	// 	}
	// }, [loadStage, loadedEventIDs, loadedEvents, setDate]);

	return (
		<Fragment>
			<TransitionGroup
				component="div"
				transitionName="MainAnimation3"
				transitionAppear={true}
				transitionAppearTimeout={1000}
				transitionEnterTimeout={1000}
				transitionEnter={true}
				transitionLeave={false}
			>
				<Row style={{
					borderRadius: "0px",
					borderTopLeftRadius: "25px",
					borderTopRightRadius: "25px",
				}}  >
					<Card style={{
						width: "95%", position: "relative", left: "3px",
						boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
						backgroundColor: "#feffff",
						borderRadius: "0px",
						borderTopLeftRadius: "25px",
						borderTopRightRadius: "25px",
					}}>
						<CardHeader style={{
							textAlign: "center",
							borderRadius: "0px",
							borderTopLeftRadius: "25px",
							borderTopRightRadius: "25px",
						}}>
							<h3 style={{ textAlign: "center" }}>RayMauiYoga Calendar</h3>
						</CardHeader>
						<CardBody
							style={{
								boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
								width: "auto",
								fontSize: "16px",
								backgroundColor: "#feffff",
							}}
						>
							<h3>
								<b>Weekly Dates To Remember</b> <br />
								<br />
							</h3>
							<Col style={{ height: "auto", minHeight: "200px", width: "100%" }}>
								<span
									hidden
									id="WeeklyScheduleSpan"
									style={{
										width: "100%",
									}}
								>
									{getDocID()}
								</span>
							</Col>
							<Row>
								<Col>
									<h3>
										<b>Ray is also available for private sessions.</b>
									</h3>
									<br />
									<h5>
										<b>To get more info about Ray's private sessions: </b>
										<button
											onClick={() => {
												window.scrollTo({
													top: 2000,
													left: 100,
													behavior: "smooth",
												});
												setTimeout(() => {
													document.getElementById(
														"RequestMeetingInput"
													).style.backgroundColor = "#ddffff";

													setTimeout(() => {
														document.getElementById(
															"RequestMeetingInput"
														).style.backgroundColor = "#ffffff";
													}, 250);

													setFormValue(
														"Hello, Ray. \n My name is _ and I'm interested in speaking about your private sessions, please email or call me at _ "
													);
												}, 250);
											}}
											style={{ borderRadius: "5px" }}
										>
											{" "}
											Click Here{" "}
										</button>
									</h5>{" "}
								</Col>
							</Row>{" "}
							<br />
							<h3>
								<b>Special Events and Schedule:</b>
							</h3>
							<br />
							<Row>
								<Col id="EventCalendarSpan">
									<center>
										<b>Hawaiian Time Zone</b>
										<Calendar
											className="calendarVar"
											onChange={(e) => {

												setsetDate(
													new Date(new Date(e).setHours(12)).toLocaleTimeString([], {
														year: "numeric",
														month: "numeric",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit",
													})
												);
												setloadStage("2")
											}

											}
										/>
									</center>{" "}
								</Col>
								<Col id="EventsWithinDateSpan" style={{ height: "auto" }}>
									<br />
									{selectedDateEvents.map((el) => {
										return (
											<span style={{ width: "100%" }} key={"Event_" + el.EventTitle}>
												<pre
													style={{
														width: "100%",
														minWidth: "200px",
														whiteSpace: "pre-wrap",
													}}
												>
													<br />
													{el.EventDate}
													<br />
													{el.EventTitle}
													<br />
													{el.EventDescription}
													<br />
												</pre>{" "}
											</span>
										);
									})}
								</Col>
							</Row>
							<div style={{ textAlign: "left" }}>
								<div>
									<b>Selected Date:</b>
								</div>{" "}
								<input
									style={{
										width: "50%", maxWidth: "165px",
										backgroundColor: "#f5ffff",
									}}
									id="eventsFormDate"
									onChange={(e) => setsetDate(e.target.value)}
									value={setDate}
								></input>{" "}
								<br />
								<br />
								<br />
								<div>
									<h3>
										<b>Initiate a meeting with Ray:</b>
									</h3>
									<div hidden={formValue.length !== null && formValue.length < 1}> <span style={{ float: "right" }} >Contact Info:

										<input style={{ height: "55px" }}
											onChange={(e) => setContactFormName(e.target.value)}
											id="ContactInfoInput" value={contactFormName} /></span></div>
									&nbsp;
									<TextareaAutosize
										type="textarea"
										rowsMin={5}
										id="RequestMeetingInput"
										style={{
											textAlign: "center",
											borderRadius: "25px",
											whiteSpace: "wrap",
											backgroundColor: "#f5ffff",
											fontSize: "22px",
											width: "70%",
											position: "relative",
											top: "25px",
										}}
										value={formValue}
										onChange={(e) => setFormValue(e.target.value)}
										placeholder="Be Sure To Include Contact Information"
									/>
									&nbsp;
									<Button id="SendButton"
										color="primary"
										style={{
											height: "100%",
											minWidth: "75px",
											position: "relative",
											top: "-75px",
											left: "5px",
										}}
										className="buttonchat"
										type="submit"
										disabled={contactFormName && contactFormName.length < 3 || formValue.length < 3}
										onClick={() => {

											submitContact()

										}}
									>
										Send
									</Button>
								</div>
								&nbsp;
							</div>
						</CardBody>
					</Card></Row>
			</TransitionGroup>
		</Fragment>
	);
}

export default EventManagerComponent;
