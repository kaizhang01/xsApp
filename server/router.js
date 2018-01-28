const config = require("./config.js");
const app = require('./app.js');
const render = require('./render.js');
const assert = require('assert');
const fs = require('fs');

let routine;
let db;
exports.init = function () {
    routine = require(config.cfg.routine);
    db = require(config.cfg.db);
    db.connectDb(config.cfg.dbName);
};

exports.handle = function (req, res) {
    // console.log(process.memoryUsage());
    let { parsedPath, method } = req;

    let routeArr = parsedPath.split("/");
    if (routeArr[routeArr.length - 1] != "")
        routeArr.push("");

    routeArr.push(method);

    //record name
    req.b_name = routeArr[1];
    if (routeArr[1] !== "") {
        routeArr[1] = "b";
    }

    //record id
    if (routeArr.length > 2) {
        let index = routeArr[2].indexOf(":");
        if (index != -1) {
            req.b_Id = routeArr[2].slice(index + 1);
            routeArr[2] = ":";

        }
        // req.b_adj = routeArr[3];
    }

    req.routeArr = routeArr;
    let subRoutine = routine.subRoutine;
    if (isSystemRoute(req.b_name))
        return;

    function isSystemRoute(branchName) {
        let globalRoute = {
            "changeLanguage": function (req, res) {
                console.log("changeLanguage" + req.b_Id);

                fs.writeFile('./project/consult/language.json', JSON.stringify({ language: req.b_Id }), (err) => {
                    if (err) throw err;
                    console.log('language setting has been saved!');
                    config.cfg.language = req.b_Id;
                    res.end(req.b_Id);
                });
            },
            "getUIText": function (req, res) {
                // console.log("getUIText--" + res.b_Id);
                let txt = decodeURI(req.b_Id);
                db.UI.findOne({ "USA": txt }, function (err, text) {
                    assert(err == null, err);
                    // console.log(text.CHN) ;
                    let encoded;
                    if (text == null) {
                        encoded = encodeURI(txt);
                    }
                    else {
                        encoded = encodeURI(text[config.cfg.language]);
                    }
                    res.end(encoded);//"no define in db(ui)"
                });

            },
            "getContentText":function(req,res){
                let txt=decodeURI(req.b_Id);
                db.Content.findOne({"contentName":txt},function(err,text){
                    assert(err==null,err);
                    if(text==null)
                    {
                        let send=Buffer.from(`${req.b_Id} no define in db`).toString('base64');
                        res.end(send);
                    }else{
                        res.end(text[config.cfg.language]);
                    }
                });
            },
            "fileExist": function (req, res) {
                let filepath = req.parsedPath.slice(req.parsedPath.indexOf("fileExist") + "fileExist".length, req.parsedPath.lastIndexOf("/"));
                let filetype = req.parsedPath.slice(req.parsedPath.lastIndexOf("/") + 1);
                let fileFullName = `.${filepath}.${filetype}`;
                if (fs.existsSync(fileFullName)) {
                    res.end("yes");
                }
                else {
                    res.end("no");
                }
            }
        };
        if (globalRoute[branchName] != undefined) {
            globalRoute[branchName](req, res);
            return true;
        }
        return false;
    }


    if (req.headers["x-requested-with"] == "XMLHttpRequest") {

        if (req.headers.type === "restful") {
            if (subRoutine[req.b_name] == undefined) {
                res.undef = "subRoutine--" + req.b_name;
                routineUndefined(req, res);
                return;
            }
            if (subRoutine[req.b_name].map == undefined) {
                res.undef = "subRoutine--" + req.b_name + "--map";
                routineUndefined(req, res);
                return;
            }
            //restful pattern
            const map = {
                //every level must begin with a ""
                "":
                    {
                        "GET": "mainPage"
                    },
                "b":
                    {
                        "":
                            {
                                "GET": "index",
                                "POST": "create",

                            },
                        "New":
                            {
                                "":
                                    {
                                        "GET": "new"
                                    }
                            },
                        ":":
                            {
                                "":
                                    {
                                        "GET": "show",
                                        "PUT": "update",
                                        "DELETE": "destroy",
                                    },
                                "edit":
                                    {
                                        "":
                                            {
                                                "GET": "edit",
                                            }
                                    },

                            },




                    }
            };
            //check define
            let route = map[req.routeArr[1]];
            for (let i = 2; i < req.routeArr.length; i++) {
                const str = req.routeArr[i];
                route = route[str];
                if (route == undefined) {
                    res.undef = "map--" + req.b_name + "--" + str;
                    routineUndefined(req, res);
                    return;
                }
            }
            req.b_route = route;
            if (subRoutine[req.b_name].map[req.b_route] == undefined) {
                res.undef = "subRoutine--" + req.b_name + "--map--" + req.b_route;
                routineUndefined(req, res);
                return;
            }
            console.log(`routine:${req.b_name}--${req.b_route} defined`);

            subRoutine[req.b_name].map[req.b_route](req, res);
            return;
        }
        // if (req.headers.type === "checked--return") {
        // 	exports.redirect(res, req.parsedPath);
        // 	return;
        // }
    }
    if (subRoutine[req.b_name] == undefined) {
        res.end(req.b_Name + "undefined");
    } else {
        subRoutine[req.b_name](req, res);

    }



    // subRoutine[res.b_name].handler(req, res);

};


exports.changeRoute = function (res, url) {//serverside
    res.writeHead(302, {
        Location: url,
    });
    res.end();

};

exports.redirect = function (res, url) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("RedirectUrl", url);
    res.end();
}

function routineUndefined(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end(` ${res.undef} not define`);
}


function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
}
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}