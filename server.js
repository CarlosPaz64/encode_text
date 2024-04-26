const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

// Servir archivos estáticos desde el directorio public
app.use(express.static('public'));

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));

// Utilizar las rutas definidas en routes.js
app.use('/', routes);

// Configurar el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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