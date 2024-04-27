const express = require('express');
const app = express();

// Configurar la ruta para renderizar la vista
app.get('/', (req, res) => {
    res.render('index'); // Renderizar la vista index.pug
});

// Otros middleware y configuraciones...

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});