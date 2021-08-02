import React, { Component, Fragment, useEffect, useRef, useState, useCallback } from "react";
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
	const isNavForward = useRef(true);

	const [loadedVideoTitle, setloadedVideoTitle] = useState("");
	const auth = firebase.auth();

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

		}
		isInitialMount.current = false;
	}, [
		loadVideoJS,
		payPalResponse,
	])




	function renderVideoDisplay() {
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
						if (parseInt(Object.values(dbData)[loadedEzID].meta) === 2 || parseInt(Object.values(dbData)[loadedEzID].meta) === 3) {
							console.log(Object.values(dbData));

							let tempVar = 0;
							Object.values(dbData).forEach((el) => {
								if (parseInt(el.meta) === 2 || parseInt(el.meta) === 3) {
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
								setloadedEzID(parseInt(loadedEzID) + 1);
								loadVideoStage.current = 0;
							} else {
								if (loadedPatronEzId <= 0) {
									setloadedEzID(Object.values(dbData).length);
									setLoadedPatronEzId(patronVideoCount);
								} else {
									setloadedEzID(parseInt(loadedEzID) - 1);
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
								setloadedEzID(parseInt(loadedEzID) + 1);
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
									setloadedEzID(parseInt(loadedEzID) - 1);
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
							setloadedEzID(parseInt(loadedEzID) + 1);
							setLoadedPatronEzId(loadedPatronEzId + 1);
						}
					} else {
						console.log(isNavForward.current);
						if (loadedPatronEzId <= 0) {
							setloadedEzID(Object.values(dbData).length);
							setLoadedPatronEzId(patronVideoCount);
						} else {
							setloadedEzID(parseInt(loadedEzID) - 1);
							setLoadedPatronEzId(loadedPatronEzId - 1);
						}
					}
					loadVideoStage.current = 0;
				}

				console.log(isNavForward.current);
			});
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
							<div style={{ textAlign: "center" }}>{videoNavString}</div> <br />
							<div style={{ textAlign: "center" }}>
								{" "}
								&nbsp; &nbsp;
								<Button
									color="primary"
									onClick={() => {
										isNavForward.current = false;
										setloadedEzID(parseInt(loadedEzID) - 1);
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
										setloadedEzID(parseInt(loadedEzID) + 1);
										setLoadedPatronEzId(parseInt(loadedPatronEzId) + 1);
										setLoadState("2");
									}}
								>
									→
								</Button>{" "}
								&nbsp; <br /> <br />
								<div>{loadedVideoTitle}</div>
							</div><br /> <br />
							<video
								style={{ width: "100%", height: window.innerWidth * 0.9 * 0.5 }}
								preload="false"
								id="myVideo"
								src={loadedPlaybackId}
								controls
							></video>
							{renderVideoDisplay()}
							<br></br><br /> <br />
							To support, tune in live and get videos early, visit the
							<Link to="/account"> Account Page</Link>
							<br></br>
						</CardBody>
					</Card>
				</Row>
			</CSSTransitionGroup>
		</Fragment>
	);

}
