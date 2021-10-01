// import React, { Component, Fragment, useEffect } from "react";
// import { compose, graphql } from "react-apollo";

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
//   Progress,
//   CardFooter,
//   ButtonGroup,
// } from "reactstrap";
// import { toHtml } from "@fortawesome/fontawesome-svg-core";


// import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
// import { Query, ApolloProvider, Mutation } from "react-apollo";
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

// class ProductManagerComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       authVar: this.props.authVar,
//       textVar: "",
//     };
//   }

//   handleInputChange2(event) {
//     this.setState({
//       deleteIDVar: event.target.value,
//     });
//   }
//   onSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (this.state.images != null) {
//       document.getElementById("apiupform").hidden = true;

//       Array.from(this.state.images).forEach((image) => {
//         formData.append("files", image);
//       });

//       formData.Title = "asdf";
//       formData.Sizes = "asdf";
//       formData.Shop = "asdf";
//       formData.Price = "asdf";
//       formData.Image = this.state.images[0];
//       console.log(formData);

//       axios
//         .post(
//           `https://api.raymauiyoga.com/pcp-products`,
//           JSON.stringify(formData),
//           {
//             headers: {
//               "content-type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//           }
//         )
//         .then((res) => {
//           if (res.err == null) {
//             alert("Success!");
//             document.getElementById("apiupform").hidden = false;
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
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
//         <CardHeader> PCP Product Adder</CardHeader>
//         <CardBody>
//           <span style={{ marginLeft: "2px", marginRight: "2px" }}>
//             <div
//               style={{
//                 boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
//                 marginRight: "5px",
//                 maxWidth: "375px",
//               }}
//             >
//               <p></p>
//               ID #: &nbsp;<input disabled></input> <br />
//               Title : &nbsp;<input></input> <br />
//               Description: &nbsp;<input></input> <br />
//               Options: &nbsp;<input></input> <br />
//               Category: &nbsp;<input></input> <br />
//               Price: &nbsp;<input></input> <br />
//               <p></p>
//               <button> Initialize Product</button> <br />
//               <h2> Status: Pending</h2>
//               <div className="App">
//                 <br />
//                 <Form onSubmit={this.onSubmit}>
//                   &nbsp;Product Image:<br></br>{" "}
//                   <Input
//                     type="file"
//                     encType="multipart/form-data"
//                     name="apiup"
//                     id="apiupform4"
//                     onChange={this.onImageChange}
//                     alt="image"
//                   />
//                   <br />
//                   <br />
//                   <div>
//                     <Button
//                       style={{
//                         alignSelf: "center",
//                         display: "block",
//                         position: "relative",
//                         width: "100%",
//                       }}
//                       type="submit"
//                     >
//                       Send Image
//                     </Button>
//                   </div>
//                 </Form>{" "}
//                 <br />
//                 <input
//                   type="number"
//                   onChange={() => this.handleInputChange2(event)}
//                   style={{ width: "50px" }}
//                 ></input>{" "}
//                 <MyMutationMutation />
//                 <br />
//               </div>
//               {this.state.textVar}
//             </div>
//           </span>
//         </CardBody>
//       </Fragment>
//     );
//   }
// }
// export default ProductManagerComponent;
