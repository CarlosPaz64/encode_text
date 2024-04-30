// Importación del pool de conexiones
const pool = require('./initial_connection');

// Función asincrónica para obtener conversiones con usuario por ID
const obtenerConversionesConUsuarioPorId = async (id) => {
    try {
        // Consulta de conversiones con usuario por ID
        const [rows] = await pool.query('SELECT * FROM conversiones_con_usuario WHERE id_usuario = ?', [id]);
        return rows;
    } catch (err) {
        console.error('Error al obtener las conversiones con usuario por ID:', err);
        throw new Error('Error al obtener las conversiones con usuario por ID');
    }
};

module.exports = obtenerConversionesConUsuarioPorId;
