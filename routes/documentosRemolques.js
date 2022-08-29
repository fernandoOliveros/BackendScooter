const express = require("express");
const router = express.Router();
const {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  updateNewNameDocsCtrl,
  readDataToUpdateCtrl
} = require("../controllers/documentosRemolques");

const { uploadMiddleware } = require("../utils/handleDocumentosRemolques");

/**
 * RUTAS - DOCUMENTOS DE REMOLQUE
Create documento: http://localhost:5000/api/documentosRemolques/create
Read All documentos: http://localhost:5000/api/documentosRemolques/read
Read One documento: http://localhost:5000/api/documentosRemolques/read/:id
Update documento: http://localhost:5000/api/documentosRemolques/update/:id
Delete documento: http://localhost:5000/api/documentosRemolques/delete/:id
 */

const uploadDocsMiddleware = uploadMiddleware.fields([
  { name: "url_TarjetaCirculacion", maxCount: 1 },
  { name: "url_Factura", maxCount: 1 },
  { name: "url_PermisoSCT", maxCount: 1 },
]);

router.post(
  "/create",
  createDocumentosCtrl, //works as a middleware
  uploadDocsMiddleware,
  updateNewNameDocsCtrl
);

router.get("/read", readAllDocumentosCtrl);
router.get("/read/:id", readDocumentoCtrl);

router.put(
  "/update/:id",
  readDataToUpdateCtrl,
  uploadDocsMiddleware,
  updateDocumentosCtrl,
);
router.delete("/delete/:id", deleteDocumentosCtrl);

module.exports = router;


