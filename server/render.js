const config = require('./config.js');

const xs = require('./xs.js');
exports.html = function (res, paramObj) {
	let { data, view } = paramObj;
	res.setHeader('Content-type', "text/html;charset=utf8");
	var html = `<!DOCTYPE html>
<html>
<head>
${xs.addTitle(config.cfg.title)}
${xs.addLibs(config.cfg.libs)}
${xs.addFonts(config.cfg.fonts)}
${xs.addCSSs(config.cfg.CSSs)}
${xs.addViewCss(view)}
</head>
<body>
${xs.addData(paramObj)}
${xs.addView(view)}
</body>
</html>`;
	res.write(html);
	res.end();
};

