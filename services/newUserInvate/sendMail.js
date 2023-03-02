//TO DO SendEmail(email,text);
// SendLink(email)
// 
const nodemailer = require('nodemailer')
const keys = require('../../configuration/keys')
// const { convert } = require('html-to-text'); // TO DO Удалить модуль

exports.sendMail = async function (email,link) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: keys.glogin,
			pass: keys.gps,
		},
	})
// <a href="https://ya.ru/">CodeCave.ru</a>
	link = 'https://ya.ru/';
	//TO DO простая валидация email
	let result = await transporter.sendMail({
		from: '"M!%H"',
		to: email,
		subject: 'Invite',
		text: 'Welcome',
		html:`<a href="${link}">CodeCave.ru</a>`,
	})

	//to: 'user@example.com, user@example.com', 
	console.log(result)
}

/*

───▐▀▄──────▄▀▌───▄▄▄▄▄▄▄
───▌▒▒▀▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄
──▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄
──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄
▀█▒▒█▌▒▒█▒▒▐█▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌
▀▌▒▒▒▒▒▀▒▀▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐ ▄▄
▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄█▒█
▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀
──▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌
────▀▄▄▀▀▀▀▄▄▀▀▀▀▀▀▄▄▀▀▀▀▀▀▄▄▀

*/