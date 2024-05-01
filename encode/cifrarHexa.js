// Función para cifrar a hexadecimal sin clave
function cifrarAHexadecimal(texto) {
    try {
        // Convertir el texto a un buffer y luego a hexadecimal
        const textoCifrado = Buffer.from(texto, 'utf-8').toString('hex');
        return textoCifrado;
    } catch (error) {
        console.error('Error en cifrarAHexadecimal:', error);
        return null;
    }
}

module.exports = cifrarAHexadecimal;
