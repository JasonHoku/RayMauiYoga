import React, { Component, Fragment, useState, useEffect, useRef } from "react";
import { compose, graphql } from "react-apollo";
import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";
import mux from "mux-embed";
import "hls.js";
import "hls.js/dist/hls.js";
import Hls from "hls.js";
import Mux from "@mux/mux-node";
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

var REACT_APP_MUX_TOKEN_ID = process.env.REACT_APP_MUX_TOKEN_ID;
var REACT_APP_MUX_TOKEN_SECRET = process.env.REACT_APP_MUX_TOKEN_SECRET;
var REACT_APP_MUX_TOKEN_SECRET2 = process.env.REACT_APP_MUX_TOKEN_SECRET2;
function VideoManager() {
  const [message, setMessage] = useState("Hi there, how are you?");
  const [formName, setformName] = useState([]);
  const [formEmail, setformEmail] = useState([]);
  const [activeTab, setactiveTab] = useState("1");
  const [userMetric, setuserMetric] = useState("");
  const [issuesMetric, setissuesMetric] = useState("");
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
  const [loadedTotalIDs, setloadedTotalIDs] = useState("0");
  const [loadedTotalUsers, setloadedTotalUsers] = useState("0");

  const [loadStage, setloadStage] = useState("1");
  const isInitialMount = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("X" + loadStage);
      if (isInitialMount.current) {
        if (loadStage === "2") {
          loadVideoJS();
          setloadStage("3");

          return () => clearInterval(interval);
        }
        if (loadStage === "1") {
          setloadStage("2");

          return () => clearInterval(interval);
        }
        if (loadStage === "3") {
          clearInterval(interval);
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

  function asyncGet() {
    async () => {
      console.log("Y");
    };
  }
  function loadVideoJS() {
    // Replace with your asset's playback ID
    var playbackId = "8xh00SbnJ00lXDVdBQXVtfLqVwDWYFG6VP012GfZ00gBPAM";
    var url = "https://stream.mux.com/" + playbackId + ".m3u8";
    var video = document.getElementById("myVideo");

    // Let native HLS support handle it if possible
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else if (Hls.isSupported()) {
      // HLS.js-specific setup code
      let hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    }
    if (typeof mux !== "undefined") {
      mux.monitor("#myVideo", {
        data: {
          env_key: REACT_APP_MUX_TOKEN_SECRET, // required
          // Metadata
          player_name: "Custom Player", // ex: 'My Main Player'
          player_init_time: window.muxPlayerInitTime, // ex: 1451606400000

          // ... and other metadata
        },
      });
    }
    console.log("YYY");
    const Mux = require("@mux/mux-node");
    const { Video, Data } = new Mux(
      REACT_APP_MUX_TOKEN_ID,
      REACT_APP_MUX_TOKEN_SECRET
    );
    console.log(Video, Data);
    const muxClient = new Mux(
      REACT_APP_MUX_TOKEN_ID,
      REACT_APP_MUX_TOKEN_SECRET
    ); // Success!
    muxClient.Video.on("request", (req) => {
      // Request will contain everything being sent such as `headers, method, base url, etc
      body = {
        playback_policy: ["public"],
        new_asset_settings: {
          playback_policy: ["public"],
        },
      };
      console.log(req);
    });

    muxClient.Video.on("response", (res) => {
      console.log(res);
      // Response will include everything returned from the API, such as status codes/text, headers, etc
    });
  }
  function componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  async function getData() {
    const { Video } = new Mux(
      REACT_APP_MUX_TOKEN_ID,
      REACT_APP_MUX_TOKEN_SECRET
    );
    await Video.LiveStreams.create({
      Authorization: `Basic base64(MUX_TOKEN_ID:MUX_TOKEN_SECRET)`,
      new_asset_settings: {
        playback_policy: ["public"],
        mp4_support: "standard",
      },
    }).then((asset) => {
      this.setState({ gotStreamKey: asset.stream_key });
      alert("New Key Created");
    });
  }

  function handleInputChange(event) {
    this.setState({
      noteVar: event.target.value,
    });
  }
  function handleInputChange2(event) {
    this.setState({
      deleteIDVar: event.target.value,
    });
  }

  return (
    <Fragment>
      <script src="https://src.litix.io/core/3/mux.js"></script>
      <CardHeader>
        <h3>Video Manager</h3>
      </CardHeader>
      <CardBody>
        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#990000",
            borderRadius: "16px",
            height: "35px",
            fontSize: "120%",
            marginTop: "5px",
          }}
        >
          <span
            className="fillerClassxyxy"
            style={{ position: "relative", top: "-2px" }}
          >
            Create Video
          </span>
        </button>{" "}
        &nbsp;
        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#336633",
            borderRadius: "16px",
            height: "35px",
            fontSize: "120%",
            marginTop: "5px",
          }}
        >
          <span
            className="fillerClassxyxy"
            style={{ position: "relative", top: "-2px" }}
          >
            Manage Videos
          </span>
        </button>{" "}
        &nbsp;
      </CardBody>

      <TabContent
        activeTab={activeTab}
        style={{
          backgroundColor: "transparent",
          opacity: 0.9,
          justifyContent: "center",
          alignSelf: "center",
          width: "100%",
        }}
      >
        {" "}
        <CardBody>
          <b>Personal Stream Key: </b>
          <br />
          69e93363-3e18-db5a-ed77-dc9a33a7f897
          <br />
          <b> Stream Video Example</b>
          <video preload="false" width="350px" id="myVideo" controls></video>
          <br />
        </CardBody>
        <br />
      </TabContent>
    </Fragment>
  );
}
export default VideoManager;
