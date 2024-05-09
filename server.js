// server.js
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const passwordUtils = require('./database_connections/passwordUtils');
const usuarios = require('./database_connections/obtenerUsuario');
const dotenv = require('dotenv');
const cifradoMiddleware = require('./assets/cifradoMiddleware');
const bodyParser = require('body-parser');
const authMiddleware = require('./assets/authMiddleware');
const conversionesModel = require('./models/conversionesModel');

// Configuración del middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de DotEnv
dotenv.config();

// Configuración del middleware para manejar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  maxAge: 3600 * 1000 // 1 hora en milisegundos
}));

// Configuración de cookie-parser
app.use(cookieParser());

// Configuración de connect-flash
app.use(flash());

// Configuración de Passport.js
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('Intento de inicio de sesión con usuario:', username);
      const user = await usuarios.obtenerUsuarioPorUsername(username);
      console.log('Usuario encontrado:', user);
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const passwordMatch = await passwordUtils.comparePassword(password, user.contrasenia_hash);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }

      // Registra el inicio de sesión cuando las credenciales son válidas
      await authMiddleware.registrarLogin(user.id);

      return done(null, user);
    } catch (err) {
      console.error('Error al autenticar usuario:', err);
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await usuarios.obtenerPorId(id).then((user) => {
    console.log('Usuario encontrado en deserializeUser:', user);
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});

// Middleware para obtener los datos del usuario desde la sesión
app.use(async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const user = await usuarios.obtenerUsuarioPorUsername(req.user.username);
      res.locals.user = user || null;
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  
  res.locals.formUsageCount = req.session.formUsageCount || 0;
  next();
});

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Uso del middleware cifrado
app.use('/cifrar', cifradoMiddleware);

// Rutas de la aplicación
app.use('/logout', authMiddleware.authenticate, async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      await authMiddleware.registrarLogout(req.user.id); // Registro del logout e inserción de datos a la base de datos
    } else {
      console.error('No se puede cerrar sesión: usuario no autenticado.');
    }

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
      res.redirect('/');
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).send('Error al cerrar sesión');
  }
}, router);

app.get('/', (req, res, next) => {
  res.render('index', { user: res.locals.user, formUsageCount: res.locals.formUsageCount, error: req.flash('error')
   });
});

// Llama a las rutas definidas en routes.js
app.use('/', router);

// Ruta para obtener conversiones por ID de usuario
app.get('/cifrados/:idUsuario', authMiddleware.autenticarCifrados, async (req, res, next) => {
  const idUsuario = req.params.idUsuario;
  try {
    // Obtener las conversiones por ID de usuario
    console.log('ID de usuario:', idUsuario); // Agregado para depuración
    const conversiones = await conversionesModel.obtenerConversionesConUsuarioPorId(idUsuario);
    console.log('Conversiones encontradas:', conversiones); // Agregado para depuración
    console.log('Conversiones pasadas a la vista:', conversiones);
    res.render('cifrados', { conversiones }); // Renderizar la plantilla y pasar las conversiones como datos
  } catch (error) {
    console.error('Error al obtener las conversiones con usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
