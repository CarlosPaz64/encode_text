const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config(); 

// Servir archivos estáticos desde el directorio public
app.use(express.static('public'));

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));

// Verifica si SESSION_SECRET está definido en .env
if (!process.env.SESSION_SECRET) {
  console.error('ERROR: La variable de entorno SESSION_SECRET no está definida en el archivo .env');
  process.exit(1);
}

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET, // Cambia esto por una cadena de caracteres aleatoria
  resave: false,
  saveUninitialized: false
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Utilizar las rutas definidas en routes.js
app.use('/', routes);

// Configurar el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configurar la ruta para renderizar la vista
app.get('/', (req, res) => {
    res.render('index'); // Renderizar la vista index.pug
});

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});