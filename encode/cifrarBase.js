function cifrarBase64(texto) {
    try {
        // Convertir el texto a un buffer y luego a Base64
        const textoCifrado = Buffer.from(texto, 'utf-8').toString('base64'); // ToString al método base64
        // El buffer se utilizó para el manejo de bytes
        // La elección del cifrado a UTF-8 (formato de codificación)
        // Se debe a la amplia gama de caracteres que permite 
        return textoCifrado;
        // Retorno del texto cifrado
    } catch (error) {
        // Manejo de errores
        console.error('Error en cifrarBase64:', error);
        return null;
    }
}

module.exports = cifrarBase64;
