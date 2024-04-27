// routes/routes.js
const express = require('express');
const router = express.Router();
const cifrarController = require('../controllers/cifrarController');

// Ruta para cifrar texto (POST)
router.post('/cifrar', cifrarController.cifrarTexto);

// Ruta para mostrar el formulario de inicio de sesión (GET)
router.get('/registro', (req, res) => {
    res.render('registro'); // Renderiza la vista de inicio de sesión (login.pug)
  });

  // Ruta para procesar el formulario de registro (POST)
router.post('/registro', (req, res) => {
    // Procesa los datos del formulario y luego redirige al inicio
    res.redirect('/');
  });

// Ruta para mostrar el formulario de inicio de sesión (GET)
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista de inicio de sesión (login.pug)
  });

  // Ruta para procesar el formulario de registro (POST)
  router.post('/login', (req, res) => {
    // Procesa los datos del formulario y luego redirige al inicio
    res.redirect('/');
  });

module.exports = router;
