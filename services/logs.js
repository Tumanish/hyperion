const fs = require('fs')

exports.logsAPI = function (request, response, next) {
	let now = new Date();
	let hour = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
	fs.appendFile("server.log", data + "\n", () => { });
	next();
}