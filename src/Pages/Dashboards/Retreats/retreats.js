import React, { Component, Fragment } from "react";
import {TransitionGroup} from "react-transition-group";

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
  ListGroupItem,
  Card,
  CardBody,
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



export default class MusicElements extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11",
    };
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

  render() {
      return (
        <Fragment>
          <TransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Row
              style={{
                textAlign: "center",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                style={{
                  width: "90%",
                  boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                  height: "min",
                }}
              >
                <CardHeader>Retreat Through Connection</CardHeader>
                <TabContent>
                  {" "}
                  <TabPane id="1">
                    <Card>
                      <CardBody> Information Coming Soon.</CardBody>
                    </Card>{" "}
                  </TabPane>
                </TabContent>
              </Card>
            </Row>
          </TransitionGroup>
        </Fragment>
      );
  }
}
