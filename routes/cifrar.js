// cifrar.js

const express = require('express');
const router = express.Router();
const guardarCifradoController = require('../controllers/guardarCifradoController');

// Ruta para guardar un cifrado
router.post('/', async (req, res) => {
  const { textoOriginal, textoCifrado } = req.body;

  try {
    // Llamar al controlador para guardar el cifrado
    await guardarCifradoController.guardarCifradoSinUsuario(textoOriginal, textoCifrado);

    // Enviar una respuesta al cliente
    res.send('Cifrado guardado correctamente');
  } catch (error) {
    console.error('Error al guardar el cifrado:', error);
    res.status(500).send('Error al guardar el cifrado');
  }
});

module.exports = router;
