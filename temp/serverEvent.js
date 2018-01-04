server.on("connection", function(socket) {
	socket.setEncoding('UTF-8');
	console.log("socket connected", socket.remotePort);
	socket.on("data", function() {
		console.log("socket data");
	});
	socket.on("end", function() {
		console.log("socket closed");
	});
	socket.setTimeout(30000, function(){
	  socket.end();
	});
	setInterval(function() {
		console.log("socket destroyed: ", socket.destroyed);
	}, 500);
});