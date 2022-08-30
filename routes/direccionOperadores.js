const express = require("express");
const router = express.Router();
const {
  validatorDireccion,
} = require("../validators/direccionOperadores");
const {
  createDireccionCtrl,
  readAllDireccionesCtrl,
  readDireccionCtrl,
  updateDireccionCtrl,
  deleteDireccionCtrl,
  getByCPCtrl,
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
router.get("/read/:id", readDireccionCtrl);
router.put("/update/:id", validatorDireccion, updateDireccionCtrl);
router.delete(
  "/delete/:id",
  deleteDireccionCtrl
);
router.get("/getByCP/:CP", getByCPCtrl);

module.exports = router;
