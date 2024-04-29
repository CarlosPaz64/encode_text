const pool = require('./initial_connection');

const ConversionSinUsuario = {
  // Función para crear un nuevo registro en la tabla conversiones_sin_usuario
  create: async (conversionData) => {
    try {
      const results = await pool.query('INSERT INTO conversiones_sin_usuario SET ?', conversionData);
      return results;
    } catch (error) {
      throw error;
    }
  },
  // Función para obtener el último registro de la tabla conversiones_sin_usuario
  getLastRecord: async () => {
    try {
      const results = await pool.query('SELECT * FROM conversiones_sin_usuario ORDER BY id DESC LIMIT 1');
      return results[0];
    } catch (error) {
      throw error;
    }
  }
};

const ConversionConUsuario = {
  // Función para crear un nuevo registro en la tabla conversiones_con_usuario
  create: async (conversionData) => {
    try {
      const results = await pool.query('INSERT INTO conversiones_con_usuario SET ?', conversionData);
      return results;
    } catch (error) {
      throw error;
    }
  },
  // Función para obtener el último registro de la tabla conversiones_con_usuario
  getLastRecord: async () => {
    try {
      const results = await pool.query('SELECT * FROM conversiones_con_usuario ORDER BY id DESC LIMIT 1');
      return results[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { ConversionSinUsuario, ConversionConUsuario };
