const config = require("./config.js");
const app = require('./app.js');
const render = require('./render.js');
const assert = require('assert');

let routine;
exports.init = function (routeFile) {
	routine = require(routeFile);
};

exports.handle = function (req, res) {

	let { parsedPath, method } = req;

	let routeArr = parsedPath.split("/");
	if (routeArr[routeArr.length - 1] != "")
		routeArr.push("");

	routeArr.push(method);

	//record name
	res.b_name = routeArr[1];
	if (routeArr[1] !== "") {
		routeArr[1] = "b";
	}

	//record id
	if (routeArr.length > 2) {
		let index = routeArr[2].indexOf(":");
		if (index != -1) {
			res.b_Id = routeArr[2].slice(index + 1);
			routeArr[2] = ":";

		}
		res.b_adj = routeArr[3];
	}

	res.routeArr = routeArr;
	let subRoutine = routine.subRoutine;





	if (req.headers["x-requested-with"] == "XMLHttpRequest") {
		
		if (req.headers.type === "restful") {
			if (subRoutine[res.b_name] == undefined) {
				res.undef = "subRoutine--" + res.b_name;
				routineUndefined(req, res);
				return;
			}
			if (subRoutine[res.b_name].map == undefined) {
				res.undef = "subRoutine--" + res.b_name + "--map";
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
			let route = map[res.routeArr[1]];
			for (let i = 2; i < res.routeArr.length; i++) {
				const str = res.routeArr[i];
				route = route[str];
				if (route == undefined) {
					res.undef = "map--" + res.b_name + "--" + str;
					routineUndefined(req, res);
					return;
				}
			}
			res.b_route = route;
			if (subRoutine[res.b_name].map[res.b_route] == undefined) {
				res.undef = "subRoutine--" + res.b_name + "--map--" + res.b_route;
				routineUndefined(req, res);
				return;
			}
			console.log(`routine:${res.b_name}--${res.b_route} defined`);

			subRoutine[res.b_name].map[res.b_route](req, res);
			return;
		}
		// if (req.headers.type === "checked--return") {
		// 	exports.redirect(res, req.parsedPath);
		// 	return;
		// }
	}
	subRoutine[res.b_name](req, res);



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
