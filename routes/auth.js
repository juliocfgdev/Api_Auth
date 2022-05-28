const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @rota   GET api/auth
// @desc   Identifica usuário logado
// @accesso Privado
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Erro no servidor');
	}
});

// @rota    POST api/auth
// @desc    Autentica usuário e retorna um JWT
// @accesso Public
router.post(
	'/',
	// Regras de validação dos formulários
	[
		check('email', 'Insira um email válido').isEmail(),
		check('password', 'Senha é necessário').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		// Função para retornar o erro de validação
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			// Verifica se o usuário está registrado
			if (!user) {
				return res.status(400).json({ msg: 'Usuário não encontrado' });
			}

			// Verifica se a senha é válida para o usuário 	
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Usuário não encontrado' });
			}


			// Cria um JWT e devolve para o client ser logado na aplicação
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Erro no servidor');
		}
	}
);

module.exports = router;
