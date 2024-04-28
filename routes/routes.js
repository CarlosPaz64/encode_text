const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginRouter = require('./login');
const cifrarRouter = require('./cifrar');

// Ruta para mostrar el formulario de registro (GET)
router.get('/registro', userController.mostrarFormularioRegistro);

// Ruta para manejar la solicitud de registro (POST)
router.post('/registro', userController.registrarUsuario);

// Rutas relacionadas con el inicio de sesión
router.use('/login', loginRouter);

// Rutas relacionadas con el cifrado
router.use('/cifrar', cifrarRouter);

module.exports = router;
