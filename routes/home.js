const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/session");
const { validatorUnidades, validatorGetUnidad } = require("../validators/home");
const {
  homeCtrl,
  unidadesCtrl,
  getAllUnidadesCtrl,
  getUnidadCtrl,
  docsCtrl,
  updateUnidadesCtrl
} = require("../controllers/home");

const uploadMiddleware = require("../utils/handleStorage");

/**
 * TODO: http://localhost:5000/api/home, verification bearer Token del usuario loggeado
 */
router.get("/", authMiddleware, homeCtrl);









// Create Unidad: http://localhost:5000/api/home/upload/unidad
router.post("/upload/unidad", validatorUnidades, unidadesCtrl); 

//Upload documentos de unidad: http://localhost:5000/api/home/upload/documentos
router.post("/upload/documentos",
  uploadMiddleware.fields([
    { name: "url_TarjetaCirculacion", maxCount: 1 }, 
    { name: "url_Factura", maxCount: 1 },
    { name: "url_PermisoSCT", maxCount: 1 },
  ]),
  docsCtrl
);
  
////Read all unidades: http://localhost:5000/api/home/get/unidad
router.get("/get/unidad", getAllUnidadesCtrl); 
router.get("/get/unidad/:id", validatorGetUnidad, getUnidadCtrl); //read Unidad
router.put("/update/unidad/:id", validatorGetUnidad, validatorUnidades,  updateUnidadesCtrl)

module.exports = router;
