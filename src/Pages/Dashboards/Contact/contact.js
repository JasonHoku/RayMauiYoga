import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import emailjs from "emailjs-com";

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

var EJSSERVICE = process.env.REACT_APP_EJSSERVICE;
var EJSTEMPLATE = process.env.REACT_APP_EJSTEMPLATE;
var EJSUSER = process.env.REACT_APP_EJSUSER;

var CLIIP;

export default class ContactElements extends Component {
	constructor(props) {
		super(props);
		this.submitContact = this.submitContact.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.state = {
			activeTab2: "222",
			activeTab1: "11",
			formName: "",
			formEmail: "",
			formMessage: "",
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
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

	componentDidMount() {
		this.setState({ isLoading: true });

		fetch("https://api.ipify.org")
			.then((response) => response.text())
			.then((response) => {
				CLIIP = response;
			})
			.then(function (parsedData) { })
			.catch((error) => this.setState({ error, isLoading: false }));
	}

	submitContact() {
		let { formName, formEmail, formMessage } = this.state;
		document.getElementById("contactFormButton").disabled = true;

		if (
			(formName.length !== null && formName.length < 1) ||
			(formEmail.length !== null && formEmail.length < 1) ||
			(formMessage.length !== null && formMessage.length < 1)
		) {
			alert("You must fill this form entirely.");
			document.getElementById("contactFormButton").disabled = false;
		} else {
			var templateParams = {
				name: `MYRBot: ${CLIIP}`,
				message: `Contact Form Submission From SubmittedFormName: ${formName}  Message: ${formMessage}`,
				message2:
					` SubmittedEmail: ${formEmail} || ID: ${CLIIP}` + window.location.href,
			};

			emailjs.send(EJSSERVICE, EJSTEMPLATE, templateParams).then(
				function (response) {
					console.log("SUCCESS!", response.status, response.text);
					alert("Your message has sent successfully!");
					var form = document.getElementById("contactFormID");
					document.getElementById("contactFormID").hidden = true;
					document.getElementById("contactFormThanks").hidden = false;
					document.getElementById("contactFormButton").disabled = true;
				},
				function (error) {
					console.log("FAILED...", error);
					alert("The message did not send. Perhaps you've lost internet?");
					document.getElementById("contactFormButton").disabled = false;
				}
			);
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
					<Container fluid>
						<br />
						<Row>
							<Card
								style={{
									width: "24rem",
									boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
									height: "100%",
								}}
							>
								<CardHeader>Contact Ray.</CardHeader>
								<CardBody>
									<p>
										{" "}
										Please contact Ray with questions on classes, private sessions,
										special events and yoga inquiries.{" "}
										<a href="mailto:raymauiyoga@gmail.com">
											<p></p>raymauiyoga@gmail.com
										</a>
										<p />
										808-214-8877
									</p>
									<Form id="contactFormID">
										<FormGroup row style={{ width: "300px" }}>
											<Label for="examplePassword" sm={5}>
												Name
											</Label>
											<Col sm={8}>
												<Input
													type="input"
													style={{
														width: "270px",
														backgroundColor: "#f0ffff",
													}}
													name="formName"
													value={this.state.formName}
													onChange={this.handleInputChange}
													id="formName"
													placeholder="Who's inquiring?"
												/>
											</Col>
										</FormGroup>
										<br />{" "}
										<FormGroup row style={{ width: "300px" }}>
											<Label for="examplePassword" sm={5}>
												Email
											</Label>
											<Col sm={8}>
												<Input
													style={{ width: "270px" ,
													backgroundColor: "#f0ffff",}}
													type="formEmail"
													name="formEmail"
													value={this.state.formEmail}
													onChange={this.handleInputChange}
													id="formEmail"
													placeholder="How to best reach you?"
												/>
											</Col>
										</FormGroup>
										<br />
										<FormGroup row height="1005px" style={{ width: "300px" }}>
											<Label for="examplePassword" sm={6}>
												Message
											</Label>
											<Col sm={8}>
												<Input
													type="textarea"
													name="formMessage"
													value={this.state.formMessage}
													onChange={this.handleInputChange}
													id="formMessage"
													style={{ width: "270px", height: "170px",
													backgroundColor: "#f0ffff", }}
												/>
											</Col>
										</FormGroup>
										<br />
										<center>
											<FormGroup check row>
												<Col sm={{ size: 12 }}>
													<Button
														id="contactFormButton"
														disabled={false}
														onClick={this.submitContact}
													>
														Send
													</Button>
												</Col>
											</FormGroup>
										</center>
									</Form>
								</CardBody>
							</Card>
						</Row>
					</Container>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}
