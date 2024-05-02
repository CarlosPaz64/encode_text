function cifrarClaveUnica(texto, clave) {
    const alfabeto = 'abcdefghijklmnñopqrstuvwxyz'; // Alfabeto en minúsculas, incluyendo la "ñ"
    let textoCifrado = '';

    // Convertir la clave a un arreglo de números
    const claveNumerica = clave.split('').map(Number);

    console.log("Texto original:", texto);
    console.log("Clave numérica:", claveNumerica);

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i];
        const indice = alfabeto.indexOf(caracter); // Obtener el índice del caracter en el alfabeto

        console.log("Caracter actual:", caracter);
        console.log("Índice en el alfabeto:", indice);

        if (indice === -1) {
            // Si el caracter no está en el alfabeto, añadirlo al texto cifrado sin modificarlo
            textoCifrado += caracter;
        } else {
            // Aplicar la clave numérica al índice del caracter
            let nuevoIndice = (indice + claveNumerica[i % claveNumerica.length]) % alfabeto.length;

            console.log("Nuevo índice sin ajuste:", nuevoIndice);

            // Manejar el caso especial cuando el nuevo índice sea negativo
            if (nuevoIndice < 0) {
                nuevoIndice += alfabeto.length;
                console.log("Nuevo índice ajustado para caso negativo:", nuevoIndice);
            }

            // Obtener el caracter cifrado utilizando el nuevo índice
            const caracterCifrado = alfabeto[nuevoIndice];
            console.log("Caracter cifrado:", caracterCifrado);

            textoCifrado += caracterCifrado;
        }
    }

    console.log("Texto cifrado:", textoCifrado);

    return textoCifrado;
}

module.exports = cifrarClaveUnica;
