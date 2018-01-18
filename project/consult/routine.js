
const fs = require("fs");
const xs = require('../../server/xs.js');
const router = require('../../server/router.js');
const render = require('../../server/render.js');
const assert = require('assert');
const db = require("./db.js");
// const config = require('../../server/config.js');



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


function displayTodoList(req, res) {
    fs.readFile("./project/consult/todo", function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.end(`Error: can't read the file: ${err}.`);
        } else {
            res.end(data);
        }
    });
}
exports.subRoutine = {
    "": main,
 
    "todo": displayTodoList,

    "Introduce": function (req, res) {
        render.html(res,{
            view:"/project/consult/views/introduce.js",
        });
    },
    "News": function (req, res) {
        res.end("news!!");
    },
    "JoinUs": function (req, res) {
        res.end("joinus!!");
    }


};

