const registroUsuario = require('../database_connections/registroUsuario');

const registrarUsuario = async (nombre, apellidoPaterno, apellidoMaterno, usuario, correo, contraseniaHash) => {
    try {
        // Llamar a la función para registrar el usuario en la base de datos
        const result = await registroUsuario.registrarUsuario(nombre, apellidoPaterno, apellidoMaterno, usuario, correo, contraseniaHash);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = { registrarUsuario };
