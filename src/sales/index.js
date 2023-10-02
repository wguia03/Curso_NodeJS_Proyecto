const express = require("express");
const { salesController } = require("./controller");
const router = express.Router();

module.exports.apiSales = (app) => {
  router
    .get("/", salesController.getSales)
    .get("/:id", salesController.getSale)
    .post("/", salesController.createSale)
    .delete("/:id", salesController.deleteSale);

  app.use("/api/sales", router);
};
