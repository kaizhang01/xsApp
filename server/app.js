// const apptest=require('./apptest.js');
const config = require("./config.js");
const server = require("./server.js");
const router = require("./router.js");
const db = require("./db.js");
function* Tasks() {

    yield config.read([
        "./project/consult/configServer.json",
        "./project/consult/configClient.json",
        "./project/consult/configLanguage.json",
        "./project/consult/mainMenu.json"
    ]);

    db.init();
    router.init();
    //open local mongo fist when test locally

    server.startServer();
}
exports.task = Tasks();
exports.task.next();




