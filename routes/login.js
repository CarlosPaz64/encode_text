const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../assets/authMiddleware');

// Ruta para mostrar el formulario de inicio de sesión (GET)
router.get('/', (req, res) => {
  const error = req.flash('error'); // Obtener el mensaje de error
  res.render('login', { title: 'Iniciar sesión', user: req.user ? req.user.nombre : '', error }); // Pasar el mensaje de error a la vista
});


// Ruta para manejar el inicio de sesión (POST)
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  const token = authMiddleware.generateToken(req.user.id);
  res.cookie('token', token, { httpOnly: true, secure: false });
  res.redirect('/');
});



module.exports = router;
