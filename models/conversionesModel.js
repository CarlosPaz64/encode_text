// conversionesModel.js

const obtenerConversiones = require('../database_connections/obtenerConversiones');

const obtenerConversionesConUsuarioPorId = async (idUsuario) => {
    try {
        const conversiones = await obtenerConversiones(idUsuario); // Llama directamente a la función sin usar la notación de objeto
        return conversiones;
    } catch (error) {
        // Debugging
        console.error('Error al obtener las conversiones con usuario por ID:', error);
        throw new Error('Error al obtener las conversiones con usuario por ID');
    }
};

module.exports = {
    obtenerConversionesConUsuarioPorId
};
