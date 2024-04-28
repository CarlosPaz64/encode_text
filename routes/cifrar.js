// cifrar.js

const express = require('express');
const router = express.Router();
const cifrarController = require('../controllers/cifrarController');

// Ruta para mostrar el formulario de cifrado (GET)
router.get('/', (req, res) => {
    res.render('cifrar'); // Renderiza el formulario de cifrado
});

// Ruta para cifrar texto (POST)
router.post('/', (req, res) => {
    console.log('Datos recibidos en /cifrar:', req.body);
    cifrarController.cifrarTexto(req, res);
});

module.exports = router;
