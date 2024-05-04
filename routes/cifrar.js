// cifrar.js

const express = require('express');
const router = express.Router();
const cifrarController = require('../controllers/cifrarController');
const authMiddleware = require('../assets/authMiddleware'); // Importa el middleware de autenticación

// Ruta para mostrar el formulario de cifrado (GET)
router.get('/', (req, res) => {
    res.render('cifrar');
});

// Ruta para cifrar texto (POST)
router.post('/', authMiddleware.authenticate, (req, res) => {
    // Verifica si la sesión ha caducado y aún hay un usuario autenticado
    if (req.isAuthenticated() && req.flash('expiredTokenMessage').length > 0) {
        // Si la sesión ha caducado, redirige al login
        return res.redirect('/login');
    }
    
    // Si la sesión no ha caducado, continúa con la lógica de cifrado
    console.log('Datos recibidos en /cifrar:', req.body);
    cifrarController.cifrarTexto(req, res);
});

module.exports = router;
