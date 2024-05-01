function cifrarBase64(texto) {
    try {
        // Convertir el texto a un buffer y luego a Base64
        const textoCifrado = Buffer.from(texto, 'utf-8').toString('base64');
        return textoCifrado;
    } catch (error) {
        console.error('Error en cifrarBase64:', error);
        return null;
    }
}

module.exports = cifrarBase64;
