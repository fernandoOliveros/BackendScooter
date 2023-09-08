const express = require("express");
const router = express.Router();
const {
  validatorViajes,
  validatorReadViaje,
} = require("../validators/viajes");
const {
  readViajeEmpresaCtrl,
  createViajeCtrl,
  readAllViajesCtrl,
  readViajeCtrl,
  updateViajesCtrl,
  deleteViajeCtrl,
} = require("../controllers/Viajes");

/**
 * RUTAS
Create Viaje: http://localhost:5000/api/Viajes/create
Read All Viajes: http://localhost:5000/api/Viajes/read
Read One Viaje: http://localhost:5000/api/Viajes/read/:id
Update Viaje: http://localhost:5000/api/Viajes/update/:id
Delete Viaje: http://localhost:5000/api/Viajes/delete/:id
 */

router.post("/create", validatorViajes, createViajeCtrl);
//router.get("/read", readAllViajesCtrl);
//router.get("/read/:id", readViajeCtrl);
router.get("/readByEmpresa/:id", readViajeEmpresaCtrl);

router.put(
  "/update/:id",
  //validatorReadViaje,
  validatorViajes,
  updateViajesCtrl
);
router.delete("/delete/:id", validatorReadViaje, deleteViajeCtrl);

module.exports = router;
