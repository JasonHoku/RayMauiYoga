import React, { Component, Fragment, useState, useEffect, useRef, useCallback } from "react";

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
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

function EventManagerComponent() {
	const [loadStage, setloadStage] = useState("1");
	const [eventTitleState, setEventTitleState] = useState("");

	const [eventDate, setEventDate] = useState(
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


	const [eventDescriptionState, setEventDescriptionState] = useState("");
	const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
	const [loadedEzID, setloadedEzID] = useState("1");
	const [statusVar, setStatusVar] = useState("Viewing EventsData ");

	const auth = firebase.auth();
	const firestore = firebase.firestore();

	const messagesRef = firestore.collection("EventsData");
	const query2 = messagesRef.orderBy("EventDate").limitToLast(100);
	const [EventDataReference] = useCollectionData(query2);


	const sendMessage = async (e) => {
		e.preventDefault();

		const { uid } = auth.currentUser;
		try {

			await messagesRef.add({
				EventTitle: eventTitleState,
				eventDescriptionState: eventDescriptionState,
				EventDate: eventDate,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid,
			}).then((el, error) => {

				console.log(el, error);

				setEventDescriptionState("");;

			})

		} catch (error) {

			alert("Error Adding Date \n" + JSON.stringify(error))
			console.log("caught error");
			console.log(error);
		}
	};

	function EventDataSelectedDate(props) {
		const auth = firebase.auth();
		const firestore = firebase.firestore();
		const { EventDate, EventTitle, id } = props.message;
		const dex = props.index;

		const messageClass = "sent";

		for (var i = 0; i < EventDataReference.length; i++) {
			let gotDate = new Date(EventDate);
			let are24hFrom0 = new Date(new Date(eventDate));
			are24hFrom0.setDate(are24hFrom0.getDate(eventDate) - 1);
			var are24hFrom1 = new Date(eventDate);
			are24hFrom1.setDate(are24hFrom1.getDate(eventDate) + 1);
			if (gotDate >= are24hFrom0) {
				if (gotDate <= are24hFrom1) {
					return (
						<>
							<div >
								&nbsp; ID: {parseInt(dex) + 1}
								<br />
								{EventTitle}
								<br />
								<div style={{ textAlign: "right" }}><b>{EventDate}</b></div>
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

	const getDocDate = useCallback(() => {
		try {
			setEventDate(EventDataReference[parseInt(loadedEzID) - 1].EventDate);
		} catch (error) { }
	}, [loadedEzID, EventDataReference])
	//
	const getDocTitle = useCallback(() => {
		try {
			setEventTitleState(EventDataReference[parseInt(loadedEzID) - 1].EventTitle);
		} catch (error) { }
	}, [loadedEzID, EventDataReference])
	//

	//
	const getDocDescription = useCallback(() => {
		try {
			setEventDescriptionState(EventDataReference[parseInt(loadedEzID) - 1].EventDescription);
		} catch (error) { }
	}, [loadedEzID, EventDataReference])
	//




	function runSendData() {
		if (EventDataReference[parseInt(loadedEzID) - 1]) {
			console.log(EventDataReference)

		}
		//
		if (window.confirm(`
		\n Save:
		\n	${eventTitleState}
		\n
		`)) {
			firebase.firestore().collection("EventsData").doc(eventTitleState).set({
				EventTitle: eventTitleState,
				EventDescription: eventDescriptionState,
				EventDate: eventDate,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			}).then(() => {

			});
		} else {

			// Cancel
		}
	}

	function runDeleteData() {
		var answer = window.confirm(
			"Are you sure you want to delete " + loadedEzID
		);
		if (answer) {
			console.log(String(loadedEzID));
			firebase
				.firestore()
				.collection("EventsData")
				.doc(getDocTitle() || eventTitleState)
				.delete()
				.then(setloadStage("2") & setloadedTotalIDs(loadedTotalIDs - 1));
		} else {
		}
	}
	const isInitialMount = useRef(true);

	useEffect(() => {

		console.log(eventTitleState)
		console.log(eventDescriptionState)


		if (EventDataReference) {

			console.log(EventDataReference.length)
			setStatusVar("Viewing " + loadedEzID + " Of " + EventDataReference.length)
		}

		console.log("XYZ")
		if (isInitialMount.current === true) {
			console.log("XYZ Updating, Stage: " + loadStage);
			if (loadStage === "1") {
				getDocDate();
				getDocTitle();
				getDocDescription();
				if (EventDataReference) {
					setloadStage("2");
				}
			}
			if (loadStage === "2") {
				setloadStage("3");
			}
		}
	}, [eventTitleState, eventDescriptionState, getDocDate, getDocTitle, loadStage, EventDataReference, loadedEzID, getDocDescription]);

	return (
		<Fragment>
			<Card style={{ width: "100%" }}>
				<CardHeader style={{ textAlign: "center" }}>
					<h3 style={{ textAlign: "center" }}>Event Manager</h3>
				</CardHeader>
				<CardBody
					style={{
						width: "100%",
						boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
						width: "auto",
						fontSize: "16px",
					}}
				>
					<h5 style={{ textAlign: "left" }}>
						Events always flow to HomePage and Schedule with a Title and
						optionally generate their own page with additional data.
					</h5>
					<center>
						<b>Hawaiian Time Zone</b>
						<Calendar
							onChange={(e) => {





								setEventDate(
									new Date(new Date(e).setHours(12)).toLocaleTimeString([], {
										year: "numeric",
										month: "numeric",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})
								);
								console.log(eventDate)

								setloadStage("2")
							}
							}
						/>
					</center>{" "}
					<br />
					{statusVar}
					<br />
					ID #: &nbsp;
					<input
						onChange={(e) => setloadedEzID(e.target.value) & setloadStage("1")}
						value={loadedEzID}
						name="loadedEzID"
						style={{ width: "45px" }}
					></input>
					&nbsp; &nbsp;
					<Button
						style={{ marginBottom: "5px" }}
						color="primary"
						onClick={() => {

							if (parseInt(loadedEzID) - 1 > 0)
								setloadedEzID(parseInt(loadedEzID) - 1);


							setloadStage("1")
						}
						}
					>
						←
					</Button>{" "}
					&nbsp;
					<Button
						style={{ marginBottom: "5px" }}
						color="primary"
						onClick={() => {

							console.log(loadedTotalIDs)
							console.log(loadedEzID)
							if (parseInt(loadedEzID) + 1 < parseInt(EventDataReference.length + 1)) {
								setloadedEzID(parseInt(loadedEzID) + 1);
							} else {
								if (window.confirm("Create New Event?")) {

									setloadedEzID(parseInt(loadedTotalIDs) + 1);
									setloadStage("2");
									setEventTitleState("");
									setEventDescriptionState("");


								}
							}
							setloadStage("1")
						}
						}
					>
						→
					</Button>{" "}
					&nbsp;
					<Button
						style={{ marginBottom: "5px" }}
						color="success"
						onClick={() => {

							runSendData();

						}}
					>
						Save
					</Button>{" "}
					&nbsp;
					<Button
						style={{ marginBottom: "5px" }}
						color="secondary"
						onClick={() => {
							setloadedEzID(parseInt(loadedTotalIDs) + 1);
							setloadStage("2");
							setEventTitleState("");
							setEventDescriptionState("");

						}
						}
					>
						New
					</Button>{" "}
					&nbsp;
					<Button
						style={{ marginBottom: "5px" }}
						color="danger"
						onClick={() => runDeleteData() & setloadStage("2")}
					>
						Delete
					</Button>
					<br />
					<div style={{ textAlign: "left" }}>
						<div>
							<b>Selected Date:</b>
						</div>{" "}
						<br />
						<input
							style={{ width: "50%" }}
							id="eventsFormDate"
							onChange={(e) => setEventDate(e.target.value)}
							value={eventDate}
						></input>{" "}
						<br />
						<br />			<div>
							<b>Event Title:</b>
						</div>{" "}
						<br />
						<input
							style={{ width: "50%" }}
							id="eventsFormDate"
							onChange={(e) => setEventTitleState(e.target.value)}
							value={eventTitleState}
						></input>{" "}
						<br />
						<br />
						<div>
							<b>Event Description:</b>
							<form onSubmit={sendMessage}>
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
										width: "100%",
										position: "relative",
									}}
									value={eventDescriptionState}
									onChange={(e) => setEventDescriptionState(e.target.value)}
								/>
							</form>
						</div>
						&nbsp;
					</div>
					<br />
					<h5>
						<b>Events Within 24h of Selected Day:</b>
					</h5>
					<br />
					{EventDataReference &&
						EventDataReference.map((msg, index) => (
							<EventDataSelectedDate index={index} key={msg.id} message={msg} />
						))}
					<br />
				</CardBody>
			</Card>
		</Fragment>
	);
}

export default EventManagerComponent;
