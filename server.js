// Requisita o Express
const express = require('express');

// 
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Inicia o Middleware
app.use(express.json({ extended: false }));

// Define rotas de acesso para a Api
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado na porta: ${PORT}`));
