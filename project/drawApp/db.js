
var mongoose = require('mongoose');
var gallerySchema = new mongoose.Schema({
	name: String,
	img: String
});
exports.Gallery = mongoose.model("Gallery", gallerySchema,"gallery");