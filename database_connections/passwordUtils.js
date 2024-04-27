const bcrypt = require('bcrypt');

/**
 * Compara una contraseña en texto plano con un hash de contraseña.
 * @param {string} password - Contraseña en texto plano.
 * @param {string} hashedPassword - Hash de contraseña.
 * @returns {boolean} - True si las contraseñas coinciden, false de lo contrario.
 */
const comparePassword = async (password, hashedPassword) => {
    try {
        console.log('Contraseña en texto plano:', password);
        console.log('Hash de contraseña almacenado:', hashedPassword);

        // Compara la contraseña en texto plano con el hash de contraseña
        const match = await bcrypt.compare(password, hashedPassword);

        return match;
    } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        throw new Error('Error al comparar contraseñas');
    }
};


/**
 * Genera un hash para una contraseña dada.
 * @param {string} password - Contraseña en texto plano.
 * @returns {string} - Hash de la contraseña.
 */
const hashContraseña = async (password) => {
    try {
        // Genera un hash para la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // El segundo parámetro es el número de rondas de encriptación
        return hashedPassword;
    } catch (error) {
        console.error('Error al generar hash para la contraseña:', error);
        throw new Error('Error al generar hash para la contraseña');
    }
};

module.exports = {
    comparePassword,
    hashContraseña
};
