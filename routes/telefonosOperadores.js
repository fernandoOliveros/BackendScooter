const express = require("express");
const router = express.Router();
const {validatorReadTelefonoOperador, validatorTelefonosOperadores } = require("../validators/telefonosOperadores")
const {
  createTelefonoCtrl,
  updateTelefonoCtrl,
  readTelefonoCtrl,
  readAllTelefonosCtrl,
  deleteTelefonoCtrl,
} = require("../controllers/telefonosOperadores");

/**
 * RUTAS
Create Telefono: http://localhost:5000/api/telefonosOperadores/create
Read All Telefonos: http://localhost:5000/api/telefonosOperadores/read
Read One Tel: http://localhost:5000/api/telefonosOperadores/read/:id
Update Tel: http://localhost:5000/api/telefonosOperadores/update/:id
Delete Tel: http://localhost:5000/api/telefonosOperadores/delete/:id
 */

router.post("/create", validatorTelefonosOperadores, createTelefonoCtrl);
router.get("/read", readAllTelefonosCtrl);
router.get("/read/:id", validatorReadTelefonoOperador, readTelefonoCtrl);
router.put(
  "/update/:id",
  validatorReadTelefonoOperador,
  validatorTelefonosOperadores,
  updateTelefonoCtrl
);
router.delete("/delete/:id", validatorReadTelefonoOperador, deleteTelefonoCtrl);

module.exports = router;
