
const xs = require('../../server/xs.js');
const router = require('../../server/router.js');
const render = require('../../server/render.js');
const assert = require('assert');

// map: {
// 	"index": router.nodef,
// 	"new": router.nodef,
// 	"create": router.nodef,
// 	"show": router.nodef,
// 	"edit": editArt,
// 	"update": router.nodef,
// 	"destroy": router.nodef,
// },
let main = {
	map: {
		"index": router.nodef,
		"new": router.nodef,
		"create": router.nodef,
		"show": router.nodef,
		"edit": router.nodef,
		"update": router.nodef,
		"destroy": router.nodef,
	},
	handler: function (req, res) {
		render.html(res, {
			view: "./project/consult/views/welcome.js",
		});
	}
};

exports.subRoutine = {
	"": main,
};