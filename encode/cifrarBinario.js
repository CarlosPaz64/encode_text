// Función para cifrar el texto original a binario
function cifrarBinario(textoOriginal) {
    let textoBinario = '';

    // Iterar sobre cada carácter del texto original
    for (let i = 0; i < textoOriginal.length; i++) {
        // Obtener el valor ASCII del carácter
        const valorAscii = textoOriginal.charCodeAt(i);
        
        // Convertir el valor ASCII a su representación binaria de 8 bits
        const binario = valorAscii.toString(2).padStart(8, '0');
        
        // Agregar la representación binaria al texto binario resultante
        textoBinario += binario;
    }

    return textoBinario;
}

module.exports = cifrarBinario;
