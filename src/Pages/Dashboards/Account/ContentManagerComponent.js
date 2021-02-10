import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";

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
} from "reactstrap";
import axios from "axios";
import CKEditor from "ckeditor4-react";

import FireBaseImageUpload from "./firebaseImageUpload";

import { reverse, toInteger } from "lodash";
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
function ContentManagerComponent() {
  const [url, setURL] = useState("");
  const isInitialMount = useRef(true);
  const [noteVar, setnoteVar] = useState("");
  const [textVar2, settextVar2] = useState("Select an Instance To Begin");
  const [textVar, settextVar] = useState("Select an Instance To Begin");
  const [statusVar, setstatusVar] = useState("Viewing HomePage Data");
  const [onlineButton, setonlineButton] = useState("Go Online");
  const [purgeButton, setpurgeButton] = useState("Clear Old Instances");
  const [proStatusText, setproStatusText] = useState("Loading...");
  const [selectByIDVar, setselectByIDVar] = useState("0");
  const [loadedImgURL, setloadedImgURL] = useState("");
  const [loadedDescription, setloadedDescription] = useState("");
  const [editedDescription, seteditedDescription] = useState("");
  const [loadedLocationData, setloadedLocationData] = useState("");
  const [getDataEZID, setgetDataEZID] = useState("");
  const [ChangeImageURLVar, setChangeImageURLVar] = useState("");
  const [loadedCreatorData, setloadedCreatorData] = useState("");
  const [loadedGMapCoords, setloadedGMapCoords] = useState("");
  const [loadedTitle, setloadedTitle] = useState("");
  const [loadedPublic, setloadedPublic] = useState("");
  const [loadedIDData, setloadedIDData] = useState("");
  const [loadStage, setloadStage] = useState("1");
  const [loadedTitleData, setloadedTitleData] = useState("");
  const [readyCreator, setreadyCreator] = useState("");
  const [readyTitle, setreadyTitle] = useState("");
  const [readyDescription, setreadyDescription] = useState("");
  const [readyID, setreadyID] = useState("");
  const [readyPublic, setreadyPublic] = useState("");
  const [loadedEzID, setloadedEzID] = useState("1");
  const [loadedTotalIDs, setloadedTotalIDs] = useState("1");
  const [gotDownloadURL, setgotDownloadURL] = useState(
    "Upload An Image To Embed"
  );

  function handleInputChangeEvent(event) {
    setState({
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("X" + loadStage);
      if (isInitialMount.current) {
        if (loadStage === "2") {
          setreadyTitle(loadedTitle);
          setreadyDescription(loadedDescription);
          localStorage.setItem("editedDescription", editedDescription);
          localStorage.setItem("readyTitle", readyTitle) &
            clearInterval(interval);
          setloadStage("3");
          return () => clearInterval(interval);
        }
        if (loadStage === "1") {
          if (loadedTotalIDs != "0") {
            checkFormStates() & setloadStage("2");
          }
          return () => clearInterval(interval);
        }
        if (loadStage === "3") {
          setloadedIDData(loadedEzID);
          console.log("Setting Send Data");
          seteditedDescription(loadedDescription);
          setloadStage("4");
          setstatusVar("Viewing " + loadedEzID + " of: " + loadedTotalIDs);
          console.log("Y");
          checkFormStates();
          setproStatusText("Loading: " + loadedEzID + " / " + loadedTotalIDs);
          if (localStorage.getItem("gotDownloadURL")) {
            setreadyImgURL(localStorage.getItem("gotDownloadURL"));
            setloadStage("4");
          }
          return () => clearInterval(interval);
        }
        if (loadStage === "4") {
          setproStatusText("Ready: " + loadedEzID + " / " + loadedTotalIDs);
          if (localStorage.getItem("gotDownloadURL")) {
            setreadyImgURL(localStorage.getItem("gotDownloadURL"));
          }
          return () => clearInterval(interval);
        }
        return () => clearInterval(interval);
      } else {
        isInitialMount.current = false;
        return () => clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  });
  function onEditorChange(evt) {
    seteditedDescription(evt.editor.getData());
  }

  function formResetter() {
    try {
      document.forms[1].reset();
      document.forms[2].reset();
      document.forms[3].reset();
      document.forms[4].reset();
      document.forms[5].reset();
      setgotDownloadURL(localStorage.getItem("gotDownloadURL"));
    } catch (error) {}
  }
  function checkFormStates() {
    setgotDownloadURL(localStorage.getItem("gotDownloadURL"));
    handleImageUploadState();
    try {
      if (String(localStorage.getItem(`username`)).length > 3) {
        console.log("LoadStage :" + loadStage);
        document.getElementById("finListButton").disabled = false;
        document.getElementById("finListButton").style.backgroundColor = "blue";

        setfinListButton("Send Listing"),
          setfinListButtonStatus("Ready To Publish"),
          setfinListButtonDisable(false);
      }
    } catch (e) {}
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
      <Card>
        <h2>Content&nbsp;Manager</h2>
        <span>
          <button
            onClick={() => alert("Construction Awaiting Client Consultation")}
          >
            HomePage
          </button>{" "}
          &nbsp;
          <button
            onClick={() => alert("Construction Awaiting Client Consultation")}
          >
            BlogPage
          </button>{" "}
          &nbsp;
          <button
            onClick={() => alert("Construction Awaiting Client Consultation")}
          >
            EventsPage
          </button>
        </span>
        <h2>Status:&nbsp;{statusVar}</h2>
        <CardBody>
          ID #:
          <input
            onChange={(e) =>
              setloadedEzID(e.target.value) & setloadStage("1") & formResetter()
            }
            value={loadedEzID}
            name="loadedEzID"
            style={{ width: "25px" }}
          ></input>
          &nbsp;
          <button
            onClick={() =>
              setloadedEzID(toInteger(loadedEzID) - 1) & setloadStage("2")
            }
          >
            ←
          </button>{" "}
          &nbsp;
          <button
            onClick={() =>
              setloadedEzID(toInteger(loadedEzID) + 1) & setloadStage("2")
            }
          >
            →
          </button>
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
              <CardHeader>Content View:</CardHeader>{" "}
            </div>{" "}
            <Row>
              <Col
                style={{
                  width: "90%",
                }}
              >
                Title: <br />
                <b>{loadedTitleData}</b>
                <br />
                <br />
                Body:{" "}
                <div
                  className="listingExample"
                  dangerouslySetInnerHTML={{
                    __html: editedDescription,
                  }}
                />
              </Col>
            </Row>{" "}
          </div>
          &nbsp;
          <br />{" "}
          <div style={{ width: "100%", textAlign: "center" }}>
            <CKEditor onChange={onEditorChange} data={loadedDescription} />{" "}
            <br />{" "}
          </div>
          <br />
          <div
            style={{
              boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            }}
          >
            <b> Upload Your Own Image:</b> <br />
            <FireBaseImageUpload />
            <br />
            {handleImageUploadState()}
          </div>
        </CardBody>
        <br />
        <CardBody>
          <IfFirebaseAuthed>
            {() => (
              <div>
                <FirestoreProvider {...firebaseConfig} firebase={firebase}>
                  <FirestoreCollection path="/DynamicContent/">
                    {(d) => {
                      if (loadStage === "1") {
                        if (d.isLoading === false) {
                          setloadedTotalIDs(d.value.length);
                        }
                      }
                    }}
                  </FirestoreCollection>
                </FirestoreProvider>
              </div>
            )}
          </IfFirebaseAuthed>{" "}
          <FirestoreProvider {...firebaseConfig} firebase={firebase}>
            <FirestoreDocument path={`/DynamicContent/${loadedEzID}`}>
              {(d) => {
                if (d) {
                  if (d.value != undefined) {
                    if (loadStage === "2") {
                      setloadedTitle(
                        String(JSON.parse(JSON.stringify(d.value)).Title)
                      );
                      setloadedDescription(
                        String(JSON.parse(JSON.stringify(d.value)).Description)
                      );
                      return d.isLoading ? "Loading" : <pre></pre>;
                    }
                  }
                }
              }}
            </FirestoreDocument>
          </FirestoreProvider>
          <IfFirebaseAuthed>
            {() => (
              <div>
                <FirestoreProvider {...firebaseConfig} firebase={firebase}>
                  <FirestoreMutation
                    type="set"
                    path={`/DynamicContent/` + loadedIDData}
                  >
                    {({ runMutation }) => {
                      if (loadStage === "3") {
                        return (
                          <div>
                            <button
                              style={{
                                alignSelf: "center",
                                display: "block",
                                position: "relative",
                                borderRadius: "5px",
                                width: "100%",
                              }}
                              onClick={() => {
                                setloadedIDData("2");
                                runMutation({
                                  Location: `${localStorage.getItem(
                                    "readyLocation"
                                  )}`,
                                  Creator: `${localStorage.getItem(
                                    "username"
                                  )}`,
                                  ID: `${localStorage.getItem("readyID")}`,
                                  Title: `${localStorage.getItem(
                                    "readyTitle"
                                  )}`,
                                  Description: `${localStorage
                                    .getItem("editedDescription")
                                    .replace(/(\r\n|\n|\r)/gm, ``)
                                    .replace(/(`)/gm, `'`)} `,
                                }).then((res) => {
                                  alert("Published");
                                  if (res) {
                                    setloadStage("2");
                                  }
                                });
                              }}
                            >
                              Publish
                            </button>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }}
                  </FirestoreMutation>
                </FirestoreProvider>
              </div>
            )}
          </IfFirebaseAuthed>
        </CardBody>
      </Card>
      <br />
    </Fragment>
  );
}
export default ContentManagerComponent;
