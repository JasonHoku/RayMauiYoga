import React, {
	Component,
	Fragment,
	useState,
	useEffect,
	useRef,
	useCallback,
} from "react";

import PayPalButton from "./PayPalExpress";

import { toInteger } from "lodash";

import classnames from "classnames";
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
	CardTitle,
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
	CardLink,
	CardImg,
	NavLink,
	TabContent,
	TabPane,
	Progress,
	CardFooter,
	ButtonGroup,
} from "reactstrap";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import mux from "mux-embed";

import "hls.js";
import "hls.js/dist/hls.js";

import Hls from "hls.js";

var firebaseConfig = process.env.REACT_APP_FIREBASE;

function AccountElements() {
	const [activeTab, setactiveTab] = useState("1");
	const [formTitle, setformTitle] = useState("");
	const [formName, setformName] = useState("");
	const [formCategory, setformCategory] = useState("");
	const [formLoc, setformLoc] = useState("");
	const [editedDescription, seteditedDescription] = useState("");
	const [gotDownloadURL, setgotDownloadURL] = useState("");
	const [formGMapCoords, setformGMapCoords] = useState("");
	const [hasLoaded, sethasLoaded] = useState("1");
	const [readyPaymentCost, setreadyPaymentCost] = useState("2");
	const [readyPaymentItems, setreadyPaymentItems] =
		useState("Tier 1: $2 / Month");
	const [formPublicType, setformPublicType] = useState("");
	const [loadedVideoTitle, setloadedVideoTitle] = useState("");
	const [sendCommentButtonText, setsendCommentButtonText] =
		useState("Send Message");

	const [loadedPlaybackId, setloadedPlaybackId] = useState(null);

	const [formDesc, setformDesc] = useState("");

	const [videoNavString, setVideoNavString] = useState("Loading...");

	const [intervalId, setintervalId] = useState("");
	const [finListButton, setfinListButton] = useState("Fill Form Entirely");
	const [finListButtonStatus, setfinListButtonStatus] = useState(
		"Form Not Filled Entirely"
	);

	const [payPalResponse, setPayPalResponse] = useState(null);
	const [loadedEzID, setloadedEzID] = useState(0);
	const [userDataRes, setUserDataRes] = useState(null);

	const [seconds, setSeconds] = useState(0);

	const [patronVideoCount, setPatronVideoCount] = useState(0);

	const [loadedPatronEzId, setLoadedPatronEzId] = useState(1);

	const isInitialMount = useRef(true);
	const hasPayPalLaunched = useRef(false);

	const isNavForward = useRef(true);

	const auth = firebase.auth();

	const [loadState, setLoadState] = useState(0);
	const loadStage = useRef(0);
	const loadVideoStage = useRef(0);

	const loadVideoJS = useCallback(() => {
		if (loadVideoStage.current === 1) {
			console.log("State Up " + loadStage.current);
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
						env_key: process.env.REACT_APP_MUX_TOKEN_SECRET,
						player_name: "Custom Player",
						player_init_time: window.muxPlayerInitTime,
					},
				});

				return (loadVideoStage.current = 3);
			}
		}
	}, [loadedPlaybackId]);

	useEffect(() => {
		console.log("State Up " + loadStage.current);

		if (loadVideoStage.current === 1) {
			loadVideoJS();
			loadVideoStage.current = 2;
		}
		if (loadVideoStage.current === 1) {
			console.log("Finished Loading Patron Video");
		}

		if (hasPayPalLaunched.current === undefined) {
			hasPayPalLaunched.current = false;
		} else {
			if (hasPayPalLaunched.current === false) {
				if (payPalResponse !== null) {
					window.open(payPalResponse.links[1].href, "_blank");
					hasPayPalLaunched.current = true;
					document.getElementById("UpgradeAccountButton").innerHTML =
						"PayPal Opened In New Window";
				}
			}
		}

		if (isInitialMount.current === false) {
			console.log("Init State2 " + loadStage.current);
		} else {
			// Runs Once Upon Mount

			isNavForward.current = true;

			//
			console.log("Init State " + loadStage.current);
			var dbData = {};
			var db = firebase.firestore();
			db
				.collection("UserDocs")
				.doc(auth.currentUser.uid)
				.get()
				.then((doc) => {
					dbData = doc.data();
					if (dbData === undefined) {
						db.collection("UserDocs").doc(auth.currentUser.uid).set({
							uid: auth.currentUser.uid,
							displayName: auth.currentUser.displayName,
							meta: 0,
						});
					}

					console.log(dbData);
					setUserDataRes(dbData);
				});
		}
		isInitialMount.current = false;
	}, [
		auth.currentUser.displayName,
		auth.currentUser.uid,
		loadVideoJS,
		payPalResponse,
	]);

	function RenderPatronDisplay() {
		let dbData = {};
		firebase
			.firestore()
			.collection("VideoData")
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var key = doc.id;
					var data = doc.data();
					data["key"] = key;
					dbData[key] = data;
				});

				if (Object.values(dbData)[loadedEzID]) {
					if (Object.values(dbData)[loadedEzID].meta) {
						if (parseInt(Object.values(dbData)[loadedEzID].meta) === 1 || parseInt(Object.values(dbData)[loadedEzID].meta) === 3) {
							console.log(Object.values(dbData));

							let tempVar = 0;
							Object.values(dbData).forEach((el) => {
								if (parseInt(el.meta) === 1 || parseInt(el.meta) === 3) {
									tempVar += 1;
								}
							});

							setPatronVideoCount(tempVar);
							setVideoNavString("Viewing " + loadedPatronEzId + " Of " + tempVar);
							console.log(patronVideoCount);
							//

							loadVideoStage.current = 1;
							setloadedPlaybackId(
								String(Object.values(dbData)[loadedEzID].playbackId)
							);
							setloadedVideoTitle(String(Object.values(dbData)[loadedEzID].Title));
							loadVideoStage.current = 1;
						} else {
							console.log(isNavForward.current);
							// Not On Visible, Adjust
							if (isNavForward.current) {
								setloadedEzID(toInteger(loadedEzID) + 1);
								loadVideoStage.current = 0;
							} else {
								if (loadedPatronEzId <= 0) {
									setloadedEzID(Object.values(dbData).length);
									setLoadedPatronEzId(patronVideoCount);
								} else {
									setloadedEzID(toInteger(loadedEzID) - 1);
								}
							}
						}
					} else {
						console.log(isNavForward.current);
						if (isNavForward.current) {
							if (loadedPatronEzId > patronVideoCount) {
								setloadedEzID(0);
								setLoadedPatronEzId(1);
							} else {
								setloadedEzID(toInteger(loadedEzID) + 1);
								setLoadedPatronEzId(loadedPatronEzId + 1);
							}
						} else {
							if (loadedPatronEzId <= 0) {
								setloadedEzID(Object.values(dbData).length);
								setLoadedPatronEzId(patronVideoCount);
							} else {
								if (loadedPatronEzId <= 0) {
									setloadedEzID(Object.values(dbData).length);
									setLoadedPatronEzId(patronVideoCount);
								} else {
									setloadedEzID(toInteger(loadedEzID) - 1);
									setLoadedPatronEzId(loadedPatronEzId - 1);
								}
							}
						}
						loadVideoStage.current = 0;
					}
				} else {
					console.log(isNavForward.current);
					if (isNavForward.current) {
						if (loadedPatronEzId > patronVideoCount) {
							setloadedEzID(0);
							setLoadedPatronEzId(1);
							loadVideoStage.current = 0;
						} else {
							setloadedEzID(toInteger(loadedEzID) + 1);
							setLoadedPatronEzId(loadedPatronEzId + 1);
						}
					} else {
						console.log(isNavForward.current);
						if (loadedPatronEzId <= 0) {
							setloadedEzID(Object.values(dbData).length);
							setLoadedPatronEzId(patronVideoCount);
						} else {
							setloadedEzID(toInteger(loadedEzID) - 1);
							setLoadedPatronEzId(loadedPatronEzId - 1);
						}
					}
					loadVideoStage.current = 0;
				}

				console.log(isNavForward.current);
			});
	}

	function determineUserStatus() {
		try {
			if (isInitialMount.current === false)
				if (userDataRes !== null)
					if (userDataRes.meta !== null) {
						return userDataRes !== null &&
							userDataRes.meta !== null &&
							userDataRes.meta === 0 ? (
							"Regular User"
						) : userDataRes.meta === 1 ? (
							<div>
								<br />
								<div style={{ textAlign: "center" }}>
									Ray Is Currently <b>Not Live</b> <br />
									<small
										onMouseEnter={() => {
											document.getElementById("LiveTextSpan").style.color = "#222222";
										}}
										onMouseLeave={() => {
											document.getElementById("LiveTextSpan").style.color = "blue";
										}}
										id="LiveTextSpan"
										style={{ color: "blue" }}
									>
										{" "}
										If he were you could join by clicking here{" "}
									</small>
								</div>{" "}
								<br />
								<div style={{ textAlign: "center" }}>
									<b>Paid Patron Videos</b>
								</div>{" "}
								<br />
								<div style={{ textAlign: "center" }}>{videoNavString}</div> <br />
								<div style={{ textAlign: "center" }}>
									{" "}
									&nbsp; &nbsp;
									<Button
										color="primary"
										onClick={() => {
											isNavForward.current = false;
											setloadedEzID(toInteger(loadedEzID) - 1);
											if (loadedPatronEzId <= 0) {
												setLoadedPatronEzId(patronVideoCount);
											} else {
												setLoadedPatronEzId(loadedPatronEzId - 1);
											}
											setLoadState("2");
										}}
									>
										←
									</Button>{" "}
									&nbsp;
									<Button
										color="primary"
										onClick={() => {
											isNavForward.current = true;
											setloadedEzID(toInteger(loadedEzID) + 1);
											setLoadedPatronEzId(toInteger(loadedPatronEzId) + 1);
											setLoadState("2");
										}}
									>
										→
									</Button>{" "}
									&nbsp; <br /> <br /><br /> <br />
									<div>{loadedVideoTitle}</div>
								</div>
								<video
									style={{ width: "100%", height: window.innerWidth * 0.9 * 0.5 }}
									preload="false"
									id="myVideo"
									src={loadedPlaybackId}
									controls
								></video>
								{RenderPatronDisplay()}
							</div>
						) : userDataRes.meta === 2 ? (
							"Admin"
						) : (
							"error" || "error"
						);
					}
		} catch (error) {
			setTimeout(() => {
				window.location.reload();
				alert("Account Created!");
			}, 500);
		}
	}

	function toggle(tab) {
		if (activeTab !== tab) {
			setactiveTab(tab);
		}
	}
	function handleImageUploadState() {
		if (gotDownloadURL === "Upload An Image To Embed") {
			return (
				<div>
					{gotDownloadURL}
					<br />
				</div>
			);
		} else {
			// User Has URL
			return (
				<div style={{ borderRadius: "25px", textAlign: "center" }}>
					{gotDownloadURL}
					<br />
					<button
						style={{ borderRadius: "25px", textAlign: "center" }}
						onClick={() => {
							localStorage.setItem("gotDownloadURL", "Upload Image To Embed");
						}}
					>
						Reset Image Form
					</button>
				</div>
			);
		}
	}
	return (
		<Fragment>
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
						backgroundColor: "transparent",
						justifyContent: "center",
						alignSelf: "center",
						width: "100%",
						opacity: 100,
					}}
				>
					<Button
						size="sm"
						fill="true"
						color="alternate"
						className={
							"btn-pill btn-wide " + classnames({ active: activeTab === "1" })
						}
						onClick={() => {
							toggle("1");
						}}
					>
						Welcome
					</Button>
					&nbsp;
					<Button
						size="sm"
						fill="true"
						color="alternate"
						className={
							"btn-pill btn-wide " + classnames({ active: activeTab === "3" })
						}
						onClick={() => {
							toggle("3");
						}}
					>
						Your Account
					</Button>
				</CardHeader>
				<TabPane tabId="3">
					<Card
						style={{
							boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
							width: "90vw",
						}}
					>
						<CardBody
							style={{
								backgroundColor: "transparent",
								width: "90vw",
							}}
						>
							<h3>Tools and events coming soon.</h3>
							<div style={{ textAlign: "left" }}>
								<li>Live Streams</li>
								<li>Video Libraries</li>
								<li>Early Access</li>
								<li>Notifications</li>
							</div>
							<br />
						</CardBody>
					</Card>
				</TabPane>
				<TabPane tabId="1">
					<Row>
						<Card
							style={{
								width: "90vw",
								maxWidth: "750px",
								backgroundColor: "#CCCCCCC",
								borderRadius: "25px",
								boxShadow: "0px 0px 0px 3px rgba(50,50,50, .8)",
							}}
						>
							<CardBody>
								<h3> Welcome!</h3>
								<h5>
									<div style={{ textAlign: "left" }}>
										<br />
										<b>Username:</b>
										<br />
										{auth.currentUser.displayName} <br />
										<br />
										<b> E-Mail:</b>
										<br /> {auth.currentUser.email}
										<br /> <br />
										<b>Status:</b>
										<br />
										{determineUserStatus()}
										<br />
										<br />
										<div style={{ textAlign: "center" }}>
											<button
												hidden={
													userDataRes !== null &&
													userDataRes.meta !== null &&
													userDataRes.meta !== 0
												}
												id="UpgradeAccountButton"
												onClick={() => {
													//Run EndAPI Call To Functions
													console.log("Running");
													require("firebase/functions");
													async function sendRequest(props) {
														var useEmulator = true;
														//Emulator local url for development:
														let fetchURL = "";
														const urlLocal = `http://localhost:5001/raymauiyoga-d75b1/us-central1/processPayment`;

														//Live  url:
														const urlLive =
															"https://us-central1-hokubot.cloudfunctions.net/FireFunctionShutDown";

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
																	refreshToken: auth.currentUser.refreshToken,
																	authDomain: auth.currentUser.authDomain,
																	uid: auth.currentUser.uid,
																	name: auth.currentUser.displayName,
																	email: auth.currentUser.email,
																	hostname: window.location.hostname,
																}),
															}),
															body: JSON.stringify({
																UUID: auth.currentUser.uuid,
															}),
														});
														const content = await rawResponse.json();
														console.log(content);
														setPayPalResponse(content);
													}

													sendRequest();
													document.getElementById("UpgradeAccountButton").innerHTML =
														"Loading";
													document.getElementById("UpgradeAccountButton").disabled = true;

													//
												}}
											>
												Upgrade Account
											</button>
										</div>
										<span hidden>
											{" "}
											ID:
											<br />
											{payPalResponse && payPalResponse.id} <br /> <br />
											Pay Link:
											<br />
											{payPalResponse && payPalResponse.links[1].href} <br /> <br />
											Status: <br />
											{payPalResponse && payPalResponse.state}
											<br />
										</span>
									</div>
								</h5>
							</CardBody>
						</Card>
					</Row>
				</TabPane>
			</TabContent>
		</Fragment>
	);
}
export default AccountElements;
