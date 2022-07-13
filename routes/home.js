const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/session");
const { validatorUnidades } = require("../validators/home");
const {
  homeCtrl,
  unidadesCtrl,
  getAllUnidadesCtrl,
  getUnidadCtrl,
  docsCtrl,
} = require("../controllers/home");

const uploadMiddleware = require("../utils/handleStorage");

/**
 * TODO: http://localhost:5000/api/home, verification bearer Token del usuario loggeado
 */
router.get("/", authMiddleware, homeCtrl);

/**
 * Rutas: 
http://localhost:5000/api/home/upload/unidad
http://localhost:5000/api/home/upload/documentos
 */
router.post("/upload/unidad", validatorUnidades, unidadesCtrl); //Create Unidad

router.post("/upload/documentos", //Upload documentos de unidad
  uploadMiddleware.fields([
    { name: "url_TarjetCirculacion", maxCount: 1 }, 
    { name: "url_Factura", maxCount: 1 },
    { name: "url_PermisoSCT", maxCount: 1 },
  ]),
  docsCtrl
);

router.get("/get/unidades", getAllUnidadesCtrl); //Read all unidades
router.get("/unidades/get/:id", getUnidadCtrl); //read Unidad

module.exports = router;
