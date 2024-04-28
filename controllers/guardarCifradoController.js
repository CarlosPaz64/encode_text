// guardarCifradoController.js

// Llamada a los modelos y servicios necesarios.
const ConversionSinUsuario = require('../database_connections/tablasCifrados').ConversionSinUsuario;
const ConversionConUsuario = require('../database_connections/tablasCifrados').ConversionConUsuario;

// Lógica para hacer el guardado si no hay usuario y si lo hay
// Controlador para manejar las conversiones
const guardarCifradoController = {};

// Función para guardar una conversión sin usuario
guardarCifradoController.guardarConversionSinUsuario = async (textoOriginal, textoCifrado, algoritmo) => {
  try {
    const conversionData = {
      texto_por_convertir: textoOriginal,
      texto_criptado: textoCifrado,
      algoritmo: algoritmo,
      fecha_encode_sin_usuario: new Date() // Agregar la fecha actual aquí
    };
    const resultado = await ConversionSinUsuario.create(conversionData);
    console.log('Resultado de la operación de guardado (sin usuario):', resultado);
    return resultado;
  } catch (error) {
    console.error('Error al guardar la conversión sin usuario:', error);
    throw new Error('Error al guardar la conversión sin usuario');
  }
};

// Función para guardar una conversión con usuario
guardarCifradoController.guardarConversionConUsuario = async (idUsuario, textoOriginal, textoCifrado, algoritmo) => {
  try {
    const conversionData = {
      id_usuario: idUsuario,
      texto_por_convertir_usuario: textoOriginal,
      texto_criptado_usuario: textoCifrado,
      algoritmo: algoritmo,
      fecha_encode_con_usuario: new Date() // Agregar la fecha actual aquí
    };
    const resultado = await ConversionConUsuario.create(conversionData);
    console.log('Resultado de la operación de guardado (con usuario):', resultado);
    return resultado;
  } catch (error) {
    console.error('Error al guardar la conversión con usuario:', error);
    throw new Error('Error al guardar la conversión con usuario');
  }
};

module.exports = guardarCifradoController;;
