import React, { Component, Fragment, useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import {
  FirestoreProvider,
  FirestoreCollection,
  FirestoreDocument,
  FirestoreMutation,
} from "@react-firebase/firestore";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
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

  function handleUpload(e) {
    const storage = firebase.storage();
    e.preventDefault();
    const uploadTask = storage.ref(`/products/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("products")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          localStorage.setItem("gotDownloadURL", url);
          console.log(localStorage.getItem("gotDownloadURL"));
        });
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <IfFirebaseAuthed>
        {() => (
          <div>
            <FirestoreProvider {...firebaseConfig} firebase={firebase}>
              <FirestoreMutation
                type="set"
                path={`/users/` + localStorage.getItem("username")}
              >
                {({ runMutation }) => {
                  if (loadCount === "1") {
                    <div>
                      <span
                        style={{
                          alignSelf: "center",
                          display: "block",
                          position: "relative",
                          borderRadius: "5px",
                          width: "100%",
                        }}
                        span={runMutation({
                          username: localStorage.getItem("username"),
                          useruuid: localStorage.getItem("userUID"),
                        }).then((res) => {
                          if (res) {
                            setloadCount("2");
                            console.log(res);
                            return null;
                          }
                        })}
                      ></span>
                    </div>;
                    return null;
                  } else return null;
                }}
              </FirestoreMutation>
            </FirestoreProvider>
          </div>
        )}
      </IfFirebaseAuthed>
    </div>
  );
}
export default SubmitListingAsUser;
