import React, { useCallback, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import AccountElements from "../../Pages/Dashboards/Account/account";
import ModeratorElements from "../../Pages/Dashboards/Account/moderator";

const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "raymauiyoga-d75b1.firebaseapp.com",
  projectId: "raymauiyoga-d75b1",
  storageBucket: "raymauiyoga-d75b1.appspot.com",
  messagingSenderId: "313463385446",
  appId: "1:313463385446:web:7d2d2fd362f03913802ca7",
  measurementId: "G-S8EJTRMN63",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true, email: user.email });
    } else {
      callback({ loggedIn: false });
    }
  });
}
function login(username, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
function logout() {
  firebase.auth().signOut();
}
function LoginView({ onClick, error }) {
  const [loadElements, setloadElements] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          onClick(username, password);
        }}
      >
        Login
      </button>
      <span>{error}</span>
    </div>
  );
}
function LogoutView({ onClick }) {
  const [loadElements, setloadElements] = useState(null);
  const user = useContext(UserContext);
  return <div></div>;
}
function AppAuth() {
  const [user, setUser] = useState({ loggedIn: false });
  const [error, setError] = useState("");
  const [elementAuth, setelementAuth] = useState(null);
  const [loadStage, setloadStage] = useState("1");
  const [loadElements, setloadElements] = useState(null);

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        firebase
          .firestore()
          .collection("users")
          .doc(authResult.user.uid)
          .set({
            user: String(authResult.user.displayName),
            uuid: String(authResult.user.uid),
          });

        localStorage.setItem("username", authResult.user.displayName);
        if (
          authResult.user.uid === "zj0jKGLWbUPb7FapAUoCS9zyaoo1" ||
          authResult.user.uid === "8gZKzIAI7le5B03GbynBUKCpyl02"
        ) {
          setloadElements(
            <span>
              <ModeratorElements />
              <button
                className="zoom"
                style={{
                  width: "90px",
                  backgroundColor: "#AA3322",
                  height: "33px",
                  alignSelf: "right",
                  float: "right",
                  display: "flex",
                  position: "relative",
                  borderRadius: "10px",
                  fontSize: "15px",
                }}
                onClick={() => {
                  firebase.auth().signOut() &
                    localStorage.setItem("username", null);
                  localStorage.setItem("jwt", null);
                  window.location.reload();
                }}
              >
                Sign&nbsp;Out
              </button>
            </span>
          );
        } else setloadElements(<AccountElements />);
        return false;
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
  };
  function decideUserLoad() {
    if (user.loggedIn) {
      if (user.email === "jlevien808@gmail.com") {
        return (
          <span>
            <button
              className="zoom"
              style={{
                width: "90px",
                backgroundColor: "#AA3322",
                height: "33px",
                alignSelf: "right",
                float: "right",
                display: "flex",
                position: "relative",
                top: "-40px",
                borderRadius: "10px",
                fontSize: "15px",
              }}
              onClick={() => {
                firebase.auth().signOut() &
                  localStorage.setItem("username", null);
                localStorage.setItem("jwt", null);
                window.location.reload();
              }}
            >
              Sign&nbsp;Out
            </button>
            {console.log(user)}
            <ModeratorElements />
          </span>
        );
      }
    } else if (user.loggedIn) {
      return (
        <span>
          <AccountElements />
        </span>
      );
    }
  }

  var firebaseui = require("firebaseui");

  useEffect(() => {
    if (firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance();
      ui.start("#firebaseui-auth-container", uiConfig);
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);
  const requestLogin = useCallback((username, password) => {
    login(username, password).catch((error) => setError(error.code));
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);
  if (!user.loggedIn) {
    return <div id="firebaseui-auth-container">{decideUserLoad()}</div>;
  }
  return (
    <UserProvider value={user}>
      <div id="firebaseui-auth-container">
        <LogoutView onClick={requestLogout} />
        {decideUserLoad()}
      </div>
    </UserProvider>
  );
}
export default AppAuth;
