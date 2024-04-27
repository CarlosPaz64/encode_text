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
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ? LIMIT 1', [username]);
        if (rows.length > 0) {
            return rows[0]; // Devuelve solo el primer usuario encontrado
        } else {
            return null; // No se encontró ningún usuario con ese nombre de usuario
        }
    } catch (err) {
        console.log("No se ha podido buscar el usuario", err);
        throw new Error('Error al obtener el usuario por username');
    }
}

const obtenerPorId = async (id) => {
    try {
        // Consulta de Usuario por ID
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ? LIMIT 1', [id]);
        if (rows.length > 0) {
            return rows[0]; // Devuelve solo el primer usuario encontrado
        } else {
            return null; // No se encontró ningún usuario con ese ID
        }
    } catch (err) {
        console.error('Error al obtener el usuario por ID:', err);
        throw new Error('Error al obtener el usuario por ID');
    }
}


module.exports = { obtenerTodosLosUsuarios, obtenerUsuarioPorUsername, obtenerPorId };
