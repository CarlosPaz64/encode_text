const pool = require('./initial_connection');

const ConversionSinUsuario = {
  // Función para crear un nuevo registro en la tabla conversiones_sin_usuario
  create: (conversionData) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO conversiones_sin_usuario SET ?', conversionData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  // Función para obtener el último registro de la tabla conversiones_sin_usuario
  getLastRecord: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM conversiones_sin_usuario ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
};

const ConversionConUsuario = {
  // Función para crear un nuevo registro en la tabla conversiones_con_usuario
  create: (conversionData) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO conversiones_con_usuario SET ?', conversionData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  // Función para obtener el último registro de la tabla conversiones_con_usuario
  getLastRecord: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM conversiones_con_usuario ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
};

module.exports = { ConversionSinUsuario, ConversionConUsuario };
