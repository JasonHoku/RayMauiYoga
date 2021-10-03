import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import {
	Row,
	Col,
	Button,
	ListGroupItem,
	Card,
	CardBody,
	Tooltip,
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

import { reverse, toInteger } from "lodash";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import { toast } from "react-toastify";




function UserQueryComponent() {
	const btnRef = React.useRef(null);

	const [url, setURL] = useState("");
	const isInitialMount = useRef(true);
	const [statusVar, setstatusVar] = useState("Viewing User Data");
	const [loadedUsername, setloadedUsername] = useState("");
	const [editedDescription, seteditedDescription] = useState("");
	const [loadedSnapshotData, setloadedSnapshotData] = useState([]);
	const [loadedSnapshotDataIDs, setloadedSnapshotDataIDs] = useState("");

	const [readyTitle, setreadyTitle] = useState("");
	const [loadedEzID, setloadedEzID] = useState("1");

	const [loadedEmail, setloadedEmail] = useState("");
	const [loadedUserMeta, setloadedUserMeta] = useState("");

	const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
	const [gotDownloadURL, setgotDownloadURL] = useState(
		"Upload An Image To Embed"
	);
	const [categoryVar, setcategoryVar] = useState("User");

	const [isLoadedOnce, setisLoadedOnce] = useState("1");

	const [file, setFile] = useState(null);;

	const loadStage = useRef(1);


	const [userSearchResults, setUserSearchResults] = useState(null);
	const [loadedPatronPrice, setLoadedPatronPrice] = useState(null);


	useEffect(() => {

		let concData = [];
		let concData2 = [];
		let concData3 = [];

		if (isInitialMount.current === true) {
			console.log("Updating, Stage: " + loadStage.current);
			if (loadStage.current === 1) {
				if (isLoadedOnce === "1") {
					const loadsnapshot = async () => {
						loadStage.current = 2
						const snapshot = await firebase.firestore().collection("UserDocs").get();
						snapshot.forEach((doc) => {
							concData = concData.concat(doc.data());
							concData2 = concData2.concat(doc.id);
						});
						setloadedSnapshotData(concData);
						setloadedSnapshotDataIDs(concData2);

						let tempResult = []

						loadedSnapshotData.forEach((el) => {

							tempResult.push(el)

						})

						setUserSearchResults(tempResult)

						const snapshot2 = await firebase.firestore().collection("PaymentOffers").get();

						setLoadedPatronPrice(snapshot2.docs[0].data().price);
						console.log(snapshot2.docs[0].data().price)



					};

					loadsnapshot().then(async () => {
						loadStage.current = 2;
					})

				}
			}
		}
		if (loadStage.current === 2) {
			try {

				setisLoadedOnce("1");
				console.log(loadedSnapshotData);
				setloadedTotalIDs(loadedSnapshotData.length);

				//
				setloadedUsername(
					String(JSON.parse(JSON.stringify(loadedSnapshotData[loadedEzID - 1])).displayName)
				);
				//
				setloadedEmail(
					String(JSON.parse(JSON.stringify(loadedSnapshotData[loadedEzID - 1])).email)
				);
				//
				setloadedUserMeta(
					String(JSON.parse(JSON.stringify(loadedSnapshotData[loadedEzID - 1])).meta)
				);
			} catch (error) {
				console.log(error);
			}
			setstatusVar(
				"Viewing " + categoryVar + " " + loadedEzID + " of: " + loadedTotalIDs
			);
			loadStage.current = 3;
		}
		if (loadStage.current === 3) {
			loadStage.current = 4;
		}
		if (loadStage.current === 4) {
			console.log("Finished Loading!");
		}
	});

	function onEditorChange(evt) {
		seteditedDescription(evt.editor.getData());
	}
	function copyImgURL() {
		var copyText = document.getElementById("copyImgURLElement");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");

		var tooltip = document.getElementById("myTooltip");
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
				.then(loadStage.current = 1 & setloadedTotalIDs(loadedTotalIDs - 1));
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
			<Card
				style={{
					boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
					backgroundColor: "transparent",
					width: "100%",
					alignContent: "center",
					alignItems: "center",
				}}
			>
				<CardBody>
					<h4 style={{ width: "100%", textAlign: "left" }}>
						<b>User&nbsp;Management</b>
					</h4>
					<br />


					Patron Price: <input

						defaultValue={loadedPatronPrice}

						onChange={(event) => {

							if (window.confirm('Are you sure you want to change the signup price?')) {

								console.log(event.target.value);
								event.persist()
								async function toggleRepeatable() {
									var db = firebase.firestore();
									await db
										.collection("PaymentOffers")
										.doc("RegularSub")
										.set(
											{
												price: parseInt(event.target.value)
											},
											{ merge: true }
										)
										.then((error) => {
											if (!error) {
												setloadedUserMeta(parseInt(event.target.value));
												toast(
													<div>
														<div>
															<h1>Success!</h1>
															<h2>
																Price Updated
															</h2>
														</div>
													</div>,
													{ autoClose: 2000 }
												);
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
								toggleRepeatable();
							}

						}} style={{ width: "100px" }}></input>


					<br />
					<small>ID #:</small>
					<input
						onChange={(e) => {
							setloadedEzID(e.target.value); loadStage.current = 1; formResetter()
						}
						}
						value={loadedEzID}
						name="loadedEzID"
						style={{ width: "45px" }}
					></input>
					&nbsp; &nbsp;					<Button
						color="primary"
						onClick={() => {

							document.getElementById("searchInputID").hidden = false

						}
						}
					>
						Search
					</Button>{" "}
					<div style={{ position: "absolute", backgroundColor: "#feffff", zIndex: 3 }} id="searchInputID" hidden={true} ><input

						onChange={(e) => {
							console.log(loadedSnapshotData)
							let tempResult = []

							loadedSnapshotData.forEach((el) => {

								if (el.displayName.includes(e.target.value)) {
									tempResult.push(el)
								}

							})

							setUserSearchResults(tempResult)

							e.preventDefault()

						}}

						style={{ position: "absolute", top: 3, left: "25px", zIndex: 3 }}></input>
						<br />
						{userSearchResults && userSearchResults.map((el, index) => {
							return <div
								style={{ color: "blue" }}
								onClick={() => {

									loadedSnapshotData.forEach((el2, index) => {
										if (el.displayName.includes(el2.displayName)) {
											console.log(index)
											setloadedEzID(index + 1)
											loadStage.current = 1
										}

										document.getElementById("searchInputID").hidden = true
									})
								}}

								id={"searchResults" + index}><button style={{ borderRadius: "5px", margin: "10px" }}>{el.displayName}</button></div>
						})}
						<br /></div>
					&nbsp;
					<Button
						color="primary"
						onClick={() => {
							setloadedEzID(toInteger(loadedEzID) - 1)
							loadStage.current = 1
						}
						}
					>
						←
					</Button>{" "}
					&nbsp;
					<Button
						color="primary"
						onClick={() => {
							setloadedEzID(toInteger(loadedEzID) + 1);
							loadStage.current = 1
						}
						}
					>
						→
					</Button>{" "}
					&nbsp;
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
							<CardHeader style={{ textAlign: "left" }}>
								<h5> Data View:</h5>
							</CardHeader>{" "}
							<small>
								Username:
								<input
									onChange={(event) => {
										setloadedUsername(event.target.value); loadStage.current = 3
									}
									}
									value={loadedUsername}
									name="loadedUsername"
									style={{ position: "relative", width: "90%" }}
								/>
								<br />
								<br />
								Email:

								<br />		<input
									onChange={(event) => {
										setloadedEmail(event.target.value); loadStage.current = 3
									}
									}
									value={loadedEmail}
									name="loadedEmail"
									style={{ position: "relative", width: "90%" }}
								/>
								<br />
								<br />
								<label><b>Patron Status: &nbsp; </b></label>
								<select
									onChange={(event) => {
										console.log(event.target.value);
										event.persist()
										async function toggleRepeatable() {
											var db = firebase.firestore();
											await db
												.collection("UserDocs")
												.doc(loadedSnapshotDataIDs[loadedEzID - 1])
												.set(
													{
														meta: parseInt(event.target.value)
													},
													{ merge: true }
												)
												.then((error) => {
													if (!error) {
														setloadedUserMeta(parseInt(event.target.value));
														toast(
															<div>
																<div>
																	<h1>Success!</h1>
																	<h2>
User Updated
																	</h2>
																</div>
															</div>,
															{ autoClose: 2000 }
														);
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
										toggleRepeatable();
										setloadedUserMeta(parseInt(event.target.value));

									}}
									value={loadedUserMeta}
								>
									<option value={1}>Patron / Paid</option>
									<option value={2}>Patron Level 2</option>
									<option value={3}>Patron Level 3</option>
									<option value={0}>Regular User</option>
								</select>
							</small>
						</div>
					</div>
				</CardBody>
			</Card>
		</Fragment >
	);
}
export default UserQueryComponent;
