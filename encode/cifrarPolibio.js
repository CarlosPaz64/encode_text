function cifrarPolibio(textoOriginal) {
    // Definir la matriz de 5x5 para el cifrado de Polibio
    const matrizPolibio = [
        ['A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'H', 'I/J', 'K'],
        ['L', 'M', 'N/Ñ', 'O', 'P'],
        ['Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z']
    ];

    let textoCifrado = '';

    // Iterar sobre cada carácter del texto original
    for (let i = 0; i < textoOriginal.length; i++) {
        // Convertir el carácter a mayúsculas para compararlo con la matriz
        const caracter = textoOriginal[i].toUpperCase();

        // Buscar el carácter en la matriz de Polibio
        for (let fila = 0; fila < matrizPolibio.length; fila++) {
            for (let columna = 0; columna < matrizPolibio[fila].length; columna++) {
                if (matrizPolibio[fila][columna].includes(caracter)) {
                    // Agregar las coordenadas al texto cifrado (empezando desde 1)
                    textoCifrado += `(${fila + 1},${columna + 1}) `;
                    break;
                }
            }
        }
    }

    return textoCifrado.trim(); // Eliminar espacios adicionales al final
}

module.exports = cifrarPolibio;
