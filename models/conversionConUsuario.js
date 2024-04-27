const ConversionConUsuario = require('../database_connections/tablasCifrados');

// Función para guardar una conversión con usuario en la base de datos
const guardarConversionConUsuario = async (idUsuario, textoPorConvertir, textoCifrado, algoritmo) => {
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

module.exports = { guardarConversionConUsuario };
