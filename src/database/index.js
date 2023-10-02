const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");

const { Config } = require("../config/index");

var connection = null;

module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        // en caso no exista una conexión creamos una nueva, así evitamos crear múltiples conexiones
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();
        debug("Nueva conexión realizada con MongoDB Atlas");
      }
      debug("Reutilizando conexión");
      const db = connection.db("inventario");
      resolve(db.collection(collection));
    } catch (error) {
      console.log("error en db_connection");
      reject(error);
    }
  });
