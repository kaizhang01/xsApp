const config = require('./config.js');

exports.init=function (){
    let customDB = require(config.cfg.db);
    customDB.connectDb(process.env.MONGODB_URI||config.cfg.dbName);
}