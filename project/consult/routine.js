
const fs = require("fs");
const xs = require('../../server/xs.js');
const router = require('../../server/router.js');
const render = require('../../server/render.js');
const assert = require('assert');
const db = require("./db.js");
const config = require('../../server/config.js');
db.connectDb(config.cfg.dbName);


// map: {
// "index": router.nodef,
// "new": router.nodef,
// "create": router.nodef,
// "show": router.nodef,
// "edit": router.nodef,
// "update": router.nodef,
// "destroy": router.nodef,
// }
let main = function (req, res) {
	render.html(res, {
		view: "/project/consult/views/welcome.js",

	});
};

// let translate = function (req, res) {
// 	console.log("translate" + res.b_Id);
// };

let changeLanguage = function (req, res) {
	console.log("changeLanguage" + res.b_Id);

	fs.writeFile('./project/consult/language.json', JSON.stringify({ language: res.b_Id }), (err) => {
		if (err) throw err;
		console.log('language setting has been saved!');
		config.cfg.language = res.b_Id;
		res.end(res.b_Id);
	});
};


function getUIText(req, res) {
	console.log("getUIText--" + res.b_Id);
	db.UI.findOne({ "USA": res.b_Id }, function (err, text) {
		assert(err == null, err);
		// console.log(text.CHN) ;
		if (text == null)
			res.end("no define in db(ui)");
		else
			res.end(text[config.cfg.language]);
	});

}
exports.subRoutine = {
	"": main,
	"changeLanguage": changeLanguage,
	"getUIText": getUIText
};

