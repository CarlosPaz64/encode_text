// controllers/obtenerCifradoPorId.js

const ConversionesModel = require('../models/conversionesModel');

// Controlador para obtener conversiones por ID de usuario
const obtenerConversionesPorIdUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario; // Suponiendo que el ID de usuario está en los parámetros de la solicitud
    const usuario = req.user; // Obtiene el usuario de la solicitud

    try {
        // Llama a la función del modelo para obtener las conversiones por ID de usuario
        const conversiones = await ConversionesModel.obtenerConversionesConUsuarioPorId(idUsuario);
        // Renderiza la plantilla y pasa las conversiones y el usuario como datos
        res.render('cifrados', { conversiones, usuario });
    } catch (error) {
        console.error('Error al obtener las conversiones con usuario por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    obtenerConversionesPorIdUsuario
};
