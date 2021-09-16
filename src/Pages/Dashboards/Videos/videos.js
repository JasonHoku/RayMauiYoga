import React, {
	Component,
	Fragment,
	useEffect,
	useRef,
	useState,
	useCallback,
} from "react";
import scriptLoader from "react-async-script-loader";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import ReactTable from "react-table";
import { Route, Link } from "react-router-dom";

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

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import mux from "mux-embed";

import "hls.js";
import "hls.js/dist/hls.js";

import Hls from "hls.js";

export default function MusicElements() {
	const [loadedEzID, setloadedEzID] = useState(0);
	const [payPalResponse, setPayPalResponse] = useState(null);
	const [userDataRes, setUserDataRes] = useState(null);
	const isInitialMount = useRef(true);
	const hasPayPalLaunched = useRef(false);

	const [loadState, setLoadState] = useState(0);
	const [patronVideoCount, setPatronVideoCount] = useState(0);
	const [loadedPatronEzId, setLoadedPatronEzId] = useState(1);

	const [videoNavString, setVideoNavString] = useState("Loading...");

	const [loadedPlaybackId, setloadedPlaybackId] = useState(null);
	const [publicVideoArray, setPublicVideoArray] = useState(null);
	const isNavForward = useRef(true);

	const [loadedVideoTitle, setloadedVideoTitle] = useState("");
	const auth = firebase.auth();

	const loadStage = useRef(0);
	const loadVideoStage = useRef(0);

	const loadVideoJS = useCallback(() => {
		if (loadVideoStage.current === 1) {
			console.log("State Up " + loadStage.current);
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

		if (loadStage.current === 0) {
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

					console.log(dbData);
					var tempVar = [];

					Object.values(dbData).forEach((el, index) => {
						console.log(el);
						if (parseInt(el.meta) === 3 || parseInt(el.meta) === 2) {
							tempVar.push(el);
						}
						if (tempVar[loadedEzID] && index === Object.values(dbData).length - 1) {
							setPublicVideoArray(tempVar);
							setloadedPlaybackId(tempVar[loadedEzID].playbackId);
							loadVideoStage.current = 1;
							setloadedVideoTitle(tempVar[loadedEzID].Title);
							setVideoNavString(
								"Viewing #" + (loadedEzID + 1) + " Of " + tempVar.length
							);
						}
					});
				});
		}
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
		}
		isInitialMount.current = false;
	}, [loadVideoJS, loadedEzID, payPalResponse]);

	function renderVideoDisplay() {
		console.log("running Render");
		let dbData = {};
	}
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
				<Row>
					<Card
						className="main-card mb-3"
						style={{
							boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
						}}
					>
						<CardHeader className="card-header-tab" color="light">
							<h1>Videos</h1>
						</CardHeader>
						<CardBody>
							<br />
							<div style={{ textAlign: "center" }}>
								Welcome to RayMauiYoga's public video library. <br /> To access live
								streams and early access videos login at the{" "}
								<Link to="/account"> Account Page</Link>
							</div>{" "}
							<br />
							<div style={{ textAlign: "center" }}>{videoNavString}</div>
							<div style={{ textAlign: "center" }}>
								{" "}
								&nbsp; &nbsp;
								<Button
									color="primary"
									onClick={() => {
										if (loadedEzID > 1) {
											setloadedPlaybackId(publicVideoArray[loadedEzID - 1].playbackId);
											loadVideoStage.current = 1;
											setloadedVideoTitle(publicVideoArray[loadedEzID - 1].Title);
											setVideoNavString(
												"Viewing #" + (loadedEzID - 1) + " Of " + publicVideoArray.length
											);
											setloadedEzID(loadedEzID - 1);
										} else {
											setloadedPlaybackId(
												publicVideoArray[publicVideoArray.length - 1].playbackId
											);
											loadVideoStage.current = 1;
											setloadedVideoTitle(
												publicVideoArray[publicVideoArray.length - 1].Title
											);
											setVideoNavString(
												"Viewing #" +
													publicVideoArray.length +
													" Of " +
													publicVideoArray.length
											);
											setloadedEzID(publicVideoArray.length);
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
										if (loadedEzID < publicVideoArray.length - 1) {
											setloadedPlaybackId(publicVideoArray[loadedEzID + 1].playbackId);
											loadVideoStage.current = 1;
											setloadedVideoTitle(publicVideoArray[loadedEzID + 1].Title);
											setVideoNavString(
												"Viewing #" + (loadedEzID + 2) + " Of " + publicVideoArray.length
											);
											setloadedEzID(loadedEzID + 1);
										} else {
											setloadedPlaybackId(publicVideoArray[0].playbackId);
											loadVideoStage.current = 1;
											setloadedVideoTitle(publicVideoArray[0].Title);
											setVideoNavString(
												"Viewing #" + 1 + " Of " + publicVideoArray.length
											);
											setloadedEzID(0);
										}
									}}
								>
									→
								</Button>{" "}
								&nbsp; <br /> <br />
								<div>"{loadedVideoTitle}"</div>
							</div>
							<br />
							<video
								style={{ width: "100%", height: window.innerWidth * 0.9 * 0.5 }}
								preload="false"
								id="myVideo"
								src={loadedPlaybackId}
								controls
							></video>
							<br></br>
						</CardBody>
					</Card>
				</Row>
			</CSSTransitionGroup>
		</Fragment>
	);
}
