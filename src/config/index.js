require("dotenv").config(); // el módulo 'dotenv' toma las variables de entorno definidas en '.env' y los carga en el objeto 'process.env' para poder acceder a ellas

module.exports.Config = {
  // Esta parte del código exporta un objeto Config que contiene una propiedad 'port'
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
};
