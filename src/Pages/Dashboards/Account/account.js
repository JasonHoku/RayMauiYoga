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

import { toast } from "react-toastify";
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

import Modal from "react-modal";

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
	const [patronVideoArray, setPatronVideoArray] = useState([]);
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

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalFormData, setModalFormData] = useState({
		TierOne: true,
		BackCover: false,
		SingleMonth: false,
		AdvancedPayment: false,
	});

	const auth = firebase.auth();

	const [loadState, setLoadState] = useState(0);
	const loadStage = useRef(0);
	const loadVideoStage = useRef(0);

	const loadVideoJS = useCallback(
		(prop) => {
			if (loadVideoStage.current === 1) {
				var playbackId = loadedPlaybackId;
				var url = "https://stream.mux.com/" + loadedPlaybackId + ".m3u8";
				var video = document.getElementById("myVideo");

				if (video.canPlayType("application/vnd.apple.mpegurl")) {
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

				loadStage.current = 1;
			}
		},
		[loadedPlaybackId]
	);

	useEffect(() => {
		console.log("Load Ref Up " + loadStage.current);
		console.log("Video Ref Up " + loadVideoStage.current);
		console.log("Init Ref Up " + isInitialMount.current);
		console.log("User State Up " + JSON.stringify(userDataRes));

		if (isInitialMount.current === false) {
			console.log("Init State2 " + loadStage.current);

			if (loadStage.current === 0) {
				if (userDataRes && userDataRes.meta !== 0) {
					let dbData = {};
					firebase
						.firestore()
						.collection("VideoData")
						.orderBy("Created")
						.get()
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								var key = doc.id;
								var data = doc.data();
								data["key"] = key;
								dbData[key] = data;
							});

							// console.log(dbData);
							var tempVar = [];

							Object.values(dbData).forEach((el, index) => {
								console.log(el);
								if (
									parseInt(el.meta) === 3 ||
									parseInt(el.meta) === 2 ||
									parseInt(el.meta) === 1 ||
									!el.meta
								) {
									tempVar.push(el);
								}
								if (tempVar[0] && index === Object.values(dbData).length - 1) {
									console.log(tempVar);
									console.log(tempVar[0].playbackId);
									console.log("TEMP DATA");
									setloadedVideoTitle(tempVar[0].Title || "Live");
									setloadedPlaybackId(tempVar[0].playbackId);
									loadStage.current = 1;
									loadVideoStage.current = 1;
									setVideoNavString(
										"Viewing #" + (loadedEzID + 1) + " Of " + tempVar.length
									);
								}

								setPatronVideoArray(tempVar);
								if (
									Math.abs(new Date(Date.now())) - new Date(el.Created * 1000) <
									1000 * 60 * 60 * 12
								) {
									console.log("VIDEO AT DATE");
									console.log(el.Title);
									console.log("VIDEO AT DATE");

									toast(
										<div>
											<div>
												<h4>New/Live Video Detected</h4>
												<br />
												<h5> At: </h5>
												<h5> {String(new Date(el.Created * 1000))}</h5>
												<h5>
													<button
														onClick={() => {
															console.log(index);
															console.log(loadStage.current);
															console.log(loadVideoStage.current);
															loadVideoStage.current = 1;
															loadStage.current = 1;
															setLoadState("2");
															setloadedEzID(index);

															setloadedPlaybackId(el.playbackId);
															loadVideoStage.current = 1;
															setloadedVideoTitle(el.Title);
															setVideoNavString("Viewing Live Video");
														}}
														style={{ borderRadius: "25px", textAlign: "center" }}
													>
														Click Here To Tune In
													</button>
												</h5>
												<br />
											</div>
										</div>,
										{ autoClose: 5000 }
									);
									if (document.getElementById("LiveAlertID")) {
										document.getElementById(
											"LiveAlertID"
										).innerHTML = `Ray's Latest: <br /> ${
											el.Title || "Today At:"
										}  <br />   ${new Date(el.Created * 1000).toDateString()} <br />
							`;
										document.getElementById("LiveAlertTuneIn").hidden = false;
									}
								}
							});
						});
				}
			}
			if (loadStage.current === 1) {
				if (loadVideoStage.current === 1) {
					loadStage.current = 2;
					setTimeout(() => {
						loadVideoJS();
					}, 1000);
				}
			}
			if (loadVideoStage.current === 1) {
				console.log("Finished Loading Patron Video");
			}

			if (hasPayPalLaunched.current === undefined) {
				hasPayPalLaunched.current = false;
			} else {
				if (hasPayPalLaunched.current === false) {
					if (payPalResponse !== null) {
						hasPayPalLaunched.current = true;
						document.getElementById("UpgradeAccountButton").innerHTML =
							"Invoice Created! Click The Link Below To Continue To PayPal";

						document.getElementById("UpgradeAccountButton").style.height = "75px";
					}
				}
			}
		} else {
			// Runs Once Upon Mount

			isNavForward.current = true;

			Modal.setAppElement("#ModalContainerID");
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
					console.log("GOT User Res");
					if (dbData.meta === 1 || dbData.meta === 2 || dbData.meta === 3) {
						setUserDataRes(dbData);
					}
				});
		}
		isInitialMount.current = false;
	}, [
		auth.currentUser.displayName,
		auth.currentUser.uid,
		loadVideoJS,
		loadedEzID,
		payPalResponse,
		userDataRes,
	]);
	var Loader = require("react-loaders").Loader;
	const determineUserStatus = () => {
		try {
			if (isInitialMount.current === false) {
				if (userDataRes !== null) {
					if (userDataRes.meta !== null) {
						return userDataRes !== null &&
							userDataRes.meta !== null &&
							userDataRes.meta === 0 ? (
							"Regular User"
						) : userDataRes.meta === 1 ? (
							<div>
								Patron User
								<br />
								{() => {
									setInterval(() => {
										console.log();
									}, 1000);
								}}
								<div id="LiveAlertID" style={{ textAlign: "center" }}>
									Ray Is Currently <b>Not Live</b>
									<br /> <Loader color="red" type="line-scale" active />
									Checking for new videos. <br />
									<b>
										{" "}
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
									</b>
								</div>{" "}
								<div style={{ textAlign: "center" }}>
									{" "}
									<button
										onClick={() => {
											console.log(loadStage.current);
											console.log(loadVideoStage.current);
											loadVideoStage.current = 1;
											loadStage.current = 1;
											setLoadState("2");
											console.log(patronVideoArray);
											setloadedEzID(patronVideoArray.length - 1);
											setloadedPlaybackId(
												patronVideoArray[patronVideoArray.length - 1].playbackId
											);
											loadVideoStage.current = 1;
											setloadedVideoTitle(
												patronVideoArray[patronVideoArray.length - 1].Title
											);
											setVideoNavString("Viewing Viewing Live Video");
											document.getElementById("LiveAlertTuneIn").hidden = true;
											document.getElementById("LiveAlertID").hidden = true;
										}}
										style={{ borderRadius: "25px", textAlign: "center" }}
										hidden
										id="LiveAlertTuneIn"
									>

										Click Here To Tune In
									</button>
									<br />
									<br />
									<b>Patron Access Videos:</b> <br />
									<br />
									{patronVideoArray &&
										patronVideoArray.map((patronVideoEls, index) => {
											return (
												<>
													<button
														onClick={() => {
															setloadedPlaybackId(patronVideoArray[index].playbackId);
															loadVideoStage.current = 1;
															setloadedVideoTitle(patronVideoArray[index].Title);
															setVideoNavString(
																"Viewing #" + index + " Of " + patronVideoArray.length
															);
															setloadedEzID(loadedEzID - 1);
														}}
														style={{
															borderRadius: "25px",
															margin: "5px",
															backgroundColor: patronVideoEls.Title ? "" : "green",
															height: "auto",
														}}
													>
														<h3> {patronVideoEls.Title || "Live Video"}</h3>
														{new Date(patronVideoArray[index].Created * 1000).toDateString()}
													</button>
												</>
											);
										})}
								</div>{" "}
								<br />
								<div style={{ textAlign: "center" }}>{videoNavString}</div> <br />
								<div style={{ textAlign: "center" }}>
									&nbsp; &nbsp;
									<Button
										color="primary"
										onClick={() => {
											if (loadedEzID > 1) {
												setloadedPlaybackId(patronVideoArray[loadedEzID - 1].playbackId);
												loadVideoStage.current = 1;
												setloadedVideoTitle(patronVideoArray[loadedEzID - 1].Title);
												setVideoNavString(
													"Viewing #" + (loadedEzID - 1) + " Of " + patronVideoArray.length
												);
												setloadedEzID(loadedEzID - 1);
											} else {
												setloadedPlaybackId(
													patronVideoArray[patronVideoArray.length - 1].playbackId
												);
												loadVideoStage.current = 1;
												setloadedVideoTitle(
													patronVideoArray[patronVideoArray.length - 1].Title
												);
												setVideoNavString(
													"Viewing #" +
														patronVideoArray.length +
														" Of " +
														patronVideoArray.length
												);
												setloadedEzID(patronVideoArray.length);
												setLoadState("2");
											}
										}}
									>
										←
									</Button>{" "}
									&nbsp;
									<Button
										color="primary"
										onClick={() => {
											if (loadedEzID < patronVideoArray.length - 1) {
												setloadedPlaybackId(patronVideoArray[loadedEzID + 1].playbackId);
												loadVideoStage.current = 1;
												setloadedVideoTitle(patronVideoArray[loadedEzID + 1].Title);
												setVideoNavString(
													"Viewing #" + (loadedEzID + 2) + " Of " + patronVideoArray.length
												);
												setloadedEzID(loadedEzID + 1);
											} else {
												setloadedPlaybackId(patronVideoArray[0].playbackId);
												loadVideoStage.current = 1;
												setloadedVideoTitle(patronVideoArray[0].Title);
												setVideoNavString(
													"Viewing #" + 1 + " Of " + patronVideoArray.length
												);
												setloadedEzID(0);
											}
										}}
									>
										→
									</Button>{" "}
									&nbsp; <br /> <br />
									<br /> <br />
									<div>
										<b>{loadedVideoTitle}</b>
									</div>
								</div>
								<video
									style={{ width: "100%" }}
									preload="false"
									id="myVideo"
									src={loadedPlaybackId}
									controls
								></video>
							</div>
						) : userDataRes.meta === 2 ? (
							"Admin"
						) : (
							"error" || "error"
						);
					}
					return false;
				}
				return false;
			}
			return false;
		} catch (error) {
			setTimeout(() => {
				window.location.reload();
				alert("Account Created!");
			}, 500);
		}
	};

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
											<br />
											<b
												hidden={
													userDataRes !== null &&
													userDataRes.meta !== null &&
													userDataRes.meta !== 0
												}
											>
												{" "}
												To access live streams and early access videos:
											</b>
											<br />
											<br />

											<button
												hidden={
													userDataRes !== null &&
													userDataRes.meta !== null &&
													userDataRes.meta !== 0
												}
												id="UpgradeAccountButton"
												onClick={() => {
													setModalIsOpen(true);
												}}

												// onClick={() => {
												// 	//Run EndAPI Call To Functions
												// 	console.log("Running");
												// 	require("firebase/functions");
												// 	async function sendRequest(props) {
												// 		var useEmulator = true;
												// 		//Emulator local url for development:
												// 		let fetchURL = "";
												// 		const urlLocal = `http://localhost:5001/raymauiyoga-d75b1/us-central1/processPayment`;

												// 		//Live  url:
												// 		const urlLive =
												// 			"https://us-central1-raymauiyoga-d75b1.cloudfunctions.net/processPayment";

												// 		if (
												// 			useEmulator &&
												// 			window.location.hostname.includes("localhost")
												// 		) {
												// 			fetchURL = urlLocal;
												// 		} else {
												// 			fetchURL = urlLive;
												// 		}

												// 		//Send Details to Functions
												// 		const rawResponse = await fetch(fetchURL, {
												// 			method: "POST",
												// 			mode: "cors",
												// 			headers: new Headers({
												// 				"Content-Type": "application/json",
												// 				Accept: "application/json",
												// 				HeaderTokens: JSON.stringify({
												// 					refreshToken: auth.currentUser.refreshToken,
												// 					authDomain: auth.currentUser.authDomain,
												// 					uid: auth.currentUser.uid,
												// 					name: auth.currentUser.displayName,
												// 					email: auth.currentUser.email,
												// 					hostname: window.location.hostname,
												// 				}),
												// 			}),
												// 			body: JSON.stringify({
												// 				UUID: auth.currentUser.uuid,
												// 			}),
												// 		});
												// 		const content = await rawResponse.json();
												// 		console.log(content);
												// 		setPayPalResponse(content);
												// 	}

												// 	sendRequest();
												// 	document.getElementById("UpgradeAccountButton").innerHTML =
												// 		"Loading";
												// 	document.getElementById("UpgradeAccountButton").disabled = true;

												// 	//
												// }}
											>
												Upgrade Account
											</button>
										</div>
										<div style={{ textAlign: "center" }} hidden={!payPalResponse}>
											<br />
											<br />
											<h1>
												{" "}
												Pay Link:
												<br />
												<a
													target="_blank"
													rel="noreferrer"
													href={payPalResponse && payPalResponse}
												>
													{" "}
													Continue To PayPal{" "}
												</a>
												<br />
											</h1>{" "}
											<br /> <br />
											<br />
										</div>
									</div>
								</h5>
								<div id="ModalContainerID"></div>
								<Modal
									isOpen={modalIsOpen}
									style={{
										content: {
											top: "50%",
											left: "50%",
											right: "auto",
											bottom: "auto",
											marginRight: "-50%",
											transform: "translate(-50%, -50%)",
										},

										overlay: { zIndex: 8888 },
									}}
									contentLabel="Example Modal"
								>
									<h2>
										Upgrading Account &nbsp;{" "}
										<button
											style={{
												float: "right",
												width: "50px",
												borderRadius: "5px",
											}}
											onClick={() => {
												setModalIsOpen(false);
											}}
										>
											X
										</button>
									</h2>
									<br />
									<br />
									<h3>Select your membership type:</h3>
									<h5>
										<br />
										<input
											id="TierOneInputID"
											checked={modalFormData.TierOne}
											onClick={() => {
												console.log(modalFormData);
												console.log(modalFormData.TierOne);
												setModalFormData({
													TierOne: true,
													SingleMonth: modalFormData.SingleMonth,
													AdvancedPayment: modalFormData.AdvancedPayment,
												});
												document.getElementById("TierOneInputID").checked = true;
											}}
											type="radio"
										></input>{" "}
										Paid Access
										{/* <br />
										<br />
										<input
											id="InsideFrontCoverInputID"
											value={modalFormData.InsideFrontCover}
											onClick={() => {
												console.log(modalFormData);
												if (modalFormData.InsideFrontCover) {
													setModalFormData({
														TierOne: modalFormData.TierOne,
														InsideFrontCover: false,
														SingleMonth: modalFormData.SingleMonth,
														AdvancedPayment: modalFormData.AdvancedPayment,


													});

													document.getElementById("InsideFrontCoverInputID").checked = false;
												} else {
													console.log(modalFormData.TierOne);
													setModalFormData({
														TierOne: false,
														InsideFrontCover: true,
														BackCover: false,
														SingleMonth: modalFormData.SingleMonth,
														AdvancedPayment: modalFormData.AdvancedPayment,
													});
													document.getElementById("InsideFrontCoverInputID").checked = true;
													document.getElementById("TierOneInputID").checked = false;
													document.getElementById("BackCoverInputID").checked = false;
												}
											}}
											type="radio"
										></input>{" "}
										Inside Front Cover
										<br />
										<br />
										<input
											id="BackCoverInputID"
											value={modalFormData.BackCover}
											onClick={() => {
												console.log(modalFormData);
												if (modalFormData.BackCover) {
													setModalFormData({
														TierOne: modalFormData.TierOne,
														InsideFrontCover: modalFormData.InsideFrontCover,
														SingleMonth: modalFormData.SingleMonth,
														AdvancedPayment: modalFormData.AdvancedPayment,
														BackCover: false,
													});

													document.getElementById("BackCoverInputID").checked = false;
												} else {
													console.log(modalFormData.TierOne);
													setModalFormData({
														TierOne: false,
														InsideFrontCover: false,
														SingleMonth: modalFormData.SingleMonth,
														AdvancedPayment: modalFormData.AdvancedPayment,

														BackCover: true,
													});
													document.getElementById("BackCoverInputID").checked = true;
													document.getElementById("TierOneInputID").checked = false;
													document.getElementById("InsideFrontCoverInputID").checked = false;
												}
											}}
											type="radio"
										></input>{" "}
										Back Cover
										<br />
										<br /> */}
										<br />
										<br />
										<br />
										<br />
										<h3>Select your payment plan:</h3>
										<br />
										<input
											id="SingleMonthInputID"
											value={modalFormData.SingleMonth}
											onClick={() => {
												console.log(modalFormData);
												if (modalFormData.SingleMonth) {
													setModalFormData({
														TierOne: modalFormData.TierOne,
														SingleMonth: false,
														AdvancedPayment: modalFormData.AdvancedPayment,
													});

													document.getElementById("SingleMonthInputID").checked = false;
												} else {
													console.log(modalFormData.SingleMonth);
													setModalFormData({
														TierOne: modalFormData.TierOne,
														SingleMonth: true,
														AdvancedPayment: false,
													});
													document.getElementById("SingleMonthInputID").checked = true;
													document.getElementById("AdvancedPaymentInputID").checked = false;
												}
											}}
											type="radio"
										></input>{" "}
										Single Month
										<br />
										<br />
										<input
											id="AdvancedPaymentInputID"
											value={modalFormData.AdvancedPayment}
											onClick={() => {
												console.log(modalFormData);
												if (modalFormData.AdvancedPayment) {
													setModalFormData({
														TierOne: modalFormData.TierOne,
														SingleMonth: modalFormData.SingleMonth,
														AdvancedPayment: false,
													});

													document.getElementById("AdvancedPaymentInputID").checked = false;
												} else {
													console.log(modalFormData.AdvancedPayment);
													setModalFormData({
														TierOne: modalFormData.TierOne,
														SingleMonth: false,
														AdvancedPayment: true,
													});
													document.getElementById("SingleMonthInputID").checked = false;
													document.getElementById("AdvancedPaymentInputID").checked = true;
												}
											}}
											type="radio"
										></input>{" "}
										Monthly Re-Occurring (Cancel Any time)
										<br />
										<br />
									</h5>
									<br />
									<div style={{ maxWidth: "450px", textAlign: "center" }}>
										Currently offering live streams & new videos at a special rate of $15
										for monthly access.
									</div>
									<br />

									<br />
									<div style={{ textAlign: "center" }}>
										{" "}
										<button
											style={{
												width: "100px",
												borderRadius: "5px",
											}}
											onClick={() => {
												console.log(modalFormData);
												var tempString = "";

												Object.entries(modalFormData).forEach((el) => {
													tempString += String(el).replace(",", "=") + "&";
												});

												var tempCost = 0;
												var tempInterval = 1;
												if (
													modalFormData.TierOne === "true" &&
													modalFormData.SingleMonth === "true" &&
													"300"
												)
													tempCost = 1;
												tempInterval = 1;
												if (
													modalFormData.TierOne === "true" &&
													modalFormData.AdvancedPayment === "true" &&
													"300"
												)
													tempCost = 1;
												tempInterval = 0;

												//Run EndAPI Call To Functions
												console.log("Running");
												require("firebase/functions");
												async function sendRequest(props) {
													var useEmulator = true;
													//Emulator local url for development:
													let fetchURL = "";
													const urlLocal = `http://localhost:5001/raymauiyoga-d75b1/us-central1/processPayment?payment=${1}&interval=${tempInterval}&${tempString}`;

													//Live  url:
													const urlLive =
														"https://us-central1-raymauiyoga-d75b1.cloudfunctions.net/processPayment";

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

												setModalIsOpen(false);
												sendRequest();
												document.getElementById("UpgradeAccountButton").innerHTML =
													"Loading";
												document.getElementById("UpgradeAccountButton").disabled = true;

												//
											}}
										>
											Proceed
										</button>
									</div>
								</Modal>
							</CardBody>
						</Card>
					</Row>
				</TabPane>
			</TabContent>
		</Fragment>
	);
}
export default AccountElements;
