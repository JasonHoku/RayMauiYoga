import React, { Component, Fragment, useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "raymauiyoga-d75b1.firebaseapp.com",
  projectId: "raymauiyoga-d75b1",
  storageBucket: "raymauiyoga-d75b1.appspot.com",
  messagingSenderId: "313463385446",
  appId: "1:313463385446:web:7d2d2fd362f03913802ca7",
  measurementId: "G-S8EJTRMN63",
};
function SubmitListingAsUser() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [loadCount, setloadCount] = useState("1");

  function handleChange(e) {
    setFile(e.target.checked);
  }


  return (
    <div style={{ width: "100%" }}>
    </div>
  );
}
export default SubmitListingAsUser;
