/* This is an example snippet - you should consider tailoring it
to your service.
*/
/*
  Add these to your `package.json`:
    "apollo-boost": "^0.3.1",
    "graphql": "^14.2.1",
    "graphql-tag": "^2.10.0",
    "react-apollo": "^2.5.5"
*/

import React, { Component, Fragment } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";

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
import {
  FirestoreProvider,
  FirestoreCollection,
  FirestoreDocument,
  FirestoreMutation,
} from "@react-firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDurY8L6svgBXIb1eunXLlBAUVrAqpNZ8Q",
  authDomain: "raymauiyoga-d75b1.firebaseapp.com",
  projectId: "raymauiyoga-d75b1",
  storageBucket: "raymauiyoga-d75b1.appspot.com",
  messagingSenderId: "313463385446",
  appId: "1:313463385446:web:7d2d2fd362f03913802ca7",
  measurementId: "G-S8EJTRMN63",
};

// This setup is only needed once per application;

export default class AccountElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formEmail: "",
      formName: [],
      formDesc: [],
      formMessage: "",
      activeTab: "1",
      sendCommentButtonText: "Send Message",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.submitContact = this.submitContact.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      formName: event.target.value,
    });
  }
  handleInputChange2(event) {
    this.setState({
      formDesc: event.target.value,
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  submitContact() {
    let { formName, formEmail, formMessage } = this.state;

    if (formName.length !== null && formName.length < 1) {
      alert("You must fill this form entirely.");
    } else {
      console.log("success");
    }
  }

  render() {
    const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
      window.location.reload();
    };
    let { formName, formDesc, formEmail, formMessage } = this.state;
    const { data } = this.state;

    return (
      <Fragment>
        <Card
          style={{
            width: "85%",
            maxWidth: "750px",
            backgroundColor: "#CCCCCCC",
            borderRadius: "25px",
            background:
              "linear-gradient(0.25turn, #CCDDFFEE, #FFFFFFAA, #CCDDFFEE)",

            boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
          }}
        >
          <TabContent
            activeTab={this.state.activeTab}
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
                outline
                color="alternate"
                className={
                  "btn-pill btn-wide " +
                  classnames({ active: this.state.activeTab === "1" })
                }
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Contact
              </Button>
              &nbsp;
              <Button
                size="sm"
                outline
                color="alternate"
                className={
                  "btn-pill btn-wide " +
                  classnames({ active: this.state.activeTab === "3" })
                }
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Your Account
              </Button>
            </CardHeader>
            <TabPane tabId="1">
              <Row>
                <Card
                  style={{
                    boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  }}
                >
                  <CardBody
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <h3>Tools and information coming soon.</h3>
                    <div style={{ textAlign: "left" }}>
                      <li>Live Streams</li>
                      <li>Video Libraries</li>
                      <li>Early Access</li>
                      <li>Notifications</li>
                    </div>
                    <br />
                    <h3>Send a message:</h3>
                    <Form
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        {" "}
                        Contact Information:
                      </div>
                      <Input
                        style={{ width: "250px" }}
                        onChange={this.handleInputChange}
                        name="formName"
                        type="text"
                        value={this.state.formName}
                      ></Input>
                      <div style={{ textAlign: "left" }}>Message:</div>
                      <Input
                        style={{ width: "250px" }}
                        onChange={this.handleInputChange2}
                        name="formDesc"
                        type="textarea"
                        value={this.state.formDesc}
                      ></Input>

                      <FirestoreProvider
                        {...firebaseConfig}
                        firebase={firebase}
                      >
                        <FirestoreMutation
                          type="add"
                          merge={true}
                          path={`/comments/`}
                        >
                          {({ runMutation }) => {
                            return (
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <button
                                  style={{
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    width: "auto",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    runMutation(
                                      {
                                        From: this.state.formName,
                                        Message: this.state.formDesc,
                                      },
                                      { merge: true }
                                    ).then((res) => {
                                      console.log("Ran mutation ", res);
                                    });
                                  }}
                                >
                                  <span
                                    style={{
                                      position: "relative",
                                      top: "-4px",
                                    }}
                                  >
                                    {this.state.sendCommentButtonText}
                                  </span>
                                </button>
                              </div>
                            );
                          }}
                        </FirestoreMutation>
                      </FirestoreProvider>
                    </Form>
                  </CardBody>
                </Card>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Card
                  style={{
                    width: "85%",
                    maxWidth: "750px",
                    backgroundColor: "#CCCCCCC",
                    borderRadius: "25px",
                    boxShadow: "0px 0px 0px 3px rgba(50,50,50, .8)",
                  }}
                >
                  <CardBody>
                    <h3> Account tools coming soon.</h3>
                    <div style={{ textAlign: "left" }}>
                      Username: {localStorage.getItem("username")} <br />
                      E-Mail: {localStorage.getItem("userEmail")}
                      <br />
                      Status: Regular User
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </TabPane>
          </TabContent>
        </Card>
      </Fragment>
    );
  }
}
