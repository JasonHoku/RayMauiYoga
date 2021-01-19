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
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";
import gql from "graphql-tag";

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

// This setup is only needed once per application;
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.raymauiyoga.com/graphql",
    headers: {
      "content-type": "application/json",
    },
  }),
});

export default class AccountElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formEmail: "",
      formName: [],
      formDesc: [],
      formMessage: "",
      activeTab: "1",
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

    const MY_MUTATION_MUTATION = gql`
    mutation MyMutation {
      createMicroComment(
        input: {
          data: {
            name: "${this.state.formName}  + ${Date().toString()}"
            comment: "${this.state.formDesc}"
            user: "${localStorage.getItem("username")}"
          }
        }
      ) {
        microComment {
          name
          comment
          user
          
        }
      }
    }
    
    `;

    const MyMutationMutation = (props) => {
      this.state.sendButton = "Send";
      try {
        return (
          <Mutation mutation={MY_MUTATION_MUTATION}>
            {(MyMutation, { loading, error, data }) => {
              try {
                if (loading) return <pre>Loading</pre>;

                if (error) {
                }
              } catch (error) {}
              const dataEl = data
                ? ((<pre>{JSON.stringify(null, null, 2)}</pre>),
                  (this.state.sendButton = "Message Sent!"))
                : null;
              return (
                <div style={{ alignContent: "center" }}>
                  <br />
                  {dataEl} &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    id="apiupform2"
                    onClick={() =>
                      MyMutation(formName + formDesc, Date().toString())
                    }
                  >
                    {this.state.sendButton}
                  </button>{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    style={{ backgroundColor: "#660000" }}
                    onClick={logout}
                  >
                    {" "}
                    Logout
                  </button>
                </div>
              );
            }}
          </Mutation>
        );
      } catch (error) {}
    };
    return (
      <Fragment>
        <Row
          style={{
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <ApolloProvider client={apolloClient}>
            <Card
              style={{
                width: "24rem",
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
                      classnames({ active: this.state.activeTab === "2" })
                    }
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Live Chat
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
                  <CardHeader
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    Welcome, {localStorage.getItem("username")} !
                  </CardHeader>
                  <CardBody
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <div> Thank you for signing up with RayMauiYoga!</div>{" "}
                    <br />
                    Additional site features are coming soon, for now you can
                    send a message directly to administaration here.
                    <br />
                    <br />
                    <Form
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      Contact Info: <br />
                      <Input
                        onChange={this.handleInputChange}
                        name="formName"
                        type="text"
                        value={this.state.formName}
                      ></Input>
                      <br />
                      Message: <br />
                      <Input
                        style={{ width: "250px" }}
                        onChange={this.handleInputChange2}
                        name="formDesc"
                        type="textarea"
                        value={this.state.formDesc}
                      ></Input>
                      <br />
                    </Form>
                    <MyMutationMutation />
                  </CardBody>
                </TabPane>
                <TabPane tabId="2">
                  <CardBody>Live Chat, Coming Soon.</CardBody>
                </TabPane>
                <TabPane tabId="3">
                  <CardBody>
                    Account information and tools will propagate here soon.
                  </CardBody>
                </TabPane>
              </TabContent>
            </Card>
          </ApolloProvider>
        </Row>
      </Fragment>
    );
  }
}
