const jwt = require('jsonwebtoken');
const passwordUtils = require('../database_connections/passwordUtils');
const dotenv = require('dotenv');
const usuarios = require('../database_connections/obtenerUsuario');
const { registrarInicioSesion, actualizarCierreSesion } = require('../database_connections/vecesUser');

// Configura DotEnv
dotenv.config();

// Función para registrar el inicio de sesión
async function registrarLogin(idUsuario) {
    try {
        await registrarInicioSesion(idUsuario, new Date());
    } catch (error) {
        console.error('Error al registrar el inicio de sesión:', error);
        throw error;
    }
}

// Función para registrar el cierre de sesión
async function registrarLogout(idUsuario) {
    try {
        await actualizarCierreSesion(idUsuario, new Date());
    } catch (error) {
        console.error('Error al registrar el cierre de sesión:', error);
        throw error;
    }
}

// Middleware para autenticar
async function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error al autenticar:', error);
        return res.redirect('/login');
    }
}

// Función para generar token
function generateToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

// Función para autenticar usuario
async function authenticateUser(username, password, done) {
    try {
        const user = await usuarios.obtenerUsuarioPorUsername(username);
        if (!user) {
            return done(null, false, { message: 'Usuario incorrecto.' });
        }
        const passwordMatch = await passwordUtils.comparePassword(password, user.password_hash);
        if (!passwordMatch) {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
        return done(null, user);
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        return done(error);
    }
}

module.exports = {
    authenticate,
    generateToken,
    authenticateUser,
    registrarLogin,
    registrarLogout
};
