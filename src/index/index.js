const express = require("express");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.IndexApi = (app) => {
  router = express.Router();
  router.get("/", (req, res) => {
    const menu = {
      productos: `https://${req.headers.host}/api/products`,
      reporte_productos: `https://${req.headers.host}/api/products/report`,
      usuarios: `https://${req.headers.host}/api/users`,
      ventas: `https://${req.headers.host}/api/sales`,
    };
    Response.success(res, 200, "API Inventario", menu);
  });
  app.use("/", router);
};

module.exports.NotFoundApi = (app) => {
  const router = express.Router();
  router.all("*", (req, res) => {
    Response.error(res, new createError.NotFound());
  });
  app.use("/", router);
};
