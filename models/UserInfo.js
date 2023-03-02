const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInfoShema = new Schema({
	id:{
		type: String
	},
	name:{
		type: String
	},
	login:{
		type: String
	},
	email:{
		type: String
	},
	status:{
		type: String
	},
	ipAdress:{
		type: String
	},
	about:{
		type: String
	},
	wasInvited:{
		type: String
	},
	invaiteList:{
		type: [String],
		default: undefined
	  }
})

module.exports = mongoose.model('usersInfo', userInfoShema)

// TO DO // идентификатор	// имя пользователя	// роль	// выданные токены время генерации токена и т.д.	// дата регистрации	// инвайты и т. д. в юзер инфо.