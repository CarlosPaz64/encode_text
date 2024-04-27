const express = require('express');
const router = express.Router();
const cifrarController = require('../controllers/cifrarController');
const userController = require('../controllers/userController');
const loginRouter = require('../routes/login');

// Ruta para mostrar el formulario de registro (GET)
router.get('/registro', userController.mostrarFormularioRegistro);

// Ruta para manejar la solicitud de registro (POST)
router.post('/registro', userController.registrarUsuario);

// Ruta para cifrar texto (POST)
router.post('/cifrar', cifrarController.cifrarTexto);

// Rutas relacionadas con el inicio de sesión
router.use('/login', loginRouter);

module.exports = router;
