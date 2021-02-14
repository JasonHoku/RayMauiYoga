const functions = require("firebase-functions");

let muxTID = null;
let muxTS = null;
const Mux = require("@mux/mux-node");

exports.addMessage = functions.https.onCall(async (data) => {
  const text = data.text;
  let text2 = [];
  let setLoaded = "1";
  console.log(text);

  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const snapshot = await admin.firestore().collection("apis").doc("0").get();
  if (!snapshot.exists) {
    console.log("No such document!");
  } else {
    console.log((muxTS = snapshot.data().muxTS));
    try {
      const { Video } = new Mux(muxTID, muxTS);
      Video.Assets.list().then((asset) => {
        return { data: "x" };
      });
    } catch (err) {
      return { data: "y" };
    }
    return { data: "y" };
  }
  return { data: "y" };
});

exports.muxEvents = functions.https.onRequest((request, response) => {
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const loadsnapshot = async () => {
    const snapshot = await admin.firestore().collection("apis").doc("0").get();
    if (!snapshot.exists) {
      console.log("No such document!");
    } else {
      console.log((muxTS = snapshot.data().muxTS));
      console.log((muxTID = snapshot.data().muxTID));

      try {
        const { Video } = new Mux(muxTID, muxTS);
        Video.Assets.list().then((asset) => {
          response.send(asset);
        });
      } catch (err) {
        return response.send(err);
      }
    }
  };
  loadsnapshot();
});
