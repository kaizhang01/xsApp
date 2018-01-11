
var mongoose = require('mongoose');
var UISchema = new mongoose.Schema({
	USA: String,
	CHN: String
});
exports.UI = mongoose.model("UI", UISchema,"UI");