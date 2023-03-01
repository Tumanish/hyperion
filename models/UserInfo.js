const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInfoShema = new Schema({
	name:{
		type: String
	},
	login:{
		type: String
	},
	passwordHash:{
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
	invaite:{
		type: [String],
		default: undefined
	  }
})

module.exports = mongoose.model('usersInfo', userInfoShema)

//Поменять