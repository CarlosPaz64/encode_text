const cifradoMiddleware = (req, res, next) => {
    // Verifica si el usuario está autenticado
    if (!req.isAuthenticated()) {
        // Si el contador no está definido en la sesión, inicialízalo a 0
        req.session.formUsageCount = req.session.formUsageCount || 0;

        // Incrementa el contador solo si se recibió un texto válido en el formulario
        if (!req.body['texto-a-cifrar']) {
            // Si no se proporcionó un texto válido, muestra un mensaje de error y redirige al usuario
            req.flash('error', 'Debes llenar el formulario primero');

            // Log para verificar si el mensaje de error está presente
            console.log("Mensaje de error:", req.flash('error'));

            return res.redirect('/');
        }
        // Incrementa el contador solo si se recibió un texto válido en el formulario
        req.session.formUsageCount++;


        // Debugging
        console.log("formUsageCount:", req.session.formUsageCount);

        // Verifica si el usuario ha excedido el límite de uso del formulario
        if (req.session.formUsageCount > 3) {
            // Redirige al usuario al login
            return res.redirect('/login');
        }
    } else {
        // Si el usuario está autenticado y no ha llenado el formulario, redirígelo a la página de inicio
        if (!req.body['texto-a-cifrar']) {
            // Muestra un mensaje de error y redirige al usuario
            req.flash('error', 'Debes llenar el formulario primero');

            // Log para verificar si el mensaje de error está presente
            console.log("Mensaje de error:", req.flash('error'));

            return res.redirect('/');
        }
    }

    // Continúa con el siguiente middleware (controlador cifrarTextoController)
    next();
};
module.exports = cifradoMiddleware;