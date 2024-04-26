const crypto = require('crypto');

// Función para cifrar utilizando Base64 con una clave
function cifrarBase64ConClave(texto, clave) {
    const algoritmo = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = crypto.scryptSync(clave, 'salt', 32); // Derivación de la clave
    const iv = Buffer.alloc(16, 0); // Vector de inicialización

    // Crear un cifrador en modo de flujo con la clave y el vector de inicialización
    const cipher = crypto.createCipheriv(algoritmo, key, iv);

    // Actualizar el cifrador con el texto a cifrar
    let textoCifrado = cipher.update(texto, 'utf8', 'base64');

    // Finalizar la operación de cifrado
    textoCifrado += cipher.final('base64');

    return textoCifrado;
}

module.exports = cifrarBase64ConClave;
