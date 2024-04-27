// passwordUtils.js
const bcrypt = require('bcrypt');

const hashContraseña = async (contraseña) => {
    try {
        const hashedContraseña = await bcrypt.hash(contraseña, 10); // El segundo parámetro es el número de rondas de encriptación
        return hashedContraseña;
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        throw new Error('Error al encriptar la contraseña');
    }
};

module.exports = { hashContraseña };
