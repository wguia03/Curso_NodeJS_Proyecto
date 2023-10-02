// en este módulo se controlan los errores de las funciones declaradas en 'service.js'

const debug = require("debug")("app:module-users-controller"); // los erroes de este modulo aparecerán con este texto
const { UsersService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.usersController = {
  getUsers: async (req, res) => {
    try {
      // usamos 'await' ya que el método 'getAll' es asíncrono y luego colocamos async en la función, ya que estamos trabajando con un 'await'
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de usuarios", users); // operación exitosa
    } catch (error) {
      debug(error);
      Response.error(res); // operación fallida
    }
  },
  getUser: async (req, res) => {
    // res.send({ message: "Hola amigos" }); // para probar si funciona la ruta
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound()); // Producto no existe / no olvidarse del 'new'
      } else {
        Response.success(res, 200, `Usuario ${id}`, user); // operación exitosa
      }
    } catch (error) {
      debug(error);
      Response.error(res); // operación fallida
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body) === 0) {
        // si el cuerpo es vacío o no tiene claves
        Response.error(res, new createError.BadRequest()); // operación fallida
      } else {
        insertedId = await UsersService.createUser(body); // con esto garantizamos que la respuesta devolverá el 'id', ya que 'await' pausa la ejecución hasta que se complete esta línea de código
        Response.success(res, 200, "Usuario creado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res); // operación fallida
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      if (!body || Object.keys(body) === 0) {
        // si el cuerpo es vacío o no tiene claves
        Response.error(res, new createError.BadRequest());
      }

      let user = await UsersService.updateUser(id, body); // reemplazo del documento (devuelve el objeto)
      if (!user) {
        Response.error(res, new createError.NotFound()); // user no existe / no olvidarse del 'new'
        // console.log(typeof id_final); // se usa para verificar si la operación fue exitosa
      } else {
        Response.success(res, 200, "usuario modificado", user); // operación exitosa
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      await UsersService.deleteUser(id);
      Response.success(res, 200, "Usuario eliminado", id); // si ponemos 204 no se enviará contenido adicional a la respuesta
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
