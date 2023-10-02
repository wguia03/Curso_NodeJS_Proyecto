const express = require("express");
const { usersController } = require("./controller");
const router = express.Router();

// definimos 'apiProducts' como una propiedad del objeto 'module.exports' que vamos a exportar
module.exports.apiUsers = (app) => {
  router
    .get("/", usersController.getUsers)
    .get("/:id", usersController.getUser)
    .post("/", usersController.createUser)
    .put("/:id", usersController.updateUser) // 'put' es para modificar un elemento
    .delete("/:id", usersController.deleteUser);

  app.use("/api/users", router);
};
