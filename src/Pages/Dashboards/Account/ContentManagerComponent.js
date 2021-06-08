import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";

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
} from "reactstrap";
import axios from "axios";
import CKEditor from "ckeditor4-react";

import FireBaseImageUpload from "./firebaseImageUpload";

import { reverse, toInteger } from "lodash";
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
function ContentManagerComponent() {
	const [url, setURL] = useState("");
	const isInitialMount = useRef(true);
	const [noteVar, setnoteVar] = useState("");
	const [textVar2, settextVar2] = useState("Select an Instance To Begin");
	const [textVar, settextVar] = useState("Select an Instance To Begin");
	const [statusVar, setstatusVar] = useState("Viewing HomePage Data");
	const [onlineButton, setonlineButton] = useState("Go Online");
	const [purgeButton, setpurgeButton] = useState("Clear Old Instances");
	const [proStatusText, setproStatusText] = useState("Loading...");
	const [selectByIDVar, setselectByIDVar] = useState("0");
	const [loadedImgURL, setloadedImgURL] = useState("");
	const [readyImgURL, setreadyImgURL] = useState("");
	const [loadedDescription, setloadedDescription] = useState("");
	const [editedDescription, seteditedDescription] = useState("");
	const [loadedLocationData, setloadedLocationData] = useState("");
	const [getDataEZID, setgetDataEZID] = useState("");
	const [ChangeImageURLVar, setChangeImageURLVar] = useState("");
	const [loadedCreatorData, setloadedCreatorData] = useState("");
	const [loadedGMapCoords, setloadedGMapCoords] = useState("");
	const [loadedTitle, setloadedTitle] = useState("");
	const [loadedEvents, setloadedEvents] = useState([]);
	const [loadedEventIDs, setloadedEventIDs] = useState("");
	const [loadedPublic, setloadedPublic] = useState("");
	const [loadedIDData, setloadedIDData] = useState("");
	const [loadStage, setloadStage] = useState("1");
	const [loadedTitleData, setloadedTitleData] = useState("");

	const [hasReceivedImgURL, sethasReceivedImgURL] = useState(false);
	const [readyCreator, setreadyCreator] = useState("");
	const [readyTitle, setreadyTitle] = useState("");
	const [readyDescription, setreadyDescription] = useState("");
	const [readyID, setreadyID] = useState("");
	const [readyPublic, setreadyPublic] = useState("");
	const [loadedEzID, setloadedEzID] = useState("1");
	const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
	const [gotDownloadURL, setgotDownloadURL] = useState(
		"Upload An Image To Embed"
	);
	const [categoryVar, setcategoryVar] = useState("HomePage");
	const [isLoadedOnce, setisLoadedOnce] = useState("1");
	const [file, setFile] = useState(null);

	const loadStageRef = useRef(0);

	useEffect(() => {
		console.log(loadedEvents);
		console.log(loadStageRef.current);
		console.log(loadedEvents);

		console.log("State Refresh");
		//loads last, EveryTime
		// console.log("Running UseEffect2");
		// Listen To Snapshot & Update

		if (loadStageRef.current === 0) {
			loadStageRef.current = 1;
		}

		if (loadStageRef.current === 1) {
			console.log("State Stage: " + loadStageRef.current);
			let concData = [];
			let concData2 = [];
			let dbData = {};
			let imgSrcArray = [];
			let gotLoadedObjectData = [];
			let gameObjectData = {};
			var db = firebase.firestore();
			db
				.collection(categoryVar)
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						concData = concData.concat({
							[doc.id]: [doc.data()],
						});
						concData2 = concData2.concat(doc.id);
					});
					setloadedEvents(concData);
					setloadedEventIDs(concData2);
					loadStageRef.current = 2;
				});
		}
		if (loadStageRef.current === 2) {
			try {
				setloadedTotalIDs(loadedEvents.length);
				setloadedDescription(
					String(loadedEvents[loadedEzID - 1][loadedEzID - 1][0].body)
				);
				seteditedDescription(
					String(loadedEvents[loadedEzID - 1][loadedEzID - 1][0].body)
				);
			} catch (error) {
				console.log(error);
			}
			loadStageRef.current = 3;

			setstatusVar(
				"Viewing " + categoryVar + " " + loadedEzID + " of: " + loadedTotalIDs
			);
		}
		if (loadStageRef.current === 3) {
			setloadStage("4");
			loadStageRef.current = 4;
		}
		if (loadStageRef.current === 4) {
			loadStageRef.current = 0
			console.log("Finished Loading!");
		}

		isInitialMount.current = false;
	}, [categoryVar, loadStage, loadedEvents, loadedEzID, loadedTotalIDs]);

	function onEditorChange(evt) {
		loadStageRef.current = 3;

		console.log(evt.editor.getData());
		seteditedDescription(evt.editor.getData());
		setloadedDescription(evt.editor.getData());
	}
	function copyImgURL() {
		var copyText = document.getElementById("copyImgURLElement");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
		navigator.clipboard.writeText(copyText.value).then(
			function () {
				console.log("Async: Copying to clipboard was successful!");
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			}
		);

		var tooltip = document.getElementById("myTooltip");
		tooltip.innerHTML = "Copied: " + copyText.value;
	}

	function outFunc() {
		var tooltip = document.getElementById("myTooltip");
		tooltip.innerHTML = "Copy to clipboard";
	}
	function handleUpload(e) {
		const storage = firebase.storage();
		e.preventDefault();
		const uploadTask = storage.ref(`/images/${file.name}`).put(file);
		uploadTask.on("state_changed", console.log, console.error, () => {
			storage
				.ref("images")
				.child(file.name)
				.getDownloadURL()
				.then((url) => {
					setFile(null);
					setURL(url);
					setloadedImgURL(url);
					sethasReceivedImgURL(true);
				});
		});
	}

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	function runSendData() {
		console.log(String(loadedEzID));
		firebase
			.firestore()
			.collection(categoryVar)
			.doc(String(loadedEzID - 1))
			.set({ body: String(editedDescription) });
	}

	function runDeleteData() {
		var answer = window.confirm("Are you sure you want to delete " + loadedEzID);
		if (answer) {
			console.log(String(loadedEzID));
			firebase
				.firestore()
				.collection(categoryVar)
				.doc(String(loadedEzID - 1))
				.delete()
				.then(setloadStage("1") & setloadedTotalIDs(loadedTotalIDs - 1));
		} else {
			//some code
		}
	}
	function formResetter() {
		try {
			document.forms[1].reset();
			document.forms[2].reset();
			document.forms[3].reset();
			document.forms[4].reset();
			document.forms[5].reset();
			setgotDownloadURL(localStorage.getItem("gotDownloadURL"));
		} catch (error) {}
	}

	function handleImageUploadState() {
		if (gotDownloadURL === "Upload An Image To Embed") {
			return <div>{gotDownloadURL}</div>;
		} else {
			// User Has URL
			return <div>{gotDownloadURL}</div>;
		}
	}
	return (
		<Fragment>
			<Card>
				<h1>Content&nbsp;Manager</h1>
				<CardBody>
					<span>
						<Button
							color="primary"
							onClick={() =>
								setcategoryVar("HomePage") & setloadStage("1") & setloadedEzID("1")
							}
						>
							HomePage
						</Button>{" "}
						&nbsp;
						<Button
							color="primary"
							onClick={() => {
								setcategoryVar("BlogPage");
								setloadStage("1");
								setloadedEzID("1");
								loadStageRef.current = 1;
							}}
						>
							BlogPage
						</Button>{" "}
						&nbsp;
						<Button
							color="primary"
							onClick={() =>
								setcategoryVar("EventsPage") & setloadStage("1") & setloadedEzID("1")
							}
						>
							EventsPage
						</Button>
					</span>
					<h2>{statusVar}</h2>
					<small>ID #:</small>
					<input
						onChange={(e) =>
							setloadedEzID(e.target.value) & setloadStage("1") & formResetter()
						}
						value={loadedEzID}
						name="loadedEzID"
						style={{ width: "45px" }}
					></input>
					&nbsp; &nbsp;
					<Button
						color="primary"
						onClick={() =>
							setloadedEzID(toInteger(loadedEzID) - 1) & setloadStage("1")
						}
					>
						←
					</Button>{" "}
					&nbsp;
					<Button
						color="primary"
						onClick={() =>
							setloadedEzID(toInteger(loadedEzID) + 1) & setloadStage("1")
						}
					>
						→
					</Button>{" "}
					&nbsp;
					<Button color="success" onClick={() => runSendData() & setloadStage("1")}>
						Save
					</Button>{" "}
					&nbsp;
					<Button
						color="secondary"
						onClick={() =>
							setloadedEzID(toInteger(loadedTotalIDs) + 1) &
							setloadStage("2") &
							seteditedDescription("") &
							setloadedDescription("")
						}
					>
						New
					</Button>{" "}
					&nbsp;
					<Button
						color="danger"
						onClick={() => runDeleteData() & setloadedEzID(1) & setloadStage("2")}
					>
						Delete
					</Button>
					<br />
					<br />{" "}
					<div
						style={{
							boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
							width: "100%",
						}}
					>
						<div
							style={{
								width: "100%",
								textAlign: "center",
							}}
						>
							<CardHeader>Content View:</CardHeader>{" "}
						</div>{" "}
						<small>
							<div
								className="listingExample"
								dangerouslySetInnerHTML={{
									__html: editedDescription,
								}}
							/>
						</small>
					</div>
					&nbsp;
					<br />
					<div
						style={{
							width: "100%",
							boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
							textAlign: "center",
						}}
					>
						<CardHeader>Content Editor Tools:</CardHeader>{" "}
						<CKEditor onChange={onEditorChange} data={loadedDescription} /> <br />{" "}
					</div>
					<br />
					<div
						style={{
							boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
						}}
					>
						<b> Upload An Image:</b> <br />
						<form role="imgForm" name="imgForm" id="imgForm" onSubmit={handleUpload}>
							<input type="file" onChange={handleChange} />
							<Button
								hidden={!file}
								fill="true"
								color="primary"
								disabled={!file}
								style={{
									alignSelf: "center",
									justifySelf: "center",
									display: "block",
									position: "relative",
									width: "55%",
								}}
								type="submit"
							>
								<h5 style={{ position: "relative", top: "-2px" }}>Upload Image</h5>
							</Button>{" "}
						</form>
						<img
							hidden={!hasReceivedImgURL}
							style={{ maxWidth: "100%" }}
							src={url}
							alt=""
						/>
						<input
							disabled={true}
							hidden={!hasReceivedImgURL}
							type="text"
							value={loadedImgURL}
							id="copyImgURLElement"
						/>{" "}
						&nbsp;
						<div hidden={!hasReceivedImgURL} className="tooltip2">
							<button onClick={() => copyImgURL()} onMouseOut={() => outFunc()}>
								<span className="tooltip2text" id="myTooltip">
									Copy to clipboard
								</span>
								Copy text
							</button>
						</div>
					</div>
				</CardBody>
			</Card>
		</Fragment>
	);
}
export default ContentManagerComponent;
