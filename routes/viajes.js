const express = require("express");
const router = express.Router();
const {
  validatorViajes,
  validatorReadViaje,
} = require("../validators/viajes");
const {
  readViajeEmpresaCtrl,
  createViajeCtrl,
  //readAllViajesCtrl,
  readViajeCtrl,
  updateViajesCtrl,
  deleteViajeCtrl,
  getLatestFolio,
  readViajeActivoEmpresaCtrl
} = require("../controllers/viajes");

/**
 * RUTAS
Create Viaje: http://localhost:5000/api/Viajes/create
Read All Viajes: http://localhost:5000/api/Viajes/read
Read One Viaje: http://localhost:5000/api/Viajes/read/:id
Update Viaje: http://localhost:5000/api/Viajes/update/:id
Delete Viaje: http://localhost:5000/api/Viajes/delete/:id
read only one viaje: http://localhost:5000/api/viajes/read/4
 */

router.post("/create", validatorViajes, createViajeCtrl);
//router.get("/read", readAllViajesCtrl);
router.get("/read/:id", readViajeCtrl);
router.get("/readByEmpresa/:id", readViajeEmpresaCtrl);

router.get("/getLatestFolio/:id", getLatestFolio); //send id of the enterprise you want the latest folio from
router.get("/readActivosByEmpresa/:id", readViajeActivoEmpresaCtrl);



router.put(
  "/update/:id",
  //validatorReadViaje,
  validatorViajes,
  updateViajesCtrl
);
router.delete("/delete/:id", validatorReadViaje, deleteViajeCtrl);


module.exports = router;
