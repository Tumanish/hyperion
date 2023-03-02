


exports.userInfo = (request, response) => {
	console.log(request.body);


	response.send("login");
}

exports.text = function (request, response) {
	response.send("text");
}

