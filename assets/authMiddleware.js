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
// Función para generar un token con un tiempo de vida definido
function generateToken(userId) {
    // Define el tiempo de vida del token (en segundos)
    const expiresIn = 3600; // 1 hora (en segundos :D)

    // Genera el token con el tiempo de vida especificado
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
    console.log('Token generado:', token);
    console.log('Expires in:', expiresIn, 'seconds'); // Agregar el console.log para mostrar el tiempo de vida
    return token;
}

async function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log('Token recibido:', token);

        // Verifica si el usuario está autenticado antes de verificar el token
        if (req.isAuthenticated()) {
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('La sesión ha caducado.');
                    req.flash('expiredTokenMessage', 'La sesión ha caducado.');

                    // Destruir la sesión
                    await req.session.destroy();

                    // Limpiar la cookie
                    res.clearCookie('token');

                    // Redirigir al index normal
                    return res.redirect('/');
                } else {
                    console.error('Error al verificar el token:', err);
                    req.flash('error', 'El token es inválido. Por favor, inicia sesión nuevamente.');
                    return res.redirect('/login');
                }
            }

            console.log('Token verificado correctamente. ID de usuario:', decoded.userId);
            req.userId = decoded.userId;
        }

        // Si el usuario no está autenticado, continúa sin verificar el token
        next();
    } catch (error) {
        console.error('Error al autenticar:', error);
        req.flash('error', 'Error de autenticación.');
        return res.redirect('/login', { title: 'Iniciar sesión', user: null, error: error.message });
    }
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

async function autenticarCifrados(req, res, next) {
    try {
        // Verifica si hay un token en las cookies de la solicitud
        const token = req.cookies.token;

        // Si no hay token, redirige al usuario al inicio de sesión
        if (!token) {
            return res.redirect('/');
        }

        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // Si el token es válido, permite que la solicitud continúe
        next();

    } catch (err) {
        // Si hay un error al verificar el token, redirige al usuario al inicio de sesión
        return res.redirect('/');
    }
}


module.exports = {
    authenticate,
    generateToken,
    authenticateUser,
    registrarLogin,
    registrarLogout,
    autenticarCifrados
};
