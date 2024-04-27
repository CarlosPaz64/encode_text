//CifrarController.js
const guardarCifradoController = require('./guardarCifradoController'); // Importa el controlador para guardar el cifrado
const cifrarCesar = require('../encode/cifrarCesar');
const cifrarSustitucion = require('../encode/cifrarSustitucion');
const cifrarBinario = require('../encode/cifrarBinario');
const cifrarHexa = require('../encode/cifrarHexa');
const cifrarBase = require('../encode/cifrarBase');

async function cifrarTexto(req, res) {
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

    try {
        // Llama al controlador para guardar el cifrado según la autenticación del usuario
        if (!req.isAuthenticated()) {
            await guardarCifradoController.guardarConversionSinUsuario(textoOriginal, textoCifrado, algoritmo);
        } else {
            const idUsuario = req.user.id; // Obtén el ID del usuario autenticado
            await guardarCifradoController.guardarConversionConUsuario(idUsuario, textoOriginal, textoCifrado, algoritmo);
        }
        
        // Renderiza la vista cifrar y pasa el texto original, el texto cifrado, la clave y el algoritmo como variables
        res.render('cifrar', { textoOriginal, textoCifrado, clave, algoritmo });
    } catch (error) {
        console.error('Error al guardar el cifrado:', error);
        console.log('Error al renderizar la vista:', error);
        res.status(500).send('Error interno al guardar el cifrado');
    }
}

module.exports = {
    cifrarTexto
};
