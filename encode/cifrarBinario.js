// Función para cifrar el texto original a binario
function cifrarBinario(textoOriginal) {
    let textoBinario = '';

    // Iterar sobre cada carácter del texto original
    for (let i = 0; i < textoOriginal.length; i++) {
        // Obtener el valor ASCII del carácter
        const valorAscii = textoOriginal.charCodeAt(i); // Método para devolver el valor UNICODE del textos
        
        // Convertir el valor ASCII a su representación binaria de 8 bits
        const binario = valorAscii.toString(2).padStart(8, '0');
        // Aquí se obtiene el valor ASCII de cada palabra
        // Para después ser cifrado a 8 bits utilizando toString(2)
        // Y si una representación binaria tiene menos de 8 bits agrega '0' a la izquierda
        // Para rellenar el espacio
        
        // Agregar la representación binaria al texto binario resultante
        textoBinario += binario;
    }

    return textoBinario;
}

module.exports = cifrarBinario;
