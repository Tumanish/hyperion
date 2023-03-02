const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users') // вариант подключенияя модели

const tokenDecodeModule = require('../services/tokenDecode')
const keys = require('../configuration/keys')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwt
}

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				const user = await User.findById(payload.userId).select('email id')
				const tokenTimeExp = tokenDecodeModule.getTokenTimeLeftFromObj(payload)
				console.log("clg from passport User",payload.email,"token time",tokenTimeExp);
				if (user && (tokenTimeExp)) {
					done(null, user)
				} else {
					done(null, false)
				}
			} catch (err) {
				console.log("passport service error");
			}
		})
	)
}