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

exports.clipVideoRequest = functions.https.onRequest((req, res) => {
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
		var assetURL = JSON.parse(req.headers["headertokens"]).assetURL;
		var startCrop = JSON.parse(req.headers["headertokens"]).startCrop;
		var endCrop = JSON.parse(req.headers["headertokens"]).endCrop;

		var dbData = {};
		var dbData2 = {};

		console.log(userID);

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

				if (userID === dbData.AdminIDs[0] || userID === dbData.AdminIDs[1]) {
					console.log("True");

					var db = admin.firestore();
					db
						.collection("apis")
						.get()
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								var key = doc.id;
								var color = doc.data();
								color["key"] = key;
								dbData2[key] = color;
							});

							// console.log("colors callback result : " + colorsStr);

							muxTID = JSON.parse(JSON.stringify(dbData2["0"])).muxTID;
							muxTS = JSON.parse(JSON.stringify(dbData2["0"])).muxTS;

							//

							//
							try {
								const { Video } = new Mux(muxTID, muxTS);

								CreateAsset();
								async function CreateAsset() {
									const asset = await Video.Assets.create({
										playback_policy: "public",
										input: [
											{
												url: "mux://assets/" + assetURL,
												start_time: startCrop,
												end_time: endCrop,
											},
										],
									});
									console.log(await asset);
									const playbackId = await Video.Assets.createPlaybackId(asset.id, {
										policy: "public",
									});
									console.log(playbackId);
									res.send({ res: { id: playbackId, asset: asset } });
								}
								// Video.Assets.list().then((asset) => { });
							} catch (err) {
								res.send(err);
							}
						});
				} else {
					console.log("false");
				}
			});
	});
});

exports.deleteVideoRequest = functions.https.onRequest((req, res) => {
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
		var assetURL = JSON.parse(req.headers["headertokens"]).assetURL;
		var startCrop = JSON.parse(req.headers["headertokens"]).startCrop;
		var endCrop = JSON.parse(req.headers["headertokens"]).endCrop;

		var dbData = {};
		var dbData2 = {};

		console.log(userID);

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

				if (userID === dbData.AdminIDs[0] || userID === dbData.AdminIDs[1]) {
					console.log("True");

					var db = admin.firestore();
					db
						.collection("apis")
						.get()
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								var key = doc.id;
								var color = doc.data();
								color["key"] = key;
								dbData2[key] = color;
							});

							// console.log("colors callback result : " + colorsStr);

							muxTID = JSON.parse(JSON.stringify(dbData2["0"])).muxTID;
							muxTS = JSON.parse(JSON.stringify(dbData2["0"])).muxTS;

							//

							//
							try {
								const { Video } = new Mux(muxTID, muxTS);

								delAsset();
								async function delAsset() {
									const asset = await Video.Assets.del(assetURL);
									console.log(await asset);
									res.send({ res: { asset: asset } });
								}
								// Video.Assets.list().then((asset) => { });
							} catch (err) {
								res.send(err);
							}
						});
				} else {
					console.log("false");
				}
			});
	});
});

exports.processPaid = functions.https.onRequest((req, res) => {
	const htmlParams = req.query;
	const paymentId = req.query.paymentId;
	const userParam = req.query.user;
	const token = req.query.token;
	const PayerID = req.query.PayerID;
	const ba_token = req.query.ba_token;
	console.log("Params: ", htmlParams);

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

			var paypal = require("paypal-rest-sdk");
			paypal.configure({
				mode: "live", //sandbox or live
				client_id: dbData.PayPal.ID,
				client_secret: dbData.PayPal.Secret,
			});
			if (htmlParams.payment_method !== "singleMonth") {
				paypal.billingAgreement.execute(
					token,
					{},
					function (error, billingAgreement) {
						if (error) {
							console.log(error);
							throw error;
						} else {
							console.log("Approved");
							console.log(JSON.stringify(token));

							db.collection("UserDocs").doc(userParam).set(
								{
									meta: 1,
								},
								{ merge: true }
							);

							//PaymentApproved
							db
								.collection("PaymentApproved")
								.doc()
								.set(
									{
										Time: admin.firestore.FieldValue.serverTimestamp(),
										paymentId: ba_token,
										paymentData: token,
										UID: userParam,
									},
									{ merge: true }
								)
								.then(() => {
									res.redirect("https://raymauiyoga.com/account");
								});
							console.log("Billing Agreement Execute Response");
							console.log(JSON.stringify(billingAgreement));
						}
					}
				);
			} else {
				var execute_payment_json = {
					payer_id: PayerID,
					transactions: [
						{
							amount: {
								currency: "USD",
								total: "1.00",
							},
						},
					],
				};

				paypal.payment.execute(
					paymentId,
					execute_payment_json,
					function (error, payment) {
						if (error) {
							throw error;
						} else {
							console.log("Approved");
							console.log(JSON.stringify(payment));

							db.collection("UserDocs").doc(userParam).set(
								{
									meta: 1,
								},
								{ merge: true }
							);

							//PaymentApproved
							db
								.collection("PaymentApproved")
								.doc()
								.set(
									{
										Time: admin.firestore.FieldValue.serverTimestamp(),
										PayerID: PayerID,
										paymentId: paymentId,
										paymentData: payment,
										UID: userParam,
									},
									{ merge: true }
								)
								.then(() => {
									res.redirect("https://raymauiyoga.com/account");
								});
						}
					}
				);
			}
		});
});

