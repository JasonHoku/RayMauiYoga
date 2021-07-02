let muxTID = null;
let muxTS = null;
const Mux = require("@mux/mux-node");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

console.log("Loaded!");

exports.addMessage = functions.https.onCall(async () => {
	return new Promise((resolve, reject) => {
		var colors = {};
		var db = admin.firestore();
		db
			.collection("apis")
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var key = doc.id;
					var color = doc.data();
					color["key"] = key;
					colors[key] = color;
				});

				// console.log("colors callback result : " + colorsStr);
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

exports.processPayment = functions.https.onRequest((req, res) => {
	res.status(200);
	const cors = require("cors")({ origin: true });
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "Content-Type");
	//Declare CORs Rules
	cors(req, res, () => {
		res.status(200);
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Access-Control-Allow-Headers", "Content-Type");
		const userID = JSON.parse(req.headers["headertokens"]).uid;
		const gotHeaders = req.headers["headertokens"];

		return new Promise((resolve, reject) => {
			var dbData = {};
			var db = admin.firestore();
			db
				.collection("Secrets")
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						var key = doc.id;
						var data = doc.data();
						data["key"] = key;
						dbData[key] = data;
					});

					try {
						var paypal = require("paypal-rest-sdk");
						paypal.configure({
							mode: "live", //sandbox or live
							client_id: dbData.PayPal.ID,
							client_secret: dbData.PayPal.Secret,
						});

						var create_payment_json = {
							intent: "sale",
							payer: {
								payment_method: "paypal",
							},
							redirect_urls: {
								return_url: "https://raymauiyoga.com/",
								cancel_url: "https://raymauiyoga.com/",
							},
							transactions: [
								{
									item_list: {
										items: [
											{
												name: "Test",
												sku: "0000",
												price: "1.00",
												currency: "USD",
												quantity: 1,
											},
										],
									},
									amount: {
										currency: "USD",
										total: "1.00",
									},
									description: "This is the payment description.",
								},
							],
						};
						paypal.payment.create(create_payment_json, function (error, payment) {
							if (error) {
								throw error;
							} else {
								console.log("Create Payment Response");
								console.log(payment);

								db
									.collection("PaymentProcessing")
									.doc()
									.set(
										{
											Time: admin.firestore.FieldValue.serverTimestamp(),
											Payment: payment,
											uid: JSON.parse(gotHeaders).uid,
											email: JSON.parse(gotHeaders).email,
											name: JSON.parse(gotHeaders).name,
											hostname: JSON.parse(gotHeaders).hostname,
										},

										{ merge: true }
									);
								resolve(payment);

								res.send(JSON.stringify(payment));
								res.status(200).send();

								console.log(JSON.parse(gotHeaders).uid);
							}
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
});

exports.twoMinuteInterval = functions.pubsub
	.schedule("every 2 minutes")
	.onRun((context) => {
		async function getData() {
			require("firebase/functions");
			var db = admin.firestore();

			var dataSet = {};
			db
				.collection("apis")
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						var key = doc.id;
						var dataKeys = doc.data();
						dataKeys["key"] = key;
						dataSet[key] = dataKeys;
					});

					// console.log("colors callback result : " + colorsStr);
					muxTID = JSON.parse(JSON.stringify(dataSet["0"])).muxTID;
					muxTS = JSON.parse(JSON.stringify(dataSet["0"])).muxTS;
					const { Video } = new Mux(muxTID, muxTS);
					Video.Assets.list().then((asset) => {
						console.log(asset);
						asset.forEach((el) => {
							console.log(el.id);
							console.log(el.playback_ids[0].id);

							if (el.status !== "errored") {
								db
									.collection("VideoData")
									.doc(el.id)
									.set(
										{
											Title: String(" "),
											playbackId: String(el.playback_ids[0].id),
											meta: String(" "),
											LatestRun: admin.firestore.FieldValue.serverTimestamp(),
										},
										{ merge: true }
									);
							}
						});
					});
				})
				.catch((reason) => {});
		}
		getData();
	});

//

//
exports.oneHourInterval = functions.pubsub
	.schedule("every 60 minutes")
	.onRun((context) => {
		var dbData = {};
		var genDBData = {};

		// Detect FireStoreData
		function buildGeneratedData() {
			var colors = {};

			var db = admin.firestore();
			db
				.collection("apis")
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						var key = doc.id;
						var color = doc.data();
						color["key"] = key;
						colors[key] = color;
					});

					var colorsStr = JSON.stringify(colors, null, "\t");
					//      console.log("colors callback result : " + colorsStr);
					muxTID = JSON.parse(JSON.stringify(colors["0"])).muxTID;
					muxTS = JSON.parse(JSON.stringify(colors["0"])).muxTS;
					try {
						const { Video } = new Mux(muxTID, muxTS);
						Video.Assets.list().then((asset) => {
							//         console.log(asset);
						});
					} catch (err) {
						console.log(err);
					}
				})
				.catch((reason) => {
					console.log('db.collection("colors").get gets err, reason: ' + reason);
					console.log(reason);
				});

			// console.log("||| Running Build Data");
			let todoList = "";
			let listArray = [];
			var db = admin.firestore();
			db
				.collection("Secrets")
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						var key = doc.id;
						var data = doc.data();
						data["key"] = key;
						dbData[key] = data;
					});
					var DetectPublicDataBuildInterval;
					if (DetectPublicDataBuildInterval) {
						clearInterval(DetectPublicDataBuildInterval);
						//     console.log("||| Stopping FireStore Public Data Build Interval");
					}

					if (dbData.MetaData.FireConnected) {
						//    console.log("||| Connection True");
						let listArray = [];
						//    console.log("||| Building GeneratedData");
						var db = admin.firestore();
						db
							.collection("Secrets")
							.get()
							.then((snapshot) => {
								snapshot.forEach((doc) => {
									var key = doc.id;
									var data = doc.data();
									data["key"] = key;
									dbData[key] = data;
								});

								//Got Secrets then Build Public Data
								var db = admin.firestore();
								db
									.collection("Users")
									.doc(String(dbData.Admins[0]))
									.get()
									.then((doc) => {
										todoList = JSON.parse(JSON.stringify(doc.data())).Todo;
										todoList.forEach((todo) => listArray.push(String(todo + " ")));
										//Got Admin ToDo Now Generate Text
										async function sendGeneratedData() {
											db
												.collection("Public")
												.get()
												.then((snapshot2) => {
													snapshot2.forEach((doc2) => {
														var key = doc2.id;
														var data = doc2.data();
														data["key"] = key;
														genDBData[key] = data;
													});
													db
														.collection("Public")
														.doc("GeneratedData")
														.set(
															{
																LatestRun: admin.firestore.FieldValue.serverTimestamp(),
																RawText: ` ${
																	Date(genDBData.GeneratedData.LatestRun).split("(")[0]
																} -@!%!%!@-  ${String(parseInt(genDBData.RunCounter.count) + 1)}
          -@!%!%!@-  ${String(listArray).replace(/,/g, " ")}`,
															},
															{ merge: true }
														);
												});
										}
										if (!dbData.MetaData.FireConnected) {
											//    console.log("||| Connection Quit From DB");
											sendGeneratedData().then(() => {
												clearInterval(DetectPublicDataBuildInterval);
											});
										}
										sendGeneratedData();
									});
							});
					}
				});
		}
		buildGeneratedData();
	});

