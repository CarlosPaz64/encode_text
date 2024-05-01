// En el index.js
const express = require('express');
const app = express();
const cifradoMiddleware = require('../assets/cifradoMiddleware'); // Asegúrate de proporcionar la ruta correcta

// Configurar la ruta para renderizar la vista
app.get('/', cifradoMiddleware, (req, res, next) => {
  res.render('index', { error: req.flash('error'), user: res.locals.user, formUsageCount: res.locals.formUsageCount });
});


// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
