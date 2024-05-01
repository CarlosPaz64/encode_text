function cifrarPorSustitucion(texto, clave) {
    const alfabeto = 'abcdefghijklmnñopqrstuvwxyz';
    let textoCifrado = '';

    // Convertir la clave a un arreglo de números utilizando el valor ASCII de cada letra
    const claveNumerica = clave.split('').map(letra => letra.charCodeAt(0) - 97);

    // Crear un objeto de mapeo para la sustitución
    const sustitucion = {};
    for (let i = 0; i < alfabeto.length; i++) {
        sustitucion[alfabeto[i]] = alfabeto[(i + claveNumerica[i]) % alfabeto.length];
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
