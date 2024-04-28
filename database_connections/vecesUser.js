const pool = require('./initial_connection'); // Reemplaza 'nombre_de_tu_archivo_de_conexion_mysql' con el nombre real de tu archivo

// Función para insertar un nuevo registro de inicio de sesión
async function registrarInicioSesion(idUsuario, fechaRegistro) {
    try {
        const query = 'INSERT INTO veces_login (id_usuario, fecha_registro) VALUES (?, ?)';
        const [result] = await pool.execute(query, [idUsuario, fechaRegistro]);
        console.log('Nuevo inicio de sesión registrado:', result);
        return result;
    } catch (error) {
        console.error('Error al registrar inicio de sesión:', error);
        throw error;
    }
}

// Función para actualizar el registro de cierre de sesión
async function actualizarCierreSesion(idUsuario, fechaLogout) {
    try {
        const query = 'INSERT INTO veces_logout (id_usuario, fecha_logout) VALUES (?, ?)';
        await pool.query(query, [idUsuario, fechaLogout]);
    } catch (error) {
        console.error('Error al actualizar el cierre de sesión:', error);
        throw error; // Propagar el error para manejarlo en la llamada a la función
    }
}

module.exports = { registrarInicioSesion, actualizarCierreSesion };
