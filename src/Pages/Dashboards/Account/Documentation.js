import React, { Component, Fragment, useEffect } from "react";

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
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.raymauiyoga.com/graphql",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }),
});

class DocumentationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteVar: "",
      textVar2: "Select an Instance ",
      deleteIDVar: "26",
    };
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

  onSubmit = () => {
    const formData = new FormData();
    formData.Answers = this.state.noteVar;

    axios
      .post(
        `https://api.raymauiyoga.com/live-chats`,
        JSON.stringify(formData),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        if (res.err == null) {
          document.getElementById("apiupform").hidden = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmitDelete = () => {
    const formData = new FormData();
    formData.Note = this.state.noteVar;
    formData.id = 21;
    console.log(formData);

    axios
      .post(
        `https://api.raymauiyoga.com/live-chats`,
        JSON.stringify(formData),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        if (res.err == null) {
          alert("Success!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onImageChange = (event) => {
    console.log(event.target.files);

    this.setState({
      images: event.target.files,
    });
  };

  render() {
    return (
      <Fragment>
        <CardHeader>
          <h3> Mod Tools Docs</h3>{" "}
        </CardHeader>
        <CardBody>
          <div
            style={{
              borderRadius: "5px",
            }}
          >
            <strong>
              ChangeLog Post<b> 1/22/21</b>
            </strong>
            <small> V1.2 </small>
            <br />
            <br />{" "}
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Content Editor</b>
              </Col>
              <Col>
                Used for changing parts of the website easily, TODO: Discuss
                dynamic website sections and flow
              </Col>
            </Row>{" "}
            <br />
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Video Manager</b>
              </Col>
              <Col>
                Manage Videos &amp; Streams, Categories, get Links, go Live.
              </Col>
            </Row>{" "}
            <br />
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>User Management</b>
              </Col>
              <Col>Send Emails, Create Moderators, Edit Meta, Ban Accounts</Col>
            </Row>{" "}
            <br />
            {/*
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Products</b>
              </Col>
              <Col>Add, Edit, or Delete Shop Products and Content</Col>
            </Row>{" "}
            <br /> */}
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Events</b>
              </Col>
              <Col>Manage event calendar data</Col>
            </Row>{" "}
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Surveys</b>
              </Col>
              <Col>
                Create, manage and view survey utilities and website feedback.
              </Col>
            </Row>{" "}
            {/* 
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Report Issue</b>
              </Col>
              <Col>Manage and report issues to web development team.</Col>
            </Row>{" "} */}
            <br />
            <Row
              style={{
                borderBottom: "solid 2px",
                borderColor: "black",
              }}
            >
              <Col>
                <b>Live Chat</b>
              </Col>
              <Col>
                Not Active <br /> (Lead Generation Utility)
              </Col>
            </Row>{" "}
            <br />
          </div>{" "}
          <br />
          <br />{" "}
          <a href="https://github.com/JasonHoku/RayMauiYoga">
            Source Code And Readme
          </a>{" "}
          <br />
        </CardBody>
      </Fragment>
    );
  }
}
export default DocumentationPage;
