import React, { Component, Fragment, useEffect } from "react";
import { compose, graphql } from "react-apollo";

import axios from "axios";
import {
  Row,
  Col,
  Button,
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
  CardTitle,
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

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "raymauiyoga-d75b1.firebaseapp.com",
  projectId: "raymauiyoga-d75b1",
  storageBucket: "raymauiyoga-d75b1.appspot.com",
  messagingSenderId: "313463385446",
  appId: "1:313463385446:web:7d2d2fd362f03913802ca7",
  measurementId: "G-S8EJTRMN63",
};

class UserQueryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authVar: this.props.authVar,
      textVar: "",
      activeIDStatus: "Status: Viewing All",
    };
  }
  render() {
    return (
      <Fragment>
        <Card>
          <CardBody>
            <br />
            <input
              style={{ textAlign: "center" }}
              placeholder={this.state.activeIDStatus}
            ></input>
            <br />
            &nbsp;
            <button
              style={{
                backgroundColor: "#335599",
                height: "40px",
                alignSelf: "center",
                borderRadius: "10px",
                marginBottom: "5px",
                fontSize: "15px",
              }}
              onClick={() => alert("coming soon")}
            >
              Email All
            </button>{" "}
            &nbsp;
            <button
              style={{
                backgroundColor: "#335599",
                height: "40px",
                alignSelf: "center",
                borderRadius: "10px",
                fontSize: "15px",
              }}
              onClick={() => alert("coming soon")}
            >
              Upgrade Account
            </button>{" "}
            &nbsp;
            <button
              style={{
                backgroundColor: "#993333",
                height: "40px",
                alignSelf: "center",
                borderRadius: "10px",
                fontSize: "15px",
              }}
              onClick={() => alert("coming soon")}
            >
              Ban User
            </button>
            &nbsp;
            <FirestoreProvider {...firebaseConfig} firebase={firebase}>
              <FirestoreCollection path={`/users/`}>
                {(d) => {
                  if (d) {
                    return d.isLoading ? (
                      "Loading"
                    ) : (
                      <pre>
                        {" "}
                        {localStorage.setItem(
                          "activeID2",
                          String(JSON.stringify(d.value))
                        )}
                        <div style={{ maxWidth: "350px" }}>
                          <h4>
                            {String(JSON.stringify(d.value))
                              .replace(/("|{|]|\[|\\|\/])/gm, "")
                              .replace(/(,)/gm, "\r\n ")
                              .replace(/(})/gm, "\r\n ")}
                          </h4>
                          {localStorage.setItem(
                            "ActiveUserCount",
                            d.value.length
                          )}
                        </div>
                      </pre>
                    );
                  }
                }}
              </FirestoreCollection>
            </FirestoreProvider>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}
export default UserQueryComponent;
