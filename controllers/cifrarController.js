// controllers/cifrarController.js
const cifrarCesar = require('../encode/cifrarCesar');
const cifrarSustitucion = require('../encode/cifrarSustitucion');
const cifrarBinario = require('../encode/cifrarBinario');
const cifrarHexa = require('../encode/cifrarHexa');
const cifrarBase = require('../encode/cifrarBase');

function cifrarTexto(req, res) {
    console.log(req.body);
    const textoOriginal = req.body['texto-a-cifrar']; // Obtén el texto original
    const clave = req.body['clave-cifrado'];
    const algoritmo = req.body['algoritmo'];

    let textoCifrado;

    switch (algoritmo) {
        case 'cesar':
            textoCifrado = cifrarCesar(textoOriginal, clave); // Usa el texto original para cifrar
            break;
        case 'sustitucion':
            textoCifrado = cifrarSustitucion(textoOriginal, clave);
            break;
        case 'binario':
            textoCifrado = cifrarBinario(textoOriginal, clave);
            break;
        case 'hexa':
            textoCifrado = cifrarHexa(textoOriginal, clave);
            break;
        case 'base':
            textoCifrado = cifrarBase(textoOriginal, clave);
            break;
        default:
            return res.status(400).send('Algoritmo de cifrado no válido');
    }

    // Renderiza la vista cifrar y pasa el texto original y el texto cifrado como variables
    res.render('cifrar', { textoOriginal, textoCifrado });
}

module.exports = {
    cifrarTexto
};
