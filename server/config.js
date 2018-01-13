const app = require('./app.js');
const fs = require('fs');
const assert = require('assert');

exports.read = function (files) {
	exports.cfg={};
	let counter = files.length;
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		fs.readFile(file, 'utf8', mergeData);
	}

	function mergeData(err, data) {
		assert(err==null,err);
		Object.assign(exports.cfg, JSON.parse(data));
		counter--;
		if (counter === 0)
			app.task.next();
	}


};
exports.clean = function clean() {
	exports.cfg = null;
};

