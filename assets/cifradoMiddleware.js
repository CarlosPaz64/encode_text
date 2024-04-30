// Middleware para contabilizar el uso del formulario por usuarios no autenticados
const formUsageCounter = (req, res, next) => {
    // Verifica si el usuario está autenticado
    if (!req.isAuthenticated()) {
        // Si el contador no está definido en la sesión, inicialízalo a 0
        req.session.formUsageCount = req.session.formUsageCount || 0;

        // Incrementa el contador
        req.session.formUsageCount++;

        // Debugging
        console.log("formUsageCount:", req.session.formUsageCount);

        // Verifica si el usuario ha excedido el límite de uso del formulario
        if (req.session.formUsageCount > 3) {
            // Redirige al usuario al login y muestra un mensaje modal
            return res.redirect('/login');
        }
    }

    // Continúa con el siguiente middleware
    next();
};

// Exporta el middleware formUsageCounter
module.exports = formUsageCounter;
