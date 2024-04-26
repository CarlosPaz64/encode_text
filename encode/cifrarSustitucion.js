// Función para cifrar por sustitución
function cifrarPorSustitucion(texto, clave) {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    let textoCifrado = '';

    // Crear un objeto de mapeo para la sustitución
    const sustitucion = {};
    for (let i = 0; i < alfabeto.length; i++) {
        sustitucion[alfabeto[i]] = clave[i] || alfabeto[i];
    }

    // Cifrar el texto letra por letra
    for (let i = 0; i < texto.length; i++) {
        const letraOriginal = texto[i].toLowerCase();
        const letraCifrada = sustitucion[letraOriginal] || texto[i];
        textoCifrado += texto[i] === texto[i].toUpperCase() ? letraCifrada.toUpperCase() : letraCifrada;
    }

    return textoCifrado;
}

module.exports = cifrarPorSustitucion;
