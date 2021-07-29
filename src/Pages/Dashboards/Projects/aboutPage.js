import React, { Component, Fragment } from "react";
import scriptLoader from "react-async-script-loader";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import classnames from "classnames";
import ReactTable from "react-table";
import { Route } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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

import {
	ResponsiveContainer,
	LineChart,
	Line,
	AreaChart,
	Area,
	Tooltip,
} from "recharts";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
	faAngleUp,
	faDotCircle,
	faAngleDown,
	faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";

import { Sparklines, SparklinesCurve } from "react-sparklines";

import { makeData } from "../../Tables/DataTables/Examples/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";


const CLIENT = {
	sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
	production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
};

const data55 = [
	{ name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
	{ name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
	{ name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
	{ name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
	{ name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
	{ name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
	{ name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
	{ name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
	{ name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
	{ name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data22 = [
	{ name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
	{ name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
	{ name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
	{ name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
	{ name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
	{ name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
	{ name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
	{ name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
	{ name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
	{ name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data3 = [
	{ name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
	{ name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
	{ name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
	{ name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
	{ name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
	{ name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
	{ name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
	{ name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
	{ name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
	{ name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
];

const data2 = [
	{ name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
	{ name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
	{ name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
	{ name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
	{ name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
	{ name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
	{ name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
	{ name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
	{ name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
	{ name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
];

function boxMullerRandom() {
	let phase = true,
		x1,
		x2,
		w;

	return (function () {
		if (phase) {
			do {
				x1 = 2.0 * Math.random() - 1.0;
				x2 = 2.0 * Math.random() - 1.0;
				w = x1 * x1 + x2 * x2;
			} while (w >= 1.0);

			w = Math.sqrt((-2.0 * Math.log(w)) / w);
			return x1 * w;
		} else {
			return x2 * w;
		}
	})();
}



export default class ProjectElements extends Component {
	constructor(props) {
		super(props);

		this.toggle2 = this.toggle2.bind(this);
		this.state = {
			activeTab2: "222",
			activeTab1: "11",
		};
	}

	toggle2(tab) {
		if (this.state.activeTab2 !== tab) {
			this.setState({
				activeTab2: tab,
			});
		}
	}

	toggle1(tab) {
		if (this.state.activeTab1 !== tab) {
			this.setState({
				activeTab1: tab,
			});
		}
	}

	render() {

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
					<br></br>

					<Row style={{
						marginTop: "15px",
						textAlign: "center",
						alignSelf: "center",
						backgroundColor: "transparent",
						maxWidth: "100%",
					}}>
						<Col style={{
							marginTop: "15px",
							textAlign: "center",
							alignSelf: "center",
							backgroundColor: "transparent",
							maxWidth: "100%",
						}} xs="auto" sm="auto" md="auto" xl="auto">

							<Card
								className="main-card mb-3"
								style={{
									boxShadow: "0px 0px 5px 5px rgba(50,50,90, .3)",
									position: "relative",
									backgroundColor: "#eeffff",
									top: "-16px",
									maxWidth: "1000px",
									borderTopLeftRadius: "25px",
									borderTopRightRadius: "25px",
								}}
							>
								<CardHeader style={{
									marginTop: "15px",
									textAlign: "center",
									alignSelf: "center",
									backgroundColor: "transparent",
									maxWidth: "100%",
								}} className="card-header-tab">
									<div className="card-header-title font-size-lg font-weight-normal">
										<i className="header-icon pe-7s-news-paper mr-3 text-muted opacity-6">
											{" "}
										</i>
										Ray's BIO
									</div>{" "}
									<div> </div>
								</CardHeader>
								<CardBody style={{
									marginTop: "15px",
									textAlign: "center",
									alignSelf: "center",
									backgroundColor: "transparent",
									maxWidth: "100%",
								}}>
									<p>
										Yoga is for everyone. It is the belief that guides Ray’s
										teaching. Whether it be a gentle class, a rockin’, vigorous
										practice, meditation, or private session, everyone has the
										capacity to explore themselves through yoga. Ray’s classes are
										focused, light-hearted, and designed to challenge student’s
										physical, mental and spiritual qualities.
									</p>
									<p>
										Ray, a lifetime athlete, discovered yoga in a gym class 20 years
										ago. He was intrigued at how yoga both strengthened and softened
										him. Ray has studied and practiced with a variety of teachers
										from Iyengar, Ashtanga, Hatha and Anusara traditions and began
										teaching in 2007. He continues to discover and explore how the
										qualities and values of yoga practice can help us with the
										practice of living.
									</p>
									<p>
										Ray has taught public classes, private sessions, yoga for
										seniors, yoga for kids, and yoga for athletes. He has taught
										workshops, in school settings, at Buddhist temples and at the
										beach.
									</p>
									<p>
										Ray loves living on Maui. He is grateful to teach in such a
										beautiful setting. Ray tries to get to the beach every day and
										when he is successful you will find him swimming, surfing or
										hanging with his family. He enjoys practicing yoga, jiu-jitsu,
										and writing.
									</p>
									<p>
										Ray is the proud father of his son Taj, dog Nala and four
										chickens.
									</p>
									<br></br>
									<br></br>
									<br></br>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<br></br>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}
