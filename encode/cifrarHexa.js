const crypto = require('crypto');

// Función para cifrar a hexadecimal con una clave
function cifrarAHexadecimalConClave(texto, clave) {
    const algoritmo = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = crypto.createHash('sha256').update(clave).digest('base64').slice(0, 32); // Convertir clave a formato adecuado
    const iv = crypto.randomBytes(16); // Vector de inicialización aleatorio

    // Crear un cifrador en modo de flujo con la clave y el vector de inicialización
    const cipher = crypto.createCipheriv(algoritmo, key, iv);

    // Actualizar el cifrador con el texto a cifrar
    let textoCifrado = cipher.update(texto, 'utf8', 'hex');

    // Finalizar la operación de cifrado
    textoCifrado += cipher.final('hex');

    return textoCifrado;
}

module.exports = cifrarAHexadecimalConClave;
