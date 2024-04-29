// cifrarController.js
const guardarCifradoController = require('./guardarCifradoController');
const cifrarCesar = require('../encode/cifrarCesar');
const cifrarSustitucion = require('../encode/cifrarSustitucion');
const cifrarBinario = require('../encode/cifrarBinario');
const cifrarHexa = require('../encode/cifrarHexa');
const cifrarBase = require('../encode/cifrarBase');
const ConversionSinUsuario = require('../database_connections/tablasCifrados').ConversionSinUsuario;
const ConversionConUsuario = require('../database_connections/tablasCifrados').ConversionConUsuario;


async function cifrarTexto(req, res) {
    console.log("Solicitud recibida para cifrar texto.");
    console.log("Datos del formulario recibidos:", req.body);

    const textoOriginal = req.body['texto-a-cifrar'];
    const clave = req.body['clave-cifrado'];
    const algoritmo = req.body['algoritmo'];

    console.log("Texto original:", textoOriginal);
    console.log("Clave de cifrado:", clave);
    console.log("Algoritmo de cifrado:", algoritmo);

    let textoCifrado;

    switch (algoritmo) {
        case 'cesar':
            console.log("Cifrando texto utilizando el algoritmo César...");
            textoCifrado = cifrarCesar(textoOriginal, clave);
            break;
        case 'sustitucion':
            console.log("Cifrando texto utilizando el algoritmo de sustitución...");
            textoCifrado = cifrarSustitucion(textoOriginal, clave);
            break;
        case 'binario':
            console.log("Cifrando texto utilizando el algoritmo binario...");
            textoCifrado = cifrarBinario(textoOriginal, clave);
            break;
        case 'hexa':
            console.log("Cifrando texto utilizando el algoritmo hexadecimal...");
            textoCifrado = cifrarHexa(textoOriginal, clave);
            break;
        case 'base':
            console.log("Cifrando texto utilizando el algoritmo Base64...");
            textoCifrado = cifrarBase(textoOriginal, clave);
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
            resultado = await guardarCifradoController.guardarConversionConUsuario(idUsuario, textoOriginal, textoCifrado, algoritmo);
        }
    
        // Llamada a las funciones UltimoRegistroSinUsuario y UltimoRegistroConUsuario si es necesario
        const ultimoRegistroSinUsuario = await ConversionSinUsuario.getLastRecord();
        const ultimoRegistroConUsuario = await ConversionConUsuario.getLastRecord();
    
        console.log("Resultado del guardado del cifrado:", resultado);
        console.log("Último registro sin usuario:", ultimoRegistroSinUsuario);
        console.log("Último registro con usuario:", ultimoRegistroConUsuario);

        if (resultado) {
            res.render('cifrar', { textoOriginal, textoCifrado, clave, algoritmo, resultado });
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
