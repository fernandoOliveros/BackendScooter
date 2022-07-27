const express = require("express");
const router = express.Router();
const {
  validatorOperadores,
  validatorReadOperador,
} = require("../validators/operadores");
const {
  createOperadorCtrl,
  updateOperadorCtrl,
  readAllOperadoresCtrl,
  readOperadorCtrl,
  deleteOperadorCtrl,
} = require("../controllers/operadores");

/**
 * RUTAS - OPERADORES
Create documento: http://localhost:5000/api/operadores/create
Read All operadores: http://localhost:5000/api/operadores/read
Read One operadores: http://localhost:5000/api/operadores/read/:id
Update operadores: http://localhost:5000/api/operadores/update/:id
Delete operadores: http://localhost:5000/api/operadores/delete/:id
 */

router.post("/create", validatorOperadores, createOperadorCtrl);
router.get("/read", readAllOperadoresCtrl);
router.get("/read/:id", validatorReadOperador, readOperadorCtrl);
router.put(
  "/update/:id",
  validatorReadOperador,
  validatorOperadores,
  updateOperadorCtrl
);
router.delete("/delete/:id", validatorReadOperador, deleteOperadorCtrl);

module.exports = router;