exports.processPayment = functions.https.onRequest((req, res) => {
	res.status(200);
	const paymentParameter = req.query.payment;
	const intervalParameter = req.query.interval;
	const tierParameter = req.query.TierOne;
	const singleMonthParameter = req.query.SingleMonth;
	const AdvancedPaymentParameter = req.query.AdvancedPayment;
	console.log(req.query);
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
			var dbData2 = {};
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

					db
						.collection("PaymentOffers")
						.get()
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								var key = doc.id;
								var data = doc.data();
								data["key"] = key;
								dbData2[key] = data;
							});

							try {
								var paypal = require("paypal-rest-sdk");
								paypal.configure({
									mode: "live", //sandbox or live
									client_id: dbData.PayPal.ID,
									client_secret: dbData.PayPal.Secret,
								});

								var isoDate = new Date(Date.now());
								// eslint-disable-next-line no-unused-expressions
								isoDate.toISOString().slice(0, 19) + "Z";
								isoDate.setSeconds(isoDate.getSeconds() + 15);

								if (AdvancedPaymentParameter === "true") {
									var billingPlanAttributes = {
										description: "RayMauiYoga Subscription Plan",
										merchant_preferences: {
											auto_bill_amount: AdvancedPaymentParameter === "true" ? "yes" : "no",
											cancel_url: "https://www.raymauiyoga.com/account",
											initial_fail_amount_action: "continue",
											max_fail_attempts: "2",
											return_url:
												"https://us-central1-raymauiyoga-d75b1.cloudfunctions.net/processPaid?user=" +
												String(userID),
											setup_fee: {
												currency: "USD",
												value: "0",
											},
										},
										name: "RayMauiYoga-Membership",
										payment_definitions: [
											{
												amount: {
													currency: "USD",
													value: String(dbData2.RegularSub.price),
												},
												cycles: AdvancedPaymentParameter === "true" ? "0" : "1",
												frequency: "MONTH",
												frequency_interval: AdvancedPaymentParameter === "true" ? "1" : "1",
												name: "Regular 1",
												type: AdvancedPaymentParameter === "true" ? "REGULAR" : "TRIAL",
											},
										],
										type: AdvancedPaymentParameter === "true" ? "INFINITE" : "FIXED",
									};

									var billingPlanUpdateAttributes = [
										{
											op: "replace",
											path: "/",
											value: {
												state: "ACTIVE",
											},
										},
									];

									var billingAgreementAttributes = {
										name: "RayMauiYoga Membership 1",
										description: "RayMauiYoga Subscription 1",
										start_date: isoDate,
										plan: {
											id: "RayMauiYoga-01",
										},
										payer: {
											payment_method: "paypal",
										},
									};

									console.log("Creating Billing");
									// Create the billing plan
									paypal.billingPlan.create(
										billingPlanAttributes,
										function (error, billingPlan) {
											if (error) {
												console.log(error);
												throw error;
											} else {
												console.log("Create Billing Plan Response");
												console.log(billingPlan);

												// Activate the plan by changing status to Active
												paypal.billingPlan.update(
													billingPlan.id,
													billingPlanUpdateAttributes,
													function (error, response) {
														if (error) {
															console.log(error);
															throw error;
														} else {
															console.log(response);
															console.log(
																"Billing Plan state changed to " + billingPlan.state
															);
															billingAgreementAttributes.plan.id = billingPlan.id;

															// Use activated billing plan to create agreement
															paypal.billingAgreement.create(
																billingAgreementAttributes,
																function (error, billingAgreement) {
																	if (error) {
																		console.log(error);
																		throw error;
																	} else {
																		console.log("Create Billing Agreement Response");
																		//console.log(billingAgreement);
																		for (
																			var index = 0;
																			index < billingAgreement.links.length;
																			index++
																		) {
																			if (billingAgreement.links[index].rel === "approval_url") {
																				var approval_url = billingAgreement.links[index].href;
																				console.log(
																					"For approving subscription via Paypal, first redirect user to"
																				);
																				console.log(approval_url);

																				console.log("Payment token is");
																				// See billing_agreements/execute.js to see example for executing agreement
																				// after you have payment token

																				res.send(JSON.stringify(approval_url));
																				res.status(200).send();
																				console.log(JSON.parse(gotHeaders).uid);
																			}
																		}
																	}
																}
															);
														}
													}
												);
											}
										}
									);
								} else if (AdvancedPaymentParameter !== "true") {
									var create_payment_json = {
										intent: "order",
										payer: {
											payment_method: "paypal",
										},
										redirect_urls: {
											return_url:
												"https://us-central1-raymauiyoga-d75b1.cloudfunctions.net/processPaid?user=" +
												String(userID) +
												"&payment_method=singleMonth",
											cancel_url: "https://raymauiyoga.com/account",
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
											for (var i = 0; i < payment.links.length; i++) {
												if (payment.links[i].rel === "approval_url") {
													var approval_url = payment.links[i].href;
													console.log(
														"For approving subscription via Paypal, first redirect user to"
													);
													console.log(approval_url);

													console.log("Payment token is");
													// See billing_agreements/execute.js to see example for executing agreement
													// after you have payment token

													res.send(JSON.stringify(approval_url));
													res.status(200).send();
													console.log(JSON.parse(gotHeaders).uid);
													// paypal.payment.execute(el.Payment.id, execute_payment_json, function (error, payment) {
													// 	if (error) {
													// 		throw error;
													// 	} else {
													// 		console.log("Approved");
													// 		console.log(JSON.stringify(payment));
													// 	}
													// });
												}
											}
										}
									});
								}

								//
								// db
								// 	.collection("PaymentProcessing")
								// 	.doc()
								// 	.set(
								// 		{
								// 			Time: admin.firestore.FieldValue.serverTimestamp(),
								// 			Payment: payment,
								// 			uid: JSON.parse(gotHeaders).uid,
								// 			email: JSON.parse(gotHeaders).email,
								// 			name: JSON.parse(gotHeaders).name,
								// 			hostname: JSON.parse(gotHeaders).hostname,
								// 		},
								// 		{ merge: true }
								// 	);
								// 		resolve(payment);
								// 		res.send(JSON.stringify(payment));
								// 		res.status(200).send();
								// 		console.log(JSON.parse(gotHeaders).uid);
								// 	}
								// });
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
});

