import React, { Fragment, useState, useEffect, useRef } from "react";

import mux from "mux-embed";

import "hls.js";
import "hls.js/dist/hls.js";

import Hls from "hls.js";

import { Button, CardBody, CardHeader } from "reactstrap";

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

const REACT_APP_MUX_TOKEN_SECRET = process.env.REACT_APP_MUX_TOKEN_SECRET;
function VideoManagerComponent() {
	const [url, setURL] = useState("");
	const isInitialMount = useRef(true);
	const [noteVar, setnoteVar] = useState("");
	const [textVar2, settextVar2] = useState("Select an Instance To Begin");
	const [activeTab, setactiveTab] = useState("1");
	const [statusVar, setstatusVar] = useState("Viewing VideoData Data");
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
	const [loadedSnapshotData, setloadedSnapshotData] = useState([]);
	const [loadedSnapshotDataIDs, setloadedSnapshotDataIDs] = useState([]);
	const [loadedMuxData, setloadedMuxData] = useState([]);
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
	const [loadedPlaybackId, setloadedPlaybackId] = useState("1");
	const [streamKey, setstreamKey] = useState("");
	const [readyVideoMeta, setreadyVideoMeta] = useState("");
	const [isLoadedOnce, setisLoadedOnce] = useState("1");

	const [loadedVideoMeta, setloadedVideoMeta] = useState("");
	const [muxAssetButtonText, setmuxAssetButtonText] = useState("Get Mux Assets");
	const [gotDownloadURL, setgotDownloadURL] = useState(
		"Upload An Image To Embed"
	);
	const [categoryVar, setcategoryVar] = useState("VideoData");

	const [file, setFile] = useState(null);

	let dbData = {};
	let dbData2 = {};
	let dataArray = [];
	let dbDataArray = [];

	let dbDataKeyArray = [];

	useEffect(() => {
		console.log("Updating, Stage: " + loadStage);
		if (isInitialMount.current === true) {
			if (loadStage === "1") {
				if (loadedEzID > 0) {
					const loadsnapshot = async () => {
						await firebase
							.firestore()
							.collection(categoryVar)
							.get()
							.then((snapshot) => {
								snapshot.forEach((doc) => {
									var key = doc.id;
									var data = doc.data();
									data["key"] = key;
									dbData[key] = data;
									dbDataArray.push(data);
									dbDataKeyArray.push(data.key);
								});
								setloadedSnapshotData(dbData);
							});
					};
					loadsnapshot().then(async () => {
						try {
							if (loadedSnapshotData != "") {
								setloadedDescription(dbData[dbDataKeyArray[loadedEzID - 1]].Title);

								setloadedPlaybackId(dbData[dbDataKeyArray[loadedEzID - 1]].playbackId);

								setloadedVideoMeta(dbData[dbDataKeyArray[loadedEzID - 1]].meta);
							}
							console.log(dbDataArray.length);

							setreadyVideoMeta(loadedVideoMeta);
							setreadyDescription(loadedDescription);
						} catch (error) {}
						setloadedTotalIDs(dbDataArray.length);
						setloadStage("2");
					});
				}
			}
			if (loadStage === "2") {
				try {
					setisLoadedOnce("1");
				} catch (error) {
					console.log(error);
				}
				setstatusVar(
					"Viewing " + categoryVar + " " + loadedEzID + " of: " + loadedTotalIDs
				);
				setloadStage("3");
			}
			if (loadStage === "3") {
				if (isLoadedOnce === "1") {
					if (!window.location.hostname === "localhost") {
						require("firebase/functions");
						firebase.functions().useEmulator("localhost", 5001);
						var addMessage = firebase.functions().httpsCallable("addMessage");
						addMessage({ text: "X" })
							.then((result) => {
								console.log("Mux API Query Results:");
								console.log(result);
								// Read result of the Cloud Function.
								const tempVar = [];
								result.data.forEach((element) => {
									tempVar.push(element.playback_ids[0].id);
								});

								setloadedMuxData(tempVar);

								console.log(loadedMuxData);
							})
							.catch((error) => {
								// Getting the Error details.
								var code = error.code;
								var message = error.message;
								var details = error.details;
								console.log(details, code, message);
								// ...
							});
					}

					loadVideoJS();
					setloadStage("4");
					setisLoadedOnce("2");
				}
			}
			if (loadStage === "4") {
				console.log("Fully Loaded");
			}
		}
	});

	function sendAssetsToDatabase() {
		let splitted = [];
		console.log(loadedMuxData);

		loadedMuxData.split(`[{"policy":"public","id":"`).forEach((element) => {
			if (element != "") {
				splitted.push(element.split(`"}],"mp4_support":"standard"`)[0]);
			}
		});

		// if (splitted != "") {
		//   if (splitted.length < 120) {
		//     splitted.forEach((element) => {
		//       firebase
		//         .firestore()
		//         .collection("VideoData")
		//         .doc(element)
		//         .set({
		//           Title: "",
		//           playbackId: String(element),
		//           meta: "",
		//         });
		//     });
		//   }
		// }
	}

	function copyImgURL() {
		var copyText = document.getElementById("copyImgURLElement");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");

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
		const uploadTask = storage.ref(`/listings/${file.name}`).put(file);
		uploadTask.on("state_changed", console.log, console.error, () => {
			storage
				.ref("listings")
				.child(file.name)
				.getDownloadURL()
				.then((url) => {
					setFile(null);
					setURL(url);
					setloadedImgURL(url);
				});
		});
	}

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	function loadVideoJS() {
		if (loadStage === "3") {
			var playbackId = loadedPlaybackId;
			var url = "https://stream.mux.com/" + playbackId + ".m3u8";
			var video = document.getElementById("myVideo");

			if (Hls.isSupported()) {
				// HLS.js-specific setup code
				let hls = new Hls();
				hls.loadSource(url);
				hls.attachMedia(video);
			}
			if (typeof mux !== "undefined") {
				mux.monitor("#myVideo", {
					data: {
						env_key: process.env.REACT_APP_MUX_TOKEN_SECRET, // required
						// Metadata
						player_name: "Custom Player", // ex: 'My Main Player'
						player_init_time: window.muxPlayerInitTime, // ex: 1451606400000

						// ... and other metadata
					},
				});
			}
		}
		const Mux = require("@mux/mux-node");
		const muxClient = new Mux(
			process.env.REACT_APP_MUX_TOKEN_ID,
			process.env.REACT_APP_MUX_TOKEN_SECRET
		); // Success!
	}
	function componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}
	async function getData() {
		require("firebase/functions");
		var addMessage = firebase.functions().httpsCallable("addMessage");
		addMessage({ text: "X" })
			.then((result) => {
				console.log(result);

				setmuxAssetButtonText("Success");
				// Read result of the Cloud Function.
				console.log("Mux API Query Results:");
				console.log(result);
				const tempVar = [];
				result.data.forEach((element) => {
					tempVar.push(element.playback_ids[0].id);
				});
				setloadedMuxData(tempVar);
			})
			.catch((error) => {
				// Getting the Error details.
				var code = error.code;
				var message = error.message;
				var details = error.details;
				console.log(details, code, message);
				// ...
			});
	}

	function handleInputChange(event) {
		this.setState({
			noteVar: event.target.value,
		});
	}
	function handleInputChange2(event) {
		this.setState({
			deleteIDVar: event.target.value,
		});
	}

	function runSendData() {
		console.log(String(loadedEzID));
		firebase
			.firestore()
			.collection(categoryVar)
			.doc(String(parseInt(loadedEzID - 1)))
			.set({
				Title: String(readyDescription),
				playbackId: String(loadedPlaybackId),
				meta: String(readyVideoMeta),
			})
			.then(setloadStage("1"));
	}

	function runDeleteData() {
		var answer = window.confirm("Are you sure you want to delete " + loadedEzID);
		if (answer) {
			const loadsnapshot = async () => {
				await firebase
					.firestore()
					.collection(categoryVar)
					.get()
					.then((snapshot) => {
						snapshot.forEach((doc) => {
							var key = doc.id;
							var data = doc.data();
							data["key"] = key;
							dbData[key] = data;
							dbDataArray.push(data);
							dbDataKeyArray.push(data.key);
						});
						setloadedSnapshotData(dbData);
					});
			};
			loadsnapshot().then(async () => {
				console.log(String(loadedEzID));

				console.log(dbDataArray[loadedEzID - 1]);
				// firebase
				//   .firestore()
				//   .collection(categoryVar)
				//   .doc(String(loadedEzID - 1))
				//   .delete()
				//   .then(
				//     setloadStage("1") &
				//       setloadedTotalIDs(loadedTotalIDs - 1) &
				//       formResetter()
				//   );
			});
		} else {
			//some code
		}
	}
	function formResetter() {
		try {
			setloadedTitle("");
			setloadedVideoMeta("");
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
			<CardBody>
				<h1>Video Manager</h1>
				<b>Personal Stream Key: </b>
				<br />
				<button
					onClick={() => {
						setstreamKey(
							" rtmp://global-live.mux.com:5222/app/041dcc7a-aef5-d808-4217-9daa0d39fdbd"
						);
					}}
				>
					Show Private Key
				</button>
				{streamKey}
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
				<Button color="success" onClick={() => runSendData()}>
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
				<Button color="danger" onClick={() => runDeleteData() & setloadedEzID(1)}>
					Delete
				</Button>
				<br />
				<br />
				<div
					style={{
						boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
					}}
				>
					<div
						style={{
							textAlign: "center",
						}}
					>
						<CardHeader>Content View:</CardHeader>{" "}
					</div>
					<br /> Load this first:
					<Button onClick={() => getData() & setmuxAssetButtonText("Loading...")}>
						{muxAssetButtonText}
					</Button>
					&nbsp;Then this:
					<Button
						disabled={loadedMuxData.length < 2}
						onClick={() => sendAssetsToDatabase() & setloadStage("1")}
					>
						Send Assets To Database
					</Button>
					<br />
					<input
						placeholder="Data Will Propagate Here"
						value={loadedMuxData}
					></input>
					<br />
					<video
						style={{ width: "90%" }}
						preload="false"
						src={loadedPlaybackId}
						id="myVideo"
						controls
					></video>
					<br />
					<small>
						<br />
						VideoID: {loadedPlaybackId}
						<br /> Meta:
						<input
							onChange={(event) => setreadyVideoMeta(event.target.value)}
							value={readyVideoMeta}
						></input>
						<br />
						Title:
						<input
							onChange={(event) => setreadyDescription(event.target.value)}
							value={readyDescription}
						></input>
					</small>
				</div>
			</CardBody>
		</Fragment>
	);
}
export default VideoManagerComponent;
