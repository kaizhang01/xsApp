
var mongoose = require('mongoose');
exports.connectDb = function (url) {
	mongoose.connect(url, { useMongoClient: true });
	console.log("Connected successfully to database");
	var UISchema = new mongoose.Schema({
		USA: String,
		CHN: String
	});
	exports.UI = mongoose.model("UI", UISchema, "ui");

	
};




