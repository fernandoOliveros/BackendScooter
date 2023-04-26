const express = require("express");
const router = express.Router();
const {
  validatorClientesCreate,
  validatorReadCliente,
} = require("../validators/clientes");
const {
  createclienteCtrl,
  updateclienteCtrl,
  readAllClientesCtrl,
  readclienteCtrl,
  deleteclienteCtrl,
  //readclientesEmpresaCtrl,
} = require("../controllers/clientes");

/**
 * RUTAS - ClienteES
Create documento: http://localhost:5000/api/Clientes/create
Read All Clientees: http://localhost:5000/api/Clientes/read
Read One Clientee: http://localhost:5000/api/Clientes/read/:id
Update Clientee: http://localhost:5000/api/Clientes/update/:id
Delete Clientee: http://localhost:5000/api/Clientes/delete/:id
 */


router.post("/create", validatorClientesCreate, createclienteCtrl);
router.get("/read", readAllClientesCtrl);
router.get("/read/:id", validatorReadCliente, readclienteCtrl);
router.put(
  "/update/:id",
  [validatorClientesCreate, validatorReadCliente],
  updateclienteCtrl
);
router.delete("/delete/:id", validatorReadCliente, deleteclienteCtrl);

module.exports = router;
