import React, {
	Fragment,
	useState,
	useEffect,
	useRef,
	useCallback,
} from "react";

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

import { toast } from "react-toastify";

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
	const [loadedMuxData, setloadedMuxData] = useState(null);
	const [loadedEventIDs, setloadedEventIDs] = useState("");
	const [loadedPublic, setloadedPublic] = useState("");
	const [loadedIDData, setloadedIDData] = useState("");
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
	const [loadedVideoID, setloadedVideoID] = useState("1");
	const [loadedVideoCreatedDate, setloadedVideoCreatedDate] = useState(null);
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

	const loadStage = useRef(0);

	let dbData = {};
	let dbDataArray = [];
	let dbDataKeyArray = [];

	const loadVideoJS = useCallback(() => {
		if (loadStage.current === 3) {
			var playbackId = loadedPlaybackId;
			var url = "https://stream.mux.com/" + playbackId + ".m3u8";
			var video = document.getElementById("myVideo");
			if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = url;
				//
				// If no native HLS support, check if HLS.js is supported
				//
			} else if (Hls.isSupported()) {
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
	}, [loadedPlaybackId]);


	const sort_by = (field, reverse, primer) => {
		const key = primer
			? function (x) {
				return primer(x[field]);
			}
			: function (x) {
				return x[field];
			};

		reverse = !reverse ? 1 : -1;

		return function (a, b) {
			// eslint-disable-next-line no-sequences
			return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
		};
	};



	useEffect(() => {
		if (loadStage.current === 0) {
			loadStage.current = 1;
		}

		console.log("Updating, Stage: " + loadStage.current);
		if (isInitialMount.current === true) {
			console.log("Updating, Initial Mount: ");

			if (loadStage.current === 1) {
				firebase
					.firestore()
					.collection("VideoData").orderBy("Created")
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
						setloadedDescription(dbData[dbDataKeyArray[loadedEzID - 1]].Title);
						setloadedVideoID(dbData[dbDataKeyArray[loadedEzID - 1]].key);
						setloadedPlaybackId(dbData[dbDataKeyArray[loadedEzID - 1]].playbackId);
						setloadedVideoMeta(dbData[dbDataKeyArray[loadedEzID - 1]].meta);
						setloadedVideoCreatedDate(dbData[dbDataKeyArray[loadedEzID - 1]].Created);
						setreadyVideoMeta(loadedVideoMeta);
						setloadedTotalIDs(dbDataArray.length);
						setreadyDescription(loadedDescription);
						console.log(dbData);
						loadStage.current = 2;
					});
			}
			if (loadStage.current === 2) {
				setstatusVar(
					"Viewing " + categoryVar + " " + loadedEzID + " of: " + loadedTotalIDs
				);
				loadStage.current = 3;
			}
			if (loadStage.current === 3) {
				// require("firebase/functions");
				// firebase.functions().useEmulator("localhost", 5001);
				// var addMessage = firebase.functions().httpsCallable("addMessage");
				// addMessage({ text: "X" })
				// 	.then((result) => {
				// 		console.log("Mux API Query Results:");
				// 		console.log(result);
				// 		setloadedMuxData(result.data);

				// 		console.log(loadedMuxData);
				// 	})
				// 	.catch((error) => {
				// 		// Getting the Error details.
				// 		var code = error.code;
				// 		var message = error.message;
				// 		var details = error.details;
				// 		console.log(details, code, message);
				// 		// ...
				// 	});

				loadVideoJS();
				loadStage.current = 4;
			}
			if (loadStage.current === 4) {
				console.log("Fully Loaded");
			}
		}
	}, [
		categoryVar,
		dbData,
		dbDataArray,
		dbDataKeyArray,
		isLoadedOnce,
		loadStage,
		loadVideoJS,
		loadedDescription,
		loadedEzID,
		loadedMuxData,
		loadedSnapshotData,
		loadedTotalIDs,
		loadedVideoMeta,
	]);

	function sendAssetsToDatabase() {
		console.log(loadedMuxData);
		loadedMuxData.forEach((element) => {
			if (element.status !== "errored") {
				firebase
					.firestore()
					.collection("VideoData")
					.doc(element.id)
					.set(
						{
							Title: "",
							playbackId: String(element.playback_ids[0].id),
						},
						{ merge: true }
					);
			}
			console.log(element);
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

	// async function getData() {
	// 	require("firebase/functions");
	// 	var addMessage = firebase.functions().httpsCallable("addMessage");
	// 	addMessage({ text: "X" })
	// 		.then((result) => {
	// 			console.log(result);

	// 			setmuxAssetButtonText("Success");
	// 			// Read result of the Cloud Function.
	// 			console.log("Mux API Query Results:");
	// 			console.log(result);

	// 			setloadedMuxData(result.data);
	// 		})
	// 		.catch((error) => {
	// 			// Getting the Error details.
	// 			var code = error.code;
	// 			var message = error.message;
	// 			var details = error.details;
	// 			console.log(details, code, message);
	// 			// ...
	// 		});

	// 	console.log(String(loadedEzID));
	// 	firebase
	// 		.firestore()
	// 		.collection(categoryVar)
	// 		.doc(String(parseInt(loadedEzID - 1)))
	// 		.set({
	// 			Title: String(readyDescription),
	// 			playbackId: String(loadedPlaybackId),
	// 			meta: String(readyVideoMeta),
	// 		})
	// 		.then((loadStage.current = 1));
	// }

	function runSendData() {
		toast(
			<div>
				<div>
					<h1>Saving...</h1>
				</div>
			</div>,
			{ autoClose: 255 }
		);
		console.log(String(loadedEzID));
		firebase
			.firestore()
			.collection(categoryVar)
			.doc(String(loadedVideoID))
			.set({
				Title: String(readyDescription),
				playbackId: String(loadedPlaybackId),
				meta: String(readyVideoMeta),
			})
			.then((error) => {
				if (!error) {
					toast(
						<div>
							<div>
								<h1>Success!</h1>
								<h2>
									{
										(String(readyDescription),
											String(loadedPlaybackId),
											String(readyVideoMeta))
									}
								</h2>
							</div>
						</div>,
						{ autoClose: 2000 }
					);
					setloadedEzID(loadedEzID);
					loadStage.current = 1;
					formResetter();
				} else {
					toast(
						<div>
							<div>
								<h1>ERROR</h1>
								<h2>
									Please check your internet, or try reloading the web page for the
									latest site version.
								</h2>
							</div>
						</div>,
						{ autoClose: 255 }
					);
				}
			});
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
		} catch (error) { }
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
				<br />
				{streamKey}
				<h2>{statusVar}</h2>
				<small>ID #:</small>
				<input
					onChange={(e) => {
						setloadedEzID(e.target.value);
						loadStage.current = 1;
						formResetter();
					}}
					value={loadedEzID}
					name="loadedEzID"
					style={{ width: "45px" }}
				></input>
				&nbsp; &nbsp;
				<Button
					color="primary"
					onClick={() => {
						if (loadedEzID >= Object.values(loadedSnapshotData).length) {
							setloadedEzID(toInteger(loadedEzID) - 1);
							loadStage.current = 1;
						} else {
							setloadedEzID(Object.values(loadedSnapshotData).length);
							loadStage.current = 1;
						}
					}}
				>
					←
				</Button>{" "}
				&nbsp;
				<Button
					color="primary"
					onClick={() => {
						if (loadedEzID < Object.values(loadedSnapshotData).length) {
							setloadedEzID(toInteger(loadedEzID) + 1);
							loadStage.current = 1;
						} else {
							setloadedEzID(1);
							loadStage.current = 1;
						}
					}}
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
					onClick={() => {
						setloadedEzID(toInteger(loadedTotalIDs) + 1);
						loadStage.current = 2;
						seteditedDescription("");
						setloadedDescription("");
					}}
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
						<CardHeader>Moderator Video Controls:</CardHeader>{" "}
					</div>
					<small>
						<br />
						<b>Created Date: </b> {loadedVideoCreatedDate && String(new Date(parseInt(loadedVideoCreatedDate) * 1000)).split("(")[0]}
						<br />
						<b>VideoID:</b> {loadedVideoID}
						<br />
						<label><b>Choose Where This Displays:&nbsp; </b></label>
						<select
							onChange={(event) => {
								console.log(event);
								setreadyVideoMeta(event.target.value);
							}}
							value={readyVideoMeta === " " ? 0 : parseInt(readyVideoMeta)}
						>
							<option value={1}>Patrons Only</option>
							<option value={2}>Video Blog Page</option>
							<option value={3}>VideoBlog And Patrons</option>
							<option value={0}>Hidden</option>
						</select>
						<input
							hidden
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
					<video
						style={{ width: "90%" }}
						preload="false"
						src={loadedPlaybackId}
						id="myVideo"
						controls
					></video>
					<br />
				</div>
			</CardBody>
		</Fragment>
	);
}
export default VideoManagerComponent;
