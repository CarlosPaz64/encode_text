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

// Ruta para mostrar la página de cifrados
router.get('/', async (req, res, next) => {
    try {
      // Obtener el usuario desde la solicitud (req.user)
      const usuario = req.user;
      // Aquí puedes llamar al controlador correspondiente y pasar el usuario a la plantilla
      res.render('cifrados', { usuario });
    } catch (error) {
      console.error('Error al renderizar la página de cifrados:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

module.exports = router;
