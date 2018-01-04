//promise
let promise =new Promise(function (ok,fail){
	ok({xxx:1,yyy:2});
	// fail(2);
});
promise.then(data=>{
	console.log(data);
});
//3.0 successful start
const MongoClient = require('mongodb').MongoClient;


const url = "mongodb://relaxslow:xs197841@ds163836.mlab.com:63836/relaxslowdb";
const dbName=url.slice(lastIndexOf('/'));
MongoClient.connect(url, function (err, client) {
	if (err) throw err;
	let db=client.db(dbName);
	var myobj = { name: "Company Inc", address: "Highway 37" };
	db.collection("customers").insertOne(myobj, function (err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		client.close();
	});
});

//use generator-------------------
let client;
let db;
let todo = todoList();
todo.next();
// connectDb(url, dbName),
// 	insert("gallery", { name: "Company Inc", address: "Highway 37" })

function* todoList() {
	yield connectDb(url, dbName);
	yield insert("gallery", { name: "Company Inc", address: "Highway 37" });
	client.close();
	return;

}

function connectDb(url, dbName) {
	MongoClient.connect(url, function (err, c) {
		if (err) fail(err);
		client = c;
		db = client.db(dbName);
		todo.next();
	});

}
function insert(collectionName, obj) {
	db.collection(collectionName).insertOne(obj, function (err, res) {
		if (err) fail(err);
		console.log("1 document inserted");
		todo.next();
	});

}
//promise
connectDb({
	url: url,
	dbName: dbName
}).then(result => {
	return insert({
		collection: "customers",
		data: { name: "Company Inc", address: "Highway 37" }
	});
}).then(result => {
	client.close();
}).catch(err => {
	console.log(err);
});


function connectDb(obj) {
	let { url, dbName } = obj;
	return new Promise((success, fail) => {
		MongoClient.connect(url, function (err, c) {
			if (err) fail(err);
			client = c;
			db = client.db(dbName);
			success(1);
		});
	});
}



function insert(obj) {
	let { collection, data } = obj;
	return new Promise(function (success, fail) {
		db.collection(collection).insertOne(data, function (err, res) {
			if (err) fail(err);
			console.log("1 document inserted");
			success(1);
		});
	});
}


//exports mode
const dburl = "mongodb://relaxslow:xs197841@ds163836.mlab.com:63836/relaxslowdb";
const dbName = dburl.slice(dburl.lastIndexOf('/') + 1);
db.connectDb(dburl,dbName).then(result=>{
	return db.insert("gallery",{name:"xxxxerererer"});
}).then(result=>{
	db.closeClient();
});


//exports can return------------------------------
exports.connectDb= function (url,Fun) {
	let gen=(function* (){
		let db;
		yield MongoClient.connect(url, function (err, c) {
			if(err) throw err;
			let dbName = url.slice(url.lastIndexOf('/') + 1);
			client = c;
			db = client.db(dbName);
			gen.next();
		});
		return db;
	})();
	return gen.next();
};