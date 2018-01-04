


const gallery = require('./subRouting/gallery.js');
let routePath;
routePath = "/";
// routePath="/gallery";
// routePath = "/gallery/";
// routePath = "/gallery/New";
// routePath = "/gallery/New/";
// routePath="/gallery/:123456";
// routePath="/gallery/:123456/";
// routePath = "/gallery/:123456/edit";
// routePath = "/gallery/:123456/edit/";


let method;
method = "GET";
// method="POST";
// method="PUT";
// method="DELETE";

let map = {
	//every level must begin with a ""
	"":
		{
			"GET": "mainPage"
		},
	"b":
		{
			"":
				{
					"GET": "listAll",
					"POST": "createNew"
				},
			"New":
				{
					"":
						{
							"GET": "showNewForm"
						}
				},
			":":
				{
					"":
						{
							"GET": "showOneInfo",
							"PUT": "updateOne",
							"DELETE": "deleteOne"
						},
					"edit":
						{
							"":
								{
									"GET": "editOne"
								}
						},

				}
		}
};

// let routeMap = {
// 	"": mainPage,
// 	"gallery": gallery.router,
// };


route({ parsedPath: routePath, method: method, res: {} });
function route(param) {
	let { parsedPath, method, req, res } = param;
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
	}
	res.routeArr = routeArr;

	let route = map[res.routeArr[1]];
	for (let i = 2; i < res.routeArr.length; i++) {
		const str = res.routeArr[i];
		route = route[str];
	}
	res.b_route = route;
	console.log(res.b_name, res.b_route);

	let mainPage = {
		handler: function (req, res) {
			console.log("mainPage");
		}
	};
	let subRoutine = {
		"": mainPage,
		"gallery": gallery,

	};

	subRoutine[res.b_name].handler(req, res);


}




// function ListAll() {

// 	console.log("listall");
// }
// function createNew() {
// 	console.log("createNew");
// }
// function showNewForm() {
// 	console.log("showNewForm");
// }
// function showOneInfo() {
// 	console.log("showOneInfo");
// }
// function updateOne() {
// 	console.log("updateOne");
// }
// function deleteOne() {
// 	console.log("deleteOne");
// }
// function editOne() {
// 	console.log("editOne");
// }