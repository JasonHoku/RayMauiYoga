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
import { idText } from "typescript";
import { toHtml } from "@fortawesome/fontawesome-svg-core";

class UserQueryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authVar: this.props.authVar,
      textVar: "",
    };
  }
  render() {
    this.state.authVar = axios
      .get(`https://api.raymauiyoga.com/users/`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        if (res.err == null) {
        }
        localStorage.setItem(
          "ActiveUserCount",
          JSON.parse(JSON.stringify(res.data)).length 
        );
        let concData = "";
        for (var i = 0; i < JSON.parse(JSON.stringify(res.data)).length; i++) {
          concData =
            concData +
            "\r\n " +
            String(JSON.parse(JSON.stringify(res.data))[i].username) +
            " - " +
            String(JSON.parse(JSON.stringify(res.data))[i].email);
          this.state.textVar = concData
            .split("\n")
            .map((str, index) => <h5 key={index}>{str}</h5>);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return (
      <Fragment>
        <Card>
          <CardBody>
            <button onClick={() => alert("coming soon")}>Delete User</button>{" "}
            &nbsp;
            <button onClick={() => alert("coming soon")}>Email All</button>{" "}
            &nbsp;
            <button
              style={{ marginTop: "5px" }}
              onClick={() => alert("coming soon")}
            >
              Create Admin
            </button>{" "}
            &nbsp;
          </CardBody>
        </Card>
        {this.state.textVar} <br />
      </Fragment>
    );
  }
}
export default UserQueryComponent;
