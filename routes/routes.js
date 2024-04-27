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

// Middleware para verificar la autenticación del usuario
function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // Si el usuario está autenticado, continúa
    } else {
      res.redirect('/login'); // Si no está autenticado, redirige al inicio de sesión
    }
  }
  
  // Ruta para el index
  router.get('/', requireAuth, (req, res) => {
    // Obtener el número de créditos disponibles del usuario
    const creditosDisponibles = req.user.creditos || 0; // Suponiendo que el número de créditos está almacenado en el objeto de usuario
  
    // Renderizar la vista de index con los créditos disponibles
    res.render('index', { creditosDisponibles });
  });

module.exports = router;
