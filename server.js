// server.js

const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./routes/routes');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const passwordUtils = require('./database_connections/passwordUtils'); // Archivo contenedor de funciones para cifrado
const usuarios = require('./database_connections/obtenerUsuario'); // Archivo contenedor de querys para MySQL
const dotenv = require('dotenv');
const cifradoMiddleware = require('./assets/cifradoMiddleware');
const bodyParser = require('body-parser');

// Configura el middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configura DotEnv
dotenv.config();

// Configurar middleware para manejar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET, // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false
}));

// Configura connect-flash
app.use(flash());

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await usuarios.obtenerUsuarioPorUsername(username);
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const passwordMatch = await passwordUtils.comparePassword(password, user.contrasenia_hash);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await usuarios.obtenerPorId(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});

// Middleware para obtener los datos del usuario desde la sesión
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Usar el middleware cifrado
app.use('/cifrar', cifradoMiddleware);

// Rutas de tu aplicación
app.use('/', router);

// Ruta para cerrar sesión
app.get('/logout', async (req, res) => {
  await req.logout(async (err) => {
    if (err) {
      console.error(err);
    }
    await req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        return res.status(500).send('Error al cerrar sesión');
      }
      console.log('req.session.destroy finalizado correctamente');
    });
    res.clearCookie('token');
    res.redirect('/'); // Redirigir a la página principal u otra página de tu elección
  });
});

// Ruta para renderizar la vista
app.get('/', (req, res) => {
  res.render('index'); // Renderizar la vista index.pug
});

// Puerto en el que escucha el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
