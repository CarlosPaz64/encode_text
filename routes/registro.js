const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para mostrar el formulario de registro (GET)
router.get('/', userController.mostrarFormularioRegistro);

// Ruta para manejar la solicitud de registro (POST)
router.post('/', userController.registrarUsuario);

module.exports = router;
