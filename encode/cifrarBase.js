const crypto = require('crypto');

function cifrarBase64ConClave(texto, clave) {
    try {
        const algoritmo = 'aes-256-cbc';
        const key = crypto.scryptSync(clave, 'salt', 32);
        const iv = Buffer.alloc(16, 0);

        const cipher = crypto.createCipheriv(algoritmo, key, iv);

        let textoCifrado = cipher.update(texto, 'utf8', 'base64');
        textoCifrado += cipher.final('base64');

        return textoCifrado;
    } catch (error) {
        console.error('Error en cifrarBase64ConClave:', error);
        return null;
    }
}

module.exports = cifrarBase64ConClave;
