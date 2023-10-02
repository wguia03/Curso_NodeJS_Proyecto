// en este módulo se controlan los errores de las funciones declaradas en 'service.js'

const debug = require("debug")("app:module-products-controller"); // los erroes de este modulo aparecerán con este texto
const { ProductsService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.productsController = {
  getProducts: async (req, res) => {
    try {
      // usamos 'await' ya que el método 'getAll' es asíncrono y luego colocamos async en la función, ya que estamos trabajando con un 'await'
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de productos", products); // operación exitosa
    } catch (error) {
      debug(error);
      Response.error(res); // operación fallida
    }
  },
  getProduct: async (req, res) => {
    // res.send({ message: "Hola amigos" }); // para probar si funciona la ruta
    try {
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound()); // Producto no existe / no olvidarse del 'new'
      } else {
        Response.success(res, 200, `Producto ${id}`, product); // operación exitosa
      }
    } catch (error) {
      debug(error);
      Response.error(res); // operación fallida
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body) === 0) {
        // si el cuerpo es vacío o no tiene claves
        Response.error(res, new createError.BadRequest()); // operación fallida
      } else {
        insertedId = await ProductsService.create(body); // con esto garantizamos que la respuesta devolverá el 'id', ya que 'await' pausa la ejecución hasta que se complete esta línea de código
        Response.success(res, 200, "Producto creado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res); // operación fallida
    }
  },
  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      if (!body || Object.keys(body) === 0) {
        // si el cuerpo es vacío o no tiene claves
        Response.error(res, new createError.BadRequest());
      }

      let product = await ProductsService.updateProduct(id, body); // reemplazo del documento (devuelve el objeto)
      if (!product) {
        Response.error(res, new createError.NotFound()); // producto no existe / no olvidarse del 'new'
        // console.log(typeof id_final); // se usa para verificar si la operación fue exitosa
      } else {
        Response.success(res, 200, "Producto modificado", product); // operación exitosa
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      await ProductsService.deleteProduct(id);
      Response.success(res, 200, "Producto eliminado", id); // si ponemos 204 no se enviará contenido adicional a la respuesta
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