exports.twoMinuteInterval = functions.pubsub
	.schedule("every 1 minutes")
	.onRun((context) => {
		async function getData() {
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

					var dataSet2 = {};
					db
						.collection("VideoData")
						.get()
						.then((snapshot) => {
							snapshot.forEach((doc) => {
								var key = doc.id;
								var dataKeys = doc.data();
								dataKeys["key"] = key;
								dataSet2[key] = dataKeys;
							});
						});
					// console.log("colors callback result : " + colorsStr);
					muxTID = JSON.parse(JSON.stringify(dataSet["0"])).muxTID;
					muxTS = JSON.parse(JSON.stringify(dataSet["0"])).muxTS;
					const { Video } = new Mux(muxTID, muxTS);
					Video.Assets.list().then((asset) => {
						// console.log(asset);
						asset.forEach((el) => {
							// Got Mux Data, Check if exists
							// console.log(el.id);
							// console.log(el.playback_ids[0].id);
							if (
								el.status !== "errored" &&
								JSON.stringify(dataSet2).includes(el.playback_ids[0].id) === false
							) {
								//
								db
									.collection("VideoData")
									.doc(el.id)
									.set(
										{
											playbackId: String(el.playback_ids[0].id),
											LatestRun: admin.firestore.FieldValue.serverTimestamp(),
											Status: String(el.status),
											Created: String(el.created_at),
											Duration: String(el.duration),
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

// //

// //
// var db = admin.firestore();
// var dataSet = {};
// db
// 	.collection("PaymentProcessing")
// 	.get()
// 	.then((snapshot) => {
// 		snapshot.forEach((doc) => {
// 			var key = doc.id;
// 			var dataKeys = doc.data();
// 			dataKeys["key"] = key;
// 			dataSet[key] = dataKeys;
// 		});
// 		// if old or success
// 		Object.values(dataSet).forEach((el) => {
// 			console.log(el.Payment.id);

// 			let captureOrder = async function (orderId) {
// 				var paypal = require("paypal-rest-sdk");

// 				let dbData = {};
// 				var db = admin.firestore();
// 				db
// 					.collection("Secrets")
// 					.get()
// 					.then((snapshot) => {
// 						snapshot.forEach((doc) => {
// 							var key = doc.id;
// 							var data = doc.data();
// 							data["key"] = key;
// 							dbData[key] = data;
// 						});

// 						paypal.configure({
// 							mode: "live", //sandbox or live
// 							client_id: dbData.PayPal.ID,
// 							client_secret: dbData.PayPal.Secret,
// 						});

// 						var execute_payment_json = {
// 							"payer_id": "FM3Y6GFJLAFWJ",
// 							"transactions": [{
// 											"amount": {
// 															"currency": "USD",
// 															"total": "1.00"
// 											}
// 							}]
// 			};
// 						paypal.payment.execute(el.Payment.id, execute_payment_json, function (error, payment) {
// 							if (error) {
// 								throw error;
// 							} else {
// 								console.log("Approved");
// 								console.log(JSON.stringify(payment));
// 							}
// 						});
// 					});
// 			};
// 			captureOrder();
// 		});
// 	});

//
exports.oneHourInterval = functions.pubsub
	.schedule("every 60 minutes")
	.onRun((context) => {
		var dbData = {};
		var genDBData = {};

		//
		var db = admin.firestore();
		var dataSet = {};
		db
			.collection("PaymentProcessing")
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					var key = doc.id;
					var dataKeys = doc.data();
					dataKeys["key"] = key;
					dataSet[key] = dataKeys;
				});
				// if old or success
				console.log(dataSet);
				//
			});
		//

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
									.doc(String(dbData.AdminIDs[0]))
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

exports.processSendEmail = functions.https.onRequest((req, res) => {
	// const userID = JSON.parse(req.headers["headertokens"]).UUID;
	const reqBody = req.body;

	res.status(200);
	try {
		const cors = require("cors")({ origin: true });
		res.status(200);
		cors(req, res, () => {
			res.status(200);

			async function getDBData() {
				var db = admin.firestore();

				var gotEmailAPIKey = "";
				var gotDailyStats = {};

				var dbData = {};
				var LiveMapDataDB = {};
				var ListingsToApproveDB = {};
				var EcoQuestionsDB = {};
				var UsersDB = {};
				var totalHitsDB = {};
				var dbData2 = {};
				var totalCategories = [];

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
						// Continue Then
						// Get Another Doc
						//
						db
							.collection("totalClicks")
							.get()
							.then((userData) => {
								userData.forEach((doc) => {
									var key2 = doc.id;
									var data2 = doc.data();
									data2["key"] = key2;
									dbData2[key2] = data2;
								});

								/////////////////////////////////////

								/////////////////////////////////////

								const nodemailer = require("nodemailer");

								//
								let mailTransporter = nodemailer.createTransport({
									service: "gmail",
									auth: {
										user: dbData.Emailer.EmailID,
										pass: dbData.Emailer.EmailKey,
									},
								});

								Object.entries(dbData.ModEmails.EmailList).forEach((el, index) => {
									//
									let mailDetails = {
										from: "donotreply@microhawaii.com",
										to: el,
										subject: `DoNotReply RayMauiYoga Notification ${new Date(
											Date.now()
										).toString()}`,
										html: `<b>Date: ${new Date(Date.now()).toString()}</b>
<br />
<br />  Name: ${reqBody.name}
<br />
<br />  Contact: ${reqBody.contact}
<br />
<br />  Message: ${reqBody.message}
<br />
<br />
<br />
`,
									};

									mailTransporter.sendMail(mailDetails, function (err, data) {
										if (err) {
											console.log("Error Occurs");
											res.send(JSON.stringify({ res: "error" }));
											res.status(200).send();
										} else {
											console.log("Email sent successfully");
											res.send(JSON.stringify({ res: "success" }));
											res.status(200).send();
											return false;
										}
									});
								});
								/////////////////////////////////////
								return false;
							});
					});
			}
			getDBData();

			//  End Daily Crontab
			return null;
		});
	} catch (error) {
		console.log(error);
	}
});
