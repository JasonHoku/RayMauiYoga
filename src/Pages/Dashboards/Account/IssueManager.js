// import React, { Component, Fragment, useEffect } from "react";
// import { compose, graphql } from "react-apollo";

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

// class IssueManager extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       noteVar: "",
//       textVar: " Loading...",
//       deleteIDVar: "0",
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
//     console.log("Check Issue Data");
//     try {
//       this.state.authVar = axios
//         .get(`https://api.raymauiyoga.com/issues`, {
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         })
//         .then((res) => {
//           if (res.err == null) {
//             this.setState({ textvar: JSON.stringify(res) });
//           }
//           localStorage.setItem(
//             "ActiveIssueCount",
//             String(JSON.parse(JSON.stringify(res.data)).length)
//           );
//           let concData = "";
//           for (
//             var i = 0;
//             i < JSON.parse(JSON.stringify(res.data)).length;
//             i++
//           ) {
//             concData =
//               concData +
//               "\r\n ID#" +
//               String(JSON.parse(JSON.stringify(res.data))[i].id) +
//               "| " +
//               String(JSON.parse(JSON.stringify(res.data))[i].Title) +
//               ": " +
//               String(JSON.parse(JSON.stringify(res.data))[i].Description);

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
//   handleInputChange3(event) {
//     this.setState({
//       titleVar: event.target.value,
//     });
//   }
//   handleInputChange2(event) {
//     this.setState({
//       deleteIDVar: event.target.value,
//     });
//   }

//   onSubmit = () => {
//     const formData = new FormData();
//     formData.Description = this.state.noteVar;
//     formData.Title = this.state.titleVar;
//     formData.User = localStorage.getItem("username");
//     console.log(formData);

//     axios
//       .post(`https://api.raymauiyoga.com/issues`, JSON.stringify(formData), {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       })
//       .then((res) => {
//         if (res.err == null) {
//           document.getElementById("apiupform").hidden = false;
//         }
//         console.log(res);
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
//       .post(
//         `https://api.raymauiyoga.com/micro-comments`,
//         JSON.stringify(formData),
//         {
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       )
//       .then((res) => {
//         if (res.err == null) {
//           alert("Success!");
//         }
//         console.log(res);
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
//         <CardHeader>Issue Manager</CardHeader>
//         <CardBody>
//           <div
//             style={{
//               boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
//               marginLeft: "-15px",
//               marginRight: "-15px",
//               maxWidth: "375px",
//             }}
//           >
//             <div style={{ marginLeft: "5px" }}>
//               <Input
//                 value={this.state.titleVar}
//                 name="titleVar"
//                 placeholder="Issue Title"
//                 id="titleVar"
//                 onChange={() => this.handleInputChange3(event)}
//                 style={{ top: "5px", position: "relative" }}
//                 type="text"
//               ></Input>{" "}
//               <br />
//               <Input
//                 value={this.state.noteVar}
//                 name="NoteVar"
//                 id="NoteVar"
//                 placeholder="Issue Description"
//                 onChange={() => this.handleInputChange(event)}
//                 style={{ top: "15px", position: "relative", width: "250px" }}
//                 type="textarea"
//               ></Input>{" "}
//               <br /> <br />
//               <button onClick={() => this.onSubmit()}>
//                 {" "}
//                 Submit Issue
//               </button>{" "}
//               <br />
//               <br />
//               <input
//                 type="number"
//                 onChange={() => this.handleInputChange2(event)}
//                 style={{ width: "50px" }}
//               ></input>{" "}
//               &nbsp;
//               <MyMutationMutation />
//               <br />
//               <span style={{ marginLeft: "2px", marginRight: "2px" }}>
//                 <div
//                   style={{
//                     boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
//                     marginRight: "5px",
//                   }}
//                 >
//                   {" "}
//                   Comments:
//                   {this.state.textVar}
//                 </div>
//               </span>
//             </div>
//           </div>{" "}
//         </CardBody>
//         <br />
//       </Fragment>
//     );
//   }
// }
// export default IssueManager;
