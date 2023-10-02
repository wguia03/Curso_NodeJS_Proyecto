const express = require("express");
const { productsController } = require("./controller");
const router = express.Router();

// definimos 'apiProducts' como una propiedad del objeto 'module.exports' que vamos a exportar
module.exports.apiProducts = (app) => {
  router
    .get("/", productsController.getProducts)
    .get("/report", productsController.generateReport) // la posición de esta ruta es importante, ya que si lo ponemos depués del get_id nos dará un error
    .get("/:id", productsController.getProduct)
    .post("/", productsController.createProduct)
    .put("/:id", productsController.updateProduct) // 'put' es para modificar un elemento
    .delete("/:id", productsController.deleteProduct);

  app.use("/api/products", router);
};
