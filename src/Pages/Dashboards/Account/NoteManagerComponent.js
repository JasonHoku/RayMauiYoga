// import React, { Component, Fragment, useEffect } from "react";

// import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
// import { Query, ApolloProvider, Mutation } from "react-apollo";

// import {
//   Row,
//   Col,
//   Button,
//   ListGroupItem,
//   Card,
//   CardBody,
//   Form,
//   FormGroup,
//   Label,
//   Container,
//   Input,
//   FormText,
//   CardHeader,
//   CardTitle,
//   CardLink,
//   CardImg,
//   NavLink,
//   TabContent,
//   TabPane,
// } from "reactstrap";
// const apolloClient = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: "https://api.raymauiyoga.com/graphql",
//     headers: {
//       "content-type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     },
//   }),
// });

// class NoteManagerComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       noteVar: "",
//       deleteIDVar: "26",
//     };
//   }

//   componentDidMount() {
//     this.getData();
//     setTimeout(() => this.getData(), 500);
//     setTimeout(() => this.getData(), 1500);
//     setTimeout(() => this.getData(), 2500);

//   }
//   componentWillUnmount() {
//     clearInterval(this.state.intervalId);
//   }
//   getData() {
//     try {
//       this.state.authVar = axios
//         .get(`https://api.raymauiyoga.com/notes`, {
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         })
//         .then((res) => {
//           if (res.err == null) {
//             this.setState({ textvar: JSON.stringify(res) });
//           }
//           let concData = "";
//           for (
//             var i = 0;
//             i < JSON.parse(JSON.stringify(res.data)).length;
//             i++
//           ) {
//             concData =
//               concData +
//               "\r\n ID#" +
//               JSON.stringify(JSON.parse(JSON.stringify(res.data))[i].id) +
//               " : " +
//               JSON.stringify(JSON.parse(JSON.stringify(res.data))[i].Note);

//             this.state.textVar = concData
//               .split("\n")
//               .map((str, index) => <h5 key={index}>{str}</h5>);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   handleInputChange(event) {
//     this.setState({
//       noteVar: event.target.value,
//     });
//   }
//   handleInputChange2(event) {
//     this.setState({
//       deleteIDVar: event.target.value,
//     });
//   }

//   onSubmit = () => {
//     const formData = new FormData();
//     formData.Note = this.state.noteVar;
//     console.log(formData);

//     axios
//       .post(`https://api.raymauiyoga.com/notes`, JSON.stringify(formData), {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       })
//       .then((res) => {
//         if (res.err == null) {
//           document.getElementById("apiupform").hidden = false;
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   onSubmitDelete = () => {
//     const formData = new FormData();
//     formData.Note = this.state.noteVar;
//     formData.id = 21;
//     console.log(formData);

//     axios
//       .post(`https://api.raymauiyoga.com/notes`, JSON.stringify(formData), {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       })
//       .then((res) => {
//         if (res.err == null) {
//           alert("Success!");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   onImageChange = (event) => {
//     console.log(event.target.files);

//     this.setState({
//       images: event.target.files,
//     });
//   };

//   render() {
//     return (
//       <Fragment>
//         <CardHeader> PCP Private Note Manager</CardHeader>
//         <CardBody>
//           <div
//             style={{
//               boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
//             }}
//           >
//             <span>{this.state.textVar}</span>
//           </div>
//           <input
//             type="number"
//             onChange={() => this.handleInputChange2(event)}
//             style={{ width: "50px" }}
//           ></input>{" "}
//           &nbsp;
//           <MyMutationMutation />
//           <br />
//           <Input
//             value={this.state.noteVar}
//             name="NoteVar"
//             id="NoteVar"
//             onChange={() => this.handleInputChange(event)}
//             style={{ top: "15px", position: "relative" }}
//             type="textarea"
//           ></Input>{" "}
//           &nbsp;
//           <button onClick={() => this.onSubmit()}> Send</button> <br />
//         </CardBody>
//         <br />
//       </Fragment>
//     );
//   }
// }
// export default NoteManagerComponent;
