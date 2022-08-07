const express = require("express");
const router = express.Router();
const {
  validatorUnidades,
  validatorReadUnidad,
} = require("../validators/unidades");
const {
  createUnidadCtrl,
  readAllUnidadesCtrl,
  readUnidadCtrl,
  updateUnidadesCtrl,
  deleteUnidadCtrl,
} = require("../controllers/unidades");

/**
 * RUTAS
Create Unidad: http://localhost:5000/api/unidades/create
Read All Unidades: http://localhost:5000/api/unidades/read
Read One Unidad: http://localhost:5000/api/unidades/read/:id
Update Unidad: http://localhost:5000/api/unidades/update/:id
Delete Unidad: http://localhost:5000/api/unidades/delete/:id
 */

router.post("/create", validatorUnidades, createUnidadCtrl);
router.get("/read", readAllUnidadesCtrl);
router.get("/read/:id", validatorReadUnidad, readUnidadCtrl);
router.put(
  "/update/:id",
  //validatorReadUnidad,
  validatorUnidades,
  updateUnidadesCtrl
);
router.delete("/delete/:id", validatorReadUnidad, deleteUnidadCtrl);

module.exports = router;