exports.getRayMauiYogaData = functions.https.onRequest((req, res) => {
	var dbData = {};
	res.status(200);
	const cors = require("cors")({ origin: true });
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Headers", "Content-Type");
	try {
		//Declare CORs Rules
		const cors = require("cors")({ origin: true });
		res.status(200);
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Access-Control-Allow-Headers", "Content-Type");
		cors(req, res, () => {
			const cors = require("cors")({ origin: true });
			res.status(200);
			res.set("Access-Control-Allow-Origin", "*");
			res.set("Access-Control-Allow-Headers", "Content-Type");
			const gotUID = JSON.parse(req.headers["headertokens"]).uid;
			const userID = JSON.parse(req.headers["headertokens"]).uid;
			const gotHeaders = JSON.stringify(req.headers["headertokens"]);
			async function getDBData() {
				var db = admin.firestore();
				db
					.collection("totalClicks")
					.get()
					.then((snapshot) => {
						snapshot.forEach((doc) => {
							var key = doc.id;
							var data = doc.data();
							data["key"] = key;
							dbData[key] = data;
							//Development block for localhost emulator
							//Begin Auth Comparison
							if (dbData.value) {
								//Successful Admin UID

								res.send(JSON.stringify(dbData.value.population));
								res.status(200).send();
							} else {
								//Not Admin UID
								res.send(JSON.stringify("Error Retrieving Data"));
								res.status(200).send();
							}
						});
					});
			}
			getDBData();
		});
	} catch (error) {
		console.log(error);
	}
});
