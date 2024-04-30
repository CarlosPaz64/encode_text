const userModel = require('../models/userModel');
const { hashContraseña } = require('../database_connections/passwordUtils'); // Importa la función hashContraseña desde el archivo passwordUtils.js

// Controlador para manejar el registro de usuarios
const registrarUsuario = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { nombre, apellidoPaterno, apellidoMaterno, usuario, correo, contraseña } = req.body;

        // Verificar si todos los campos requeridos están presentes
        if (!nombre || !apellidoPaterno || !usuario || !correo || !contraseña) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Encriptar la contraseña antes de almacenarla en la base de datos
        const contraseniaHash = await hashContraseña(contraseña); // Utiliza la función hashContraseña para convertir la contraseña en hash

        // Llamar a la función del modelo para registrar el usuario
        const result = await userModel.registrarUsuario(nombre, apellidoPaterno, apellidoMaterno, usuario, correo, contraseniaHash);

        // Si el usuario se registró exitosamente, devolver una respuesta
        if (result) {
            return res.redirect('/login');
        } else {
             // Si el registro no fue exitoso, redirige al usuario a la vista de registro con el mensaje de error
             req.session.error = 'Ya hay un usuario registrado con ese username';
             return res.redirect('/registro');

        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        req.session.error = 'Error interno del servidor';
        return res.redirect('/registro');
    }
};

// Controlador para mostrar el formulario de registro
const mostrarFormularioRegistro = (req, res) => {
    try {
        const error = req.session.error; // Obtener el error de la sesión
        delete req.session.error; // Eliminar el error de la sesión después de obtenerlo
        res.render('registro', { error }); // Pasar el error a la vista de registro (registro.pug)
    } catch (error) {
        console.error('Error al mostrar el formulario de registro:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};



module.exports = { registrarUsuario, mostrarFormularioRegistro };
