const jwt_decode = require('jwt-decode');

function tokenDecodeToObj(TokenString) {
	let token = null;
	let tokenObj = false;
	if (TokenString.slice(0, 7) == "Bearer ") {
		token = TokenString.slice(7);
		tokenObj = jwt_decode(token);
	} else
		if (TokenString) {
			tokenObj = jwt_decode(TokenString)
		}
	return tokenObj;
}

function tokenTimeFromObj(tokenObj) {
	const tokenTimeExp = tokenObj.exp - Math.floor(Date.now() / 1000);
	// console.log(tokenObj.email, "Tokentime: ", tokenTimeExp, "sec");
	if (tokenTimeExp > 0) {
		return tokenTimeExp;
	} else {
		return false;
	}
}




exports.tokenDecode = (TokenString) => tokenDecodeToObj(TokenString);

exports.getTokenTimeLeftFromString = (TokenString) => {
	tokenObj = tokenDecodeToObj(TokenString)
	return tokenTimeFromObj(tokenObj);
}

exports.getTokenTimeLeftFromObj = (tokenObj) => {
	return tokenTimeFromObj(tokenObj);
}