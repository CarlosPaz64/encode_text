// guardarCifradoController

// Llamada a los modelos  y servicios necesarios.
const ConversionSinUsuario = require('../models/conversionSinUsuario');
const ConversionConUsuario = require('../models/conversionConUsuario');

// Lógica para hacer el guardado si no hay usuario y si lo hay
// Controlador para manejar las conversiones
const conversionController = {};

// Función para guardar una conversión sin usuario
conversionController.guardarConversionSinUsuario = async (textoPorConvertir, textoCifrado, algoritmo) => {
  try {
    const conversionData = {
      texto_por_convertir: textoPorConvertir,
      texto_criptado: textoCifrado,
      algoritmo: algoritmo
    };
    const resultado = await ConversionSinUsuario.create(conversionData);
    return resultado;
  } catch (error) {
    console.error('Error al guardar la conversión sin usuario:', error);
    throw new Error('Error al guardar la conversión sin usuario');
  }
};

// Función para guardar una conversión con usuario
conversionController.guardarConversionConUsuario = async (idUsuario, textoPorConvertir, textoCifrado, algoritmo) => {
  try {
    const conversionData = {
      id_usuario: idUsuario,
      texto_por_convertir_usuario: textoPorConvertir,
      texto_criptado_usuario: textoCifrado,
      algoritmo: algoritmo
    };
    const resultado = await ConversionConUsuario.create(conversionData);
    return resultado;
  } catch (error) {
    console.error('Error al guardar la conversión con usuario:', error);
    throw new Error('Error al guardar la conversión con usuario');
  }
};

module.exports = conversionController;
