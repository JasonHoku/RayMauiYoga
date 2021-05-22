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
      .then(function (parsedData) {})
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
          ` SubmittedEmail: ${formEmail} || ID: ${CLIIP}` +
          window.location.href,
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
                    Please contact Ray with questions on classes, private
                    sessions, special events and yoga inquiries.{" "}
                    <a href="mailto:raymauiyoga@gmail.com">
                      <p></p>raymauiyoga@gmail.com
                    </a>
                    <p />
                    808-214-8877
                  </p>
                  <Form id="contactFormID">
                    <FormGroup row  style={{ width: "300px" }} >
                      <Label for="examplePassword" sm={3}>
                        Name
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="input"
                          style={{ width: "270px" }}
                          name="formName"
                          value={this.state.formName}
                          onChange={this.handleInputChange}
                          id="formName"
                          placeholder="Who'se inquiring?"
                        />
                      </Col>
                    </FormGroup>
                    <br />{" "}
                    <FormGroup row   style={{ width: "300px" }}>
                      <Label for="exampleEmail" sm={3}>
                        Email
                      </Label>
                      <Col sm={8}>
                        <Input
                          style={{ width: "270px" }}
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
                    <FormGroup row height="1005px"  style={{ width: "300px" }}>
                      <Label for="formMessage" sm={3}>
                        Text
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="textarea"
                          name="formMessage"
                          value={this.state.formMessage}
                          onChange={this.handleInputChange}
                          id="formMessage"
                          style={{ width: "270px", height: "170px" }}
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
                            Submit
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
