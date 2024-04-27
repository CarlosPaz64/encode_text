const pool = require('./initial_connection'); // Importa el pool de conexiones

const obtenerTodosLosUsuarios = async () => {
    try {
        // Realiza la consulta para obtener todos los usuarios
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        throw new Error('Error al obtener todos los usuarios');
    }
};

const obtenerUsuarioPorUsername = async (username) => {
    try {
        // Consulta de Usuario por Username
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
        return rows;
    } catch (err) {
        console.log("No se ha podido buscar el usuario", err);
        throw new Error('Error al obtener el usuario por username');
    }
}

module.exports = { obtenerTodosLosUsuarios, obtenerUsuarioPorUsername };
