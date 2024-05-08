// cifrarController.js
const guardarCifradoController = require('./guardarCifradoController');
const cifrarCesar = require('../encode/cifrarCesar');
const cifrarPolibio = require('../encode/cifrarPolibio');
const cifrarBinario = require('../encode/cifrarBinario');
const cifrarHexa = require('../encode/cifrarHexa');
const cifrarBase64 = require('../encode/cifrarBase');
const ConversionSinUsuario = require('../database_connections/tablasCifrados').ConversionSinUsuario;
const ConversionConUsuario = require('../database_connections/tablasCifrados').ConversionConUsuario;


async function cifrarTexto(req, res) {
    console.log("Solicitud recibida para cifrar texto.");
    console.log("Datos del formulario recibidos:", req.body);

    const textoOriginal = req.body['texto-a-cifrar'];
    const algoritmo = req.body['algoritmo'];
    let textoCifrado;

    console.log("Texto original:", textoOriginal);
    console.log("Algoritmo de cifrado:", algoritmo);

    switch (algoritmo) {
        case 'cesar':
            const claveCesar = parseInt(req.body['clave-cifrado']); // Convertir la clave a número entero
            console.log("Cifrando texto utilizando el algoritmo César...");
            textoCifrado = cifrarCesar(textoOriginal, claveCesar);
            break;
        case 'polibio':
            console.log("Cifrando texto utilizando la sustitución de Polibio...");
            textoCifrado = cifrarPolibio(textoOriginal);
            break;
        case 'binario':
            console.log("Cifrando texto utilizando el algoritmo binario...");
            textoCifrado = cifrarBinario(textoOriginal);
            break;
        case 'hexa':
            console.log("Cifrando texto utilizando el algoritmo hexadecimal...");
            textoCifrado = cifrarHexa(textoOriginal);
            break;
        case 'base':
            console.log("Cifrando texto utilizando el algoritmo Base64...");
            textoCifrado = cifrarBase64(textoOriginal);
            break;
        default:
            console.error("Algoritmo de cifrado no válido:", algoritmo);
            return res.status(400).send('Algoritmo de cifrado no válido');
    }

    console.log("Texto cifrado:", textoCifrado);

    try {
        console.log("Guardando el cifrado en la base de datos...");
        let resultado;
        console.log(req.isAuthenticated());
    
        if (!req.isAuthenticated()) {
            resultado = await guardarCifradoController.guardarConversionSinUsuario(req, textoOriginal, textoCifrado, algoritmo);
        } else {
            const idUsuario = req.user.id;
            resultado = await guardarCifradoController.guardarConversionConUsuario(req, idUsuario, textoOriginal, textoCifrado, algoritmo);
        }
    
        // Llamada a las funciones UltimoRegistroSinUsuario y UltimoRegistroConUsuario si es necesario
        const ultimoRegistroSinUsuario = await ConversionSinUsuario.getLastRecord();
        const ultimoRegistroConUsuario = await ConversionConUsuario.getLastRecord();
    
        console.log("Resultado del guardado del cifrado:", resultado);
        console.log("Último registro sin usuario:", ultimoRegistroSinUsuario);
        console.log("Último registro con usuario:", ultimoRegistroConUsuario);

        if (resultado) {
            res.render('cifrar', { textoOriginal, textoCifrado, algoritmo, resultado });
        } else {
            console.error('Error al guardar el cifrado: No se obtuvo un resultado válido.');
            res.status(500).send('Error interno al guardar el cifrado');
        }
    } catch (error) {
        console.error('Error al guardar el cifrado:', error);
        console.log('Error al renderizar la vista:', error);
        res.status(500).send('Error interno al guardar el cifrado');
    }
}

module.exports = {
    cifrarTexto
};
