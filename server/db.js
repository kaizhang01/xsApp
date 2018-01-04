
var mongoose = require('mongoose');
exports.connectDb = function (url) {
	mongoose.connect(url, { useMongoClient: true });
};





//-----------------------------------------------
// const MongoClient = require('mongodb').MongoClient;

// let client = null;
// exports.db = null;

// exports.connectDb = function (url) {
// 	MongoClient.connect(url, function (err, c) {
// 		if (err) throw err;
// 		let dbName = url.slice(url.lastIndexOf('/') + 1);
// 		client = c;
// 		exports.db = client.db(dbName);
// 		app.task.next();
// 	});
// };

// exports.collection=function(collectionName)
// {
// 	return exports.db.collection("collectionName");
// };
// exports.clean = () => {
// 	client.close();
// 	exports.db = null;
// 	client = null;
// };



//--------------------------------------------------------
// MongoClient.connect(url, function (err, client) {
// 	if (err) throw err;
// 	let db = client.db(dbName);
// 	var myobj = { name: "Company Inc", address: "Highway 37" };
// 	db.collection("customers").insertOne(myobj, function (err, res) {
// 		if (err) throw err;
// 		console.log("1 document inserted");
// 		client.close();
// 	});
// });


//-----------------------------------------------------


// let client;
// let db;
// MongoClient.connect(url, function (err, c) {
// 	if (err) throw err;
// 	client=c;
// 	db = client.db(dbName);

// 	var myobj = { name: "Company Inc", address: "Highway 37" };
// 	connectSuccess();
// });
// function connectSuccess(){
// 	insert("gallery",{name:"caokuiling"});
// }
// function  insert(collectionName,obj){

// 	db.collection(collectionName).insertOne(obj, function (err, res) {
// 		if (err) throw err;
// 		console.log("1 document inserted");

// 	});
// }

//----------------------------------------------------
