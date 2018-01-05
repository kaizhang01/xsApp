const path = require('path');
const fs=require('fs');
const config =require('./config.js');
exports.returnFile=(res,pathname, data)=> {
	const mimeType = {
		'.ico': 'image/x-icon',
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.css': 'text/css',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.wav': 'audio/wav',
		'.mp3': 'audio/mpeg',
		'.svg': 'image/svg+xml',
		'.pdf': 'application/pdf',
		'.doc': 'application/msword',
		'.eot': 'appliaction/vnd.ms-fontobject',
		'.ttf': 'aplication/font-sfnt'
	};
	const ext = path.parse(pathname).ext;
	res.setHeader('Content-type', mimeType[ext] || 'text/plain');
	res.end(data);
};

exports. handle=(req,res)=> {
	let fileFullPath;
	if(req.parsedPath=="/favicon.ico")
	{
		fileFullPath=`.${config.cfg.projectPath}${req.parsedPath}`;
	}
	else{
		fileFullPath=`.${req.parsedPath}`;
	} 
	
	if (!fs.existsSync(fileFullPath)) {
		res.statusCode = 404;
		res.end(`Error: File ${fileFullPath} not found!`);
		return;
	}
	fs.readFile(fileFullPath, function (err, data) {
		if (err) {
			res.statusCode = 500;
			res.end(`Error: can't read the file: ${err}.`);
		} else {
			exports.returnFile(res,fileFullPath, data);
		}


	});

};
