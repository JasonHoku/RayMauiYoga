import React, { Component, Fragment, useEffect } from "react";
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
class VideoManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteVar: "",
      deleteIDVar: "26",
    };
  }

  asyncGet() {
    async () => {
      console.log("Y");
    };
  }

  async componentDidMount() {
    {
      (function () {
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
      })();
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
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  async getData() {
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

  handleInputChange(event) {
    this.setState({
      noteVar: event.target.value,
    });
  }
  handleInputChange2(event) {
    this.setState({
      deleteIDVar: event.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <script src="https://src.litix.io/core/3/mux.js"></script>
        <CardHeader>
          <h3>Video Manager</h3>
        </CardHeader>
        <CardBody>
          <b>Personal Stream Key: </b>
          <br />
          69e93363-3e18-db5a-ed77-dc9a33a7f897
          <br />
          <b> Stream Video Example</b>
          <video width="350px" id="myVideo" controls></video>
          <br />
        </CardBody>

        <br />
      </Fragment>
    );
  }
}
export default VideoManager;
