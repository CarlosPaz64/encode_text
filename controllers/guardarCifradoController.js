// Llamada a los modelos y servicios necesarios.
const ConversionSinUsuario = require('../database_connections/tablasCifrados').ConversionSinUsuario;
const ConversionConUsuario = require('../database_connections/tablasCifrados').ConversionConUsuario;

// Lógica para hacer el guardado si no hay usuario y si lo hay
// Controlador para manejar las conversiones
const guardarCifradoController = {};

// Función para guardar una conversión sin usuario
guardarCifradoController.guardarConversionSinUsuario = async (req, textoOriginal, textoCifrado, algoritmo) => {
  try {
    // Verificar si hay un usuario autenticado
    if (req.isAuthenticated()) {
      throw new Error('No se puede guardar la conversión sin usuario porque hay un usuario autenticado.');
    }

    const conversionData = {
      texto_por_convertir: textoOriginal,
      texto_criptado: textoCifrado,
      algoritmo: algoritmo,
      clave_sin_usuario: req.body['clave-cifrado'], 
      fecha_encode_sin_usuario: new Date()
    };
    console.log(conversionData);
    const resultado = await ConversionSinUsuario.create(conversionData);
    console.log('Resultado de la operación de guardado (sin usuario):', resultado);

    // Obtener el último registro de conversiones_sin_usuario
    const ultimoRegistroSinUsuario = await ConversionSinUsuario.getLastRecord();
    console.log('Último registro de conversiones_sin_usuario:', ultimoRegistroSinUsuario);

    return resultado;
  } catch (error) {
    console.error('Error al guardar la conversión sin usuario:', error);
    throw new Error('Error al guardar la conversión sin usuario');
  }
};

// Función para guardar una conversión con usuario
guardarCifradoController.guardarConversionConUsuario = async (req, idUsuario, textoOriginal, textoCifrado, algoritmo) => {
  try {
    const conversionData = {
      id_usuario: idUsuario,
      texto_por_convertir_usuario: textoOriginal,
      texto_criptado_usuario: textoCifrado,
      algoritmo: algoritmo,
      clave_con_usuario: req.body['clave-cifrado'], 
      fecha_encode_con_usuario: new Date() 
    };
    const resultado = await ConversionConUsuario.create(conversionData);
    console.log('Resultado de la operación de guardado (con usuario):', resultado);

    // Obtener el último registro de conversiones_con_usuario
    const ultimoRegistroConUsuario = await ConversionConUsuario.getLastRecord();
    console.log('Último registro de conversiones_con_usuario:', ultimoRegistroConUsuario);

    return resultado;
  } catch (error) {
    console.error('Error al guardar la conversión con usuario:', error);
    throw new Error('Error al guardar la conversión con usuario');
  }
};

module.exports = guardarCifradoController;
