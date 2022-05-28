const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @rota    POST api/users
// @desc    Registra Usuário
// @acesso  Public
router.post(
	'/',
	// Regras de validação dos campos preenchidos
	[
		check('name', 'Nome é obrigatório')
			.not()
			.isEmpty(),
		check('email', 'Preencha um email válido').isEmail(),
		check(
			'password',
			'Uma senha com mais de 6 digitos é necessária'
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		// Função para retornar o erro de validação
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Requere os dados do formulário recebido 
		const { name, email, password } = req.body;

		try {
			// Verifica se email já está registrado
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'Email já utilizado' });
			}

			user = new User({
				name,
				email,
				password
			});

			// Criptografa a senha do usuário
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			// Envia o usuário para o banco de dados
			await user.save();


			// Cria um JWT e devolve para o client ser logado após seu registro
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				// Segredo do JWT utilizado, 
				config.get('jwtSecret'),
				{ expiresIn: 400000 },
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
