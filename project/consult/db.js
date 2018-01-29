
var mongoose = require('mongoose');
const config = require('../../server/config.js');

exports.connectDb=function(url) {
    mongoose.connect(url, { useMongoClient: true });
    console.log("Connected successfully to database");
    var UISchema = new mongoose.Schema({
        USA: String,
        CHN: String
    });
    exports.UI = mongoose.model("UI", UISchema, "ui");

    var ContentSchema= new mongoose.Schema({
        contentName:String,
        USA:String,
        CHN:String
    });
    exports.Content=mongoose.model("Content",ContentSchema,"content");

};




