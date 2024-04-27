const pool = require('../database_connections/initial_connection'); // Importa el pool de conexiones

const registrarUsuario = async (nombre, apellidoPaterno, apellidoMaterno, usuario, correo, contraseniaHash) => {
    try {
        // Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
        const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM usuarios WHERE username = ? OR correo = ?', [usuario, correo]);
        const { count } = rows[0];

        if (count > 0) {
            // Si ya existe un usuario con el mismo nombre de usuario o correo electrónico, no se puede registrar nuevamente
            return false;
        }

        // Si no hay un usuario con los mismos datos, procede con el registro
        await pool.execute('INSERT INTO usuarios (nombre, apellido_pat, apellido_mat, username, correo, contrasenia_hash) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellidoPaterno, apellidoMaterno, usuario, correo, contraseniaHash]);
        return true; // Devuelve true para indicar que el usuario se registró correctamente
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw new Error('Error al registrar usuario');
    }
};

module.exports = { registrarUsuario };
