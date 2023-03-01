exports.userInfo = function (request, response) {
	// TO DO
	// текущий	таймер токена. (на стороне клиента)
	// запрос в базу, цепочка инвайтов от юзера ()
	// вся цепочка для админа
	response.send("login");
}

exports.text = function(request, response) {
	response.send("text");
}

