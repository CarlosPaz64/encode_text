const crypto = require('crypto');

// Función para cifrar a binario con una clave
function cifrarABinarioConClave(texto, clave) {
    const algoritmo = 'sha256'; // Algoritmo hash para HMAC
    const hmac = crypto.createHmac(algoritmo, clave); // Crear instancia de HMAC con la clave

    // Calcular el hash HMAC del texto utilizando la clave
    const hash = hmac.update(texto).digest('binary');

    return hash;
}

module.exports = cifrarABinarioConClave;
