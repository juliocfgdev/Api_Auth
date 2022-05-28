const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware para intermediar as resquests e responses em rotas privadas
module.exports = function (req, res, next) {

	// Pega o JWT no header
	const token = req.header('x-auth-token');

	// Valida se o JWT existe
	if (!token) {
		return res.status(401).json({ msg: 'Token não foi localizado, autorização negada' });
	}

	// Verifica se o JWT é valido e recebe o usuário
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token não é válido' });
	}
};
