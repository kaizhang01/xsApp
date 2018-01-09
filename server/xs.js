const fs = require('fs');
const assert = require('assert');

exports.reqFile = function (reqPath) {
	if (reqPath.indexOf('.') == -1)
		return false;
	return true;
}

exports.getBody = function (req, FUN) {
	let { method } = req;
	console.log(`receive ${method} body`);
	if (method == "POST" || method == "PUT") {
		let body = '';
		req.on('data', function (data) {
			body += data;
			console.log("Partial body: " + body);
		});
		req.on('end', function () {
			console.log("Body: " + body);
			assert(body != "", "post body is empty");
			FUN(JSON.parse(body));
		});
	}
	if (method == "GET") {
		let body = req.parsedUrl.query.data;
		console.log("Body: " + body);
		assert(body != "", "post body is empty");
		FUN(JSON.parse(body));
	}

};
exports.addFonts = function (fontsArr) {
	if (fontsArr == undefined)
		return "";
	let allFonts = '';
	for (let i = 0; i < fontsArr.length; i++) {
		const font = fontsArr[i];
		if (i > 0)
			allFonts += '\n\t';
		allFonts += `<link href="${font}" rel="stylesheet">`;

	}
	return allFonts;
};
exports.addLibs = function (libArr) {
	if (libArr == undefined)
		return "";
	let allLib = "";
	for (let i = 0; i < libArr.length; i++) {
		const jslib = libArr[i];
		if (i > 0)
			allLib += '\n\t';
		allLib += `<script type="text/javascript" src="${jslib}"></script>`;

	}
	return allLib;
};
exports.addTitle = function (title) {
	if (title == undefined)
		return "";
	return `<title>${title}</title>`;
};
exports.addView = function (viewFile) {
	let view = `<script type="text/javascript" src="${viewFile}"></script>`;
	view += '\n\t';
	return view;
}
exports.addViews = function (viewFilesArr) {
	assert(viewFilesArr != undefined, 'no view defined!');
	let allView = "";
	for (let i = 0; i < viewFilesArr.length; i++) {
		const viewFile = viewFilesArr[i];
		allView += `<script type="text/javascript" src="${viewFile}"></script>`;
		allView += '\n\t';
	}
	return allView;
};
exports.addData = function (serverData) {
	if (serverData == undefined)
		return "";
	let str = `<script>`;
	str += `let viewName= ${JSON.stringify(serverData.view)};\n`;
	str += `let serverData= ${JSON.stringify(serverData.data)};`;
	str += `</script>`;
	return str;
};

exports.addViewCss = function (viewFileName) {
	let cssName = viewFileName.slice(0, viewFileName.indexOf('.js')) + '.css';
	// let searchName=cssName.slice(cssName.lastIndexOf('/'));
	if (!fs.existsSync(`.${cssName}`)) {
		return '';
	}
	return `<link rel="stylesheet" type="text/css" href="${cssName}">\n\t`;
};
exports.addCSSs = function (styleFileArr) {
	if (styleFileArr == undefined || styleFileArr.length == 0)
		return `<link rel="stylesheet" type="text/css" href="/client/style.css">`;
	let allStyle = "";
	for (let i = 0; i < styleFileArr.length; i++) {
		const styleFile = styleFileArr[i];
		allStyle += `<link rel="stylesheet" type="text/css" href="${styleFile}">`;
		allStyle += '\n\t';
	}
	return allStyle;
};

