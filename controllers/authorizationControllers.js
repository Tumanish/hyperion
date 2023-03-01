const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const keys = require('../configuration/keys')
const User = require('../models/User')

// Универсальный обработчик ошиборк... типа errorHandler...

// TO DO Сохранить логи, таймера(проверка/отзыв токена)... 
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

	// TO DO // идентификатор	// имя пользователя	// роль	// время генерации токена и т.д.	// дата регистрации	// инвайты и т. д. в юзер инфо.
}

exports.register = async function (request, response) {
	//////// Свободная регистрация  TO DO регистрация инвайт токен id роль
	console.log(request.body);
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
			response.status(201).json({
				message: "created new user",
				user: user
			})
		} catch (error) {
			console.log(error);
			console.log("Ошибка сохранения в базу");
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
	response.status(200).json({"message":"test"});
}