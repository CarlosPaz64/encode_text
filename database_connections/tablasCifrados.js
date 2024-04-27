const pool = require('./initial_connection');

const ConversionSinUsuario = {
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
  }
};

const ConversionConUsuario = {
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
    }
  };

  module.exports = { ConversionSinUsuario, ConversionConUsuario };