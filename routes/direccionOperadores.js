const express = require("express");
const router = express.Router();
const {
  validatorDireccion,
  validatorReadDireccion,
} = require("../validators/direccionOperadores");
const {
  createDireccionCtrl,
  readAllDireccionesCtrl,
  readDireccionCtrl,
  updateDireccionCtrl,
  deleteDireccionCtrl,
} = require("../controllers/direccionOperadores");

/**
 * RUTAS
Create direccion: http://localhost:5000/api/direccionOperadores/create
Read All direccion: http://localhost:5000/api/direccionOperadores/read
Read One direccion: http://localhost:5000/api/direccionOperadores/read/:id
Update direccion: http://localhost:5000/api/direccionOperadores/update/:id
Delete direccion: http://localhost:5000/api/direccionOperadores/delete/:id
 */

router.post("/create", validatorDireccion, createDireccionCtrl);
router.get("/read", readAllDireccionesCtrl);
router.get("/read/:id", validatorReadDireccion, readDireccionCtrl);
router.put(
  "/update/:id",
  validatorReadDireccion,
  validatorDireccion,
  updateDireccionCtrl
);
router.delete("/delete/:id", validatorReadDireccion, deleteDireccionCtrl);

module.exports = router;