
const http = require('http');
const URLlib = require('url');
const router = require('./router.js');
const file = require('./file.js');
const xs = require('./xs.js');
const config = require('./config.js');


exports.startServer = () => {

	var server = http.createServer(function (req, res) {
		const { headers, method, url } = req;
		console.log(`${headers} ${method} ${url}`);

		const parsedUrl = URLlib.parse(url, true);
		req.parsedPath = parsedUrl.pathname;
		req.parsedUrl=parsedUrl;

		if (xs.reqFile(req.parsedPath))
			file.handle(req, res);
		else
			router.handle(req, res);

	});
	const port = process.env.PORT || 1337;
	server.listen(port);
	console.log(`Server running at  ${port}`);
	server.on("close", function () {
		console.log("server stop");
		config.clean();
	});
	

	// server.close();

};


