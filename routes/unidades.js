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
  readTiposPermisosSCTCtrl
} = require("../controllers/unidades");
const { authMiddleware } = require("../middleware/session");

/*
 * RUTAS
  Create Unidad: http://localhost:5000/api/unidades/create
  Read All Unidades: http://localhost:5000/api/unidades/read
  Read One Unidad: http://localhost:5000/api/unidades/read/:id
  Update Unidad: http://localhost:5000/api/unidades/update/:id
  Delete Unidad: http://localhost:5000/api/unidades/delete/:id
*/

router.post("/create", validatorUnidades, authMiddleware, createUnidadCtrl);
router.get("/read", readAllUnidadesCtrl);
router.get("/read/:id", readUnidadCtrl);
router.get("/readTiposPermisosSCT", readTiposPermisosSCTCtrl);

router.put( "/update/:id", validatorUnidades, authMiddleware, updateUnidadesCtrl);
router.delete("/delete/:id", validatorReadUnidad, authMiddleware, deleteUnidadCtrl);

module.exports = router;
