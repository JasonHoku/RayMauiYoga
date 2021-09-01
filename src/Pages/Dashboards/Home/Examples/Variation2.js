import React, { Component, Fragment, useRef, useState, useEffect } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import CarouselBSExample from "./HomeCarousel";

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
	CardLink,
	CardHeader,
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


export default function CRMDashboard2() {


	const [loadStage, setloadStage] = useState("1");

	const [loadElements, setloadElements] = useState(null);

	const [loadedEvents, setloadedEvents] = useState([]);

	const [loadedEventIDs, setloadedEventIDs] = useState([]);
	const [categorizedMenuArray, setCategorizedMenuArray] = useState([]);
	const [gotEventsData, setGotEventsData] = useState(null);

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

	const [noUpcomingEventsFound, setnoUpcomingEventsFound] = useState(true);
	const [hover, setHover] = useState("hiddenText");

	const isInitialMount = useRef(true);
	const dbDataRef = useRef(true);
	const eventsWithinDate = useRef(true);
	const loadStageRef = useRef(0);


	useEffect(() => {
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
					if (gotDate >= new Date(Date.now())) {
						console.log(" True ");
						console.log(gotDate)
						eventsWithinDate.current.push(dbDataRef.current[i]);
						setSelectedDateEvents(eventsWithinDate.current);
						// console.log(selectedDateEvents);
						loadStageRef.current = 3;
						console.log(eventsWithinDate.current)
						console.log(selectedDateEvents)
						// document.querySelector("#EventsWithinDateSpan").hidden = false;
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
	}, [gotEventsData, setDate, selectedDateEvents])


	return (
		<Fragment>
			<CSSTransitionGroup
				component="div"
				transitionName="MainAnimation2"
				transitionAppear={true}
				transitionAppearTimeout={500}
				transitionEnterTimeout={500}
				transitionEnter={true}
				transitionLeave={false}
			>
				<Row
					style={{
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
					}}
				>
					<Card
						className="main-card mb-3"
						style={{
							width: "75%",
							maxWidth: "750px",
							backgroundColor: "#eeffff",
							boxShadow: "0px 0px 10px 15px rgba(50,50,90, .2)",
							borderRadius: "100px",
							borderBottomLeftRadius: "10px",
						}}
					>
						<CardBody style={{
							textAlign: "center",
							left: "50%",
							borderRadius: "100px",
							borderBottomLeftRadius: "10px",
						}}><div style={{ height: "20px" }}></div>
							<div style={{ fontSize: window.innerWidth > 415 ? "28px" : "24px" }}>	Welcome To RayMauiYoga.com</div>
							<div style={{ height: "50px" }}></div>
							<h4>
								<a href="/about">
									<b>A community resource of wellness education in the forms of live, written, &amp; video events.</b>
								</a>
							</h4>
						</CardBody>
						<CardBody
							style={{
								textAlign: "center",
								alignSelf: "center",
								backgroundColor: "transparent",
								overflow: "hidden",
								maxWidth: "100%",
							}}
						>
							<div style={{
								minWidth: "100%", minHeight: "100%",
								borderRadius: "50%",
								boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
							}}>
								<div style={{ width: "250px", height: "200px", textAlign: "center", }}>
									<img style={{
										borderRadius: "50%",
										width: "250px",
										height: "200px",
										position: "relative",
										left: "0",
										top: "0",
										zIndex: 3,
										maxHeight: "100%",
									}} src={"./assets/images/homeslides/1 (1).jpg"} alt="" />

								</div>
							</div>
						</CardBody>
					</Card>
				</Row><div style={{ height: "25px" }}></div>
			</CSSTransitionGroup>
			<CSSTransitionGroup
				component="div"
				transitionName="MainAnimation3"
				transitionAppear={true}
				transitionAppearTimeout={1000}
				transitionEnterTimeout={1000}
				transitionEnter={true}
				transitionLeave={false}
			>
				{selectedDateEvents.map((el) => {
					return <Row
						key={"EventMapRow_+" + el.EventTitle} hidden={!gotEventsData} style={{ textAlign: "center" }}><Card key={"EventCardRow_+" + el.EventTitle}
							className="main-card mb-3"
							style={{
								backgroundColor: "#eeffff",
								maxWidth: "1000px",
								borderTopLeftRadius: "25px",
								boxShadow: "0px 0px 10px 15px rgba(50,50,90, .2)",
								borderTopRightRadius: "25px",
								marginLeft: "20px",
								marginRight: "15px"
							}}
						>
							<div key={"EventDivRow_+" + el.EventTitle} style={{
								backgroundColor: "#eeffff",
								borderRadius: "0px",
								borderTopLeftRadius: "25px",
								borderTopRightRadius: "25px",
							}}>
								<h2 key={"EventHeaderRow_+" + el.EventTitle} style={{ padding: "10px" }}>	{el.EventTitle}</h2>
								<small key={"EventSubHeadRow_+" + el.EventTitle}>At {el.EventDate}</small>
							</div>

							<CardBody key={"EventMapBody_+" + el.EventTitle}
								style={{
									justifyContent: "center", textAlign: "center",
									maxWidth: "100%",
								}}

							><pre key={"EventMapDesc_+" + el.EventTitle} style={{
								width: "100%",
								overflow: "wrap",
								wordWrap: "break-word",
								whiteSpace: "pre-line",
								wordBreakMode: "break-word",
							}}>{el.EventDescription}</pre>
							</CardBody>
						</Card></Row>
				})}

				<Row style={{ textAlign: "center" }}><Card
					className="main-card mb-3"
					style={{
						backgroundColor: "#eeffff",
						maxWidth: "1000px",
						borderTopLeftRadius: "25px",
						boxShadow: "0px 0px 10px 15px rgba(50,50,90, .2)",
						borderTopRightRadius: "25px",
						marginLeft: "20px",
						marginRight: "15px"
					}}
				>
					<div style={{
						backgroundColor: "#eeffff",
						borderRadius: "0px",
						borderTopLeftRadius: "25px",
						borderTopRightRadius: "25px",
					}}>
						<h2 style={{ padding: "10px" }}>Getting Started</h2>
					</div>
					<CardBody style={{ textAlign: "left" }}
						onClick={() => {
							setHover("visibleText")
							document.getElementsByClassName("xd123")[0].hidden = true
						}
						}
						id={hover}
					>
						<p>
							At times, getting started on a project, practice, conversation or health
							kick can be the most challenging phase of any meaningful endeavor.
							While our intent may be clear and meaningful, taking action may be
							daunting. So why do we hold ourselves back when we have a plan?
						</p>
						<p>
							We might not feel confident in our skill set. Perhaps we are not
							disciplined enough to give necessary attention and focus. Whatever the
							case, taking one small step in one positive manner often leads us to
							productivity. Momentum. Get on the mat, do just one pose. Write one
							sentence. Play one note. More times than not, the simplest start will
							lead us down a positive path.
						</p>
						<p>
							Thus, I write these couple of paragraphs with the hope of completing
							this site, learning technology, posting videos and content that is
							enjoyable to create and equally enjoyable to digest. It has not been
							easy. I am intimidated by the technologies and not so confident
							implementing them. I love the yoga practice but do not always know how
							to optimally share this love.
						</p>
						<p>
							Nonetheless, I hope my intent and passion shines through in some
							meaningful way. I hope you find one moment of enjoyment with what I have
							to share. And most of all, I hope your practices are fun, meaningful and
							all of you.
						</p>
						<p>With aloha.</p>
					</CardBody>

					<CardBody
						className="xd123"
						style={{ justifyContent: "center", textAlign: "center" }}
						onClick={() =>
							setHover("visibleText")
						}
						id={hover}
					>
						<span id="readMore">
							<span id="readMore">
								<Button>Click To Read More</Button>
							</span>
						</span>
					</CardBody>
				</Card></Row>
				<Row style={{ textAlign: "center", paddingTop: "25px" }}><Card
					className="main-card mb-3"
					style={{
						boxShadow: "0px 0px 10px 15px rgba(50,50,90, .2)",
						borderRadius: "25px",
						backgroundColor: "#eeffff",
						maxWidth: "1000px",
						minWidth: "50%",
					}}
				>
					<CardLink href="/calendar">
						<div style={{
							backgroundColor: "#eeffff",
							borderRadius: "25px",
						}}>
							<h2 style={{
								padding: "10px",
								backgroundColor: "#eeffff",
								borderRadius: "15px",
								textAlign: "center"
							}}>Discover More Upcoming Events</h2>
						</div>
						<CardBody>
							<li>Find new and coming activities</li>
							<li>Check availabilities and reserve a spot</li>
							<li>Request a home or private session</li>
							<br />
							All at the events section; By clicking here.
						</CardBody>
					</CardLink>
				</Card></Row>
			</CSSTransitionGroup>
		</Fragment >
	);
}
