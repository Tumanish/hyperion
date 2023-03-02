const nodemailer = require('nodemailer')
const keys = require('../../configuration/keys')
// const { convert } = require('html-to-text'); // TO DO Удалить модуль

exports.sendMail = async function (email, link, html) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: keys.glogin,
			pass: keys.gps,
		},
	})


	//TO DO простая валидация email
	let result = await transporter.sendMail({
		from: '"Node JS"',
		to: email,
		subject: 'Invite',
		text: 'Welcome',
		html: link,
	})

	//to: 'user@example.com, user@example.com', 
	console.log(result)
}