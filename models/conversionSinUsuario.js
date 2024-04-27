const ConversionSinUsuario = require('../database_connections/tablasCifrados');

// Función para guardar una conversión con usuario en la base de datos
const guardarConversionSinUsuario = async (textoPorConvertir, textoCifrado, algoritmo) => {
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

module.exports = { guardarConversionSinUsuario };