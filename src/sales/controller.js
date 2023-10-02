const debug = require("debug")("app:module-sales-controller");
const { SalesService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");

module.exports.salesController = {
  getSales: async (req, res) => {
    try {
      let sales = await SalesService.getAll();
      Response.success(res, 200, "Lista de ventas", sales);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getSale: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let sale = await SalesService.getById(id);
      if (!sale) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Venta ${id}`, sale);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createSale: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body) === 0) {
        Response.error(res, new createError.BadRequest());
      } else if (
        !("id_user" in body && "id_product" in body && "cantidad" in body)
      ) {
        Response.error(res, new createError.BadRequest());
      } else {
        insertedId = await SalesService.createSale(body);
        if (!insertedId) {
          Response.error(res, new createError.BadRequest());
        } else {
          Response.success(res, 200, "Venta Realizada", insertedId);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  deleteSale: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      await SalesService.deleteSale(id);
      Response.success(res, 200, "Venta eliminada", id);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
