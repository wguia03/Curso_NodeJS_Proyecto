// la respuesta debe ser fija para la comunicación con el frontend, por ello se crea este módulo

const createError = require("http-errors"); // solo maneja errores

module.exports.Response = {
  // establecemos valores por defecto en las operaciones exitosas
  success: (res, status = 200, message = "Ok", body = {}) => {
    res.status(status).json({ message, body });
  },
  error: (res, error = null) => {
    const { statusCode, message } = error // si no se proporciona un error se crea un nuevo 'InternalServerError' y se extraen las propiedades correspondientes
      ? error
      : new createError.InternalServerError();
    res.status(statusCode).json(message);
  },
};
