const debug = require("debug")("app:main"); // main es opcional, puede ser cualquier texto
const express = require("express");
const { apiProducts } = require("./src/products/index"); // en la desestructuración se extraen propiedades específicas de un objeto y se asignan a variables con los mismos nombres
const { apiUsers } = require("./src/users/index");
const { apiSales } = require("./src/sales/index");
const { IndexApi, NotFoundApi } = require("./src/index/index");

const { Config } = require("./src/config"); // ctrl + espacio dentro de los corchetes para autocompletar luego de escribir el 'require'

const app = express();

app.use(express.json()); // permite recibir datos en el cuerpo de la petición (req) del cliente

IndexApi(app);
apiProducts(app);
apiUsers(app);
apiSales(app);
NotFoundApi(app); // esto siempre va al final

app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`); // 'debug' actúa como el 'console.log'
});
