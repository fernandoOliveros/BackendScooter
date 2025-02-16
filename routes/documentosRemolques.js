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
const { authMiddleware } = require("../middleware/session");

/**
 * RUTAS - DOCUMENTOS DE REMOLQUE
Create documento: api/documentosRemolques/create
Read All documentos: api/documentosRemolques/read
Read One documento: api/documentosRemolques/read/:id
Update documento: api/documentosRemolques/update/:id
Delete documento: api/documentosRemolques/delete/:id
 */

const uploadDocsMiddleware = uploadMiddleware.fields([
  { name: "url_TarjetaCirculacion", maxCount: 1 },
  { name: "url_Factura", maxCount: 1 },
  { name: "url_PermisoSCT", maxCount: 1 },
]);

router.post( "/create", uploadDocsMiddleware, authMiddleware, createDocumentosCtrl);
router.get("/read", readAllDocumentosCtrl);
router.get("/read/:id", readDocumentoCtrl);
router.put("/update/:id",uploadDocsMiddleware, authMiddleware, updateDocumentosCtrl);
router.delete("/delete/:id", deleteDocumentosCtrl);

module.exports = router;


