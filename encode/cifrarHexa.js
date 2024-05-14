// Función para cifrar a hexadecimal sin clave
function cifrarAHexadecimal(texto) {
    try {
        // Convertir el texto a un buffer y luego a hexadecimal
        const textoCifrado = Buffer.from(texto, 'utf-8').toString('hex'); // ToString al método hexadecimal
        // El buffer se utilizó para el manejo de bytes
        // La elección del cifrado a UTF-8 (formato de codificación)
        // Se debe a la amplia gama de caracteres que permite 
        return textoCifrado;
        // Retornar al textoCifrado
    } catch (error) {
        // Manejo de errores
        console.error('Error en cifrarAHexadecimal:', error);
        return null;
    }
}

module.exports = cifrarAHexadecimal;
