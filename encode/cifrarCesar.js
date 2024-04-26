// cesar.js

// Función para cifrar utilizando el Código César
function cifrarCesar(texto, clave) {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Alfabeto en mayúsculas

    // Convertir el texto a mayúsculas para simplificar el cifrado
    texto = texto.toUpperCase();

    let textoCifrado = '';

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];
        const indice = alfabeto.indexOf(caracter); // Obtener el índice del caracter en el alfabeto

        if (indice === -1) {
            // Si el caracter no está en el alfabeto, no lo ciframos (espacios, números, símbolos, etc.)
            textoCifrado += caracter;
        } else {
            // Calcular el nuevo índice desplazado por la clave
            const nuevoIndice = (indice + clave) % 26; // Módulo 26 para mantenerlo en el rango del alfabeto

            // Obtener el caracter cifrado utilizando el nuevo índice
            textoCifrado += alfabeto[nuevoIndice];
        }
    }

    return textoCifrado;
}

module.exports = cifrarCesar;
