// authMiddleware.js
const jwt = require('jsonwebtoken');
const passwordUtils = require('../database_connections/passwordUtils'); // Importa las funciones de passwordUtils.js
const dotenv = require('dotenv');
const usuarios = require('../database_connections/obtenerUsuario');

//Configura DotEnv
dotenv.config();

async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;

        next();

    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// Función para generar un token JWT
function generateToken(userId) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

async function authenticateUser(username, password, done) {
    try {
        // Obtener el usuario de la base de datos por nombre de usuario
        const user = await usuarios.obtenerUsuarioPorUsername(username);
        if (!user) {
            return done(null, false, { message: 'Usuario incorrecto.' });
        }
        const passwordMatch = await passwordUtils.comparePassword(password, user.password_hash);
        if (!passwordMatch) {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

module.exports = {
    authenticate,
    generateToken,
    authenticateUser
};
