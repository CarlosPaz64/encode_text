// controllers/cifrarController.js
const cifrarCesar = require('../encode/cifrarCesar');
const cifrarSustitucion = require('../encode/cifrarSustitucion');
const cifrarBinario = require('../encode/cifrarBinario');
const cifrarHexa = require('../encode/cifrarHexa');
const cifrarBase = require('../encode/cifrarBase');

function cifrarTexto(req, res) {
    console.log(req.body);
    const texto = req.body['texto-a-cifrar'];
    const clave = req.body['clave-cifrado'];
    const algoritmo = req.body['algoritmo'];

    let textoCifrado;

    switch (algoritmo) {
        case 'cesar':
            textoCifrado = cifrarCesar(texto, clave);
            break;
        case 'sustitucion':
            textoCifrado = cifrarSustitucion(texto, clave);
            break;
        case 'binario':
            textoCifrado = cifrarBinario(texto, clave);
            break;
        case 'hexa':
            textoCifrado = cifrarHexa(texto, clave);
            break;
        case 'base':
            textoCifrado = cifrarBase(texto, clave);
            break;
        default:
            return res.status(400).send('Algoritmo de cifrado no válido');
    }

    res.render('cifrar', { textoCifrado });
}

module.exports = {
    cifrarTexto
};
