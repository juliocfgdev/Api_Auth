const mongoose = require('mongoose');

// Cria o modelo para o usuário utilizando a biblioteca mongoose
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// Exporta o modelo
module.exports = mongoose.model('user', UserSchema);
