// const apptest=require('./apptest.js');
const config = require("./config.js");
const server = require("./server.js");
const router = require("./router.js");
function* Tasks() {

	yield config.read([
		"./project/consult/config.json",
		"./project/consult/language.json"
    ]);
    
    
	router.init();
	//open local mongo fist when test locally

	server.startServer();
}
exports.task = Tasks();
exports.task.next();




