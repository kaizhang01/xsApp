// const apptest=require('./apptest.js');
const config = require("./config.js");
const server = require("./server.js");
const db = require("./db.js");
const router = require("./router.js");

function* Tasks() {

	yield config.read([
		"./project/drawApp/config.json"
	]);
	router.init(config.cfg.routine);
	//open local mongo fist when test locally
	// db.connectDb('mongodb://relaxslow:xs197841@ds163836.mlab.com:63836/relaxslowdb');
	db.connectDb(config.cfg.dbName);
	server.startServer();
}
exports.task = Tasks();
exports.task.next();




