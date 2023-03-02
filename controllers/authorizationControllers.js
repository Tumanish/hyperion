const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const tokenDecodeModule = require('../services/tokenDecode')

const keys = require('../configuration/keys')
const User = require('../models/User')

exports.login = async function (request, response) {
	console.log(request.body)
	const candidate = await User.findOne({ email: request.body.email })
	if (candidate) {
		const passwordResult = bcrypt.compareSync(request.body.password, candidate.password)
		if (passwordResult) {
			const token = jsonwebtoken.sign({
				email: candidate.email,
				userId: candidate._id
			}, keys.jwt, { expiresIn: 60 * 60 })
			response.status(200).json({ token: `Bearer ${token}` })
		} else {
			response.status(401).json({ message: "invalid password, try again" })
		}
	} else {
		response.status(404).json({ message: "Invalid User / password, try again" })
	}
}

exports.register = async function (request, response) {
	//TO DO регистрация по инвайту 

	const tokenObj = tokenDecodeModule.tokenDecode(request.headers.authorization);
	const candidate = await User.findOne({ email: request.body.email })

	if (candidate) {
		response.status(409).json({ message: 'error invalid email, try another one' })
	} else {
		const salt = bcrypt.genSaltSync(10)
		const password = request.body.password
		const user = new User({
			email: request.body.email,
			password: bcrypt.hashSync(password, salt)
		})
		try {
			await user.save()
			console.log("new User:", request.body.email, "Registered by:", tokenObj.email);
			response.status(201).json({
				message: "created new user",
				user: user.email
			})
		} catch (error) {
			console.log(error, "Ошибка сохранения в базу");
			// errorHandler(response, error)
		}
	}
}

exports.change = function (request, response) {
	response.send("change");
}

// TO DO проверка ключей смена роли удален, забанен
exports.delete = function (request, response) {
	response.send("delete");
}

exports.test = function (request, response) {
	response.status(200).json({ "message": "test" });
}