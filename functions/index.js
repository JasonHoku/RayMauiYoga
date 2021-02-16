const functions = require("firebase-functions");

let muxTID = null;
let muxTS = null;
const Mux = require("@mux/mux-node");

const admin = require("firebase-admin");

exports.addMessage = functions.https.onCall(async () => {
  return new Promise((resolve, reject) => {
    var colors = {};
    try {
      admin.initializeApp();
    } catch (error) {
      console.log(error);
    }
    var db = admin.firestore();
    db.collection("apis")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var key = doc.id;
          var color = doc.data();
          color["key"] = key;
          colors[key] = color;
        });

        var colorsStr = JSON.stringify(colors, null, "\t");
        console.log("colors callback result : " + colorsStr);
        muxTID = JSON.parse(JSON.stringify(colors["0"])).muxTID;
        muxTS = JSON.parse(JSON.stringify(colors["0"])).muxTS;
        try {
          const { Video } = new Mux(muxTID, muxTS);
          Video.Assets.list().then((asset) => {
            resolve(asset);
          });
        } catch (err) {
          return resolve(err);
        }
      })
      .catch((reason) => {
        console.log('db.collection("colors").get gets err, reason: ' + reason);
        reject(reason);
      });
  });
});
