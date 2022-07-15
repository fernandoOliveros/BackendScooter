const express = require("express");
const router = express.Router();
const { validatorReadDocumento } = require("../validators/documentos");
const {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
} = require("../controllers/documentos");

const uploadMiddleware = require("../utils/handleDocumentos");

/**
 * RUTAS - DOCUMENTOS DE UNIDAD
Create documento: http://localhost:5000/api/documentos/create
Read All documentos: http://localhost:5000/api/documentos/read
Read One documento: http://localhost:5000/api/documentos/read/:id
Update documento: http://localhost:5000/api/documentos/update/:id
Delete documento: http://localhost:5000/api/documentos/delete/:id
 */

const uploadDocsMiddleware = uploadMiddleware.fields([
  { name: "url_TarjetaCirculacion", maxCount: 1 },
  { name: "url_Factura", maxCount: 1 },
  { name: "url_PermisoSCT", maxCount: 1 },
]);

router.post("/create", uploadDocsMiddleware, createDocumentosCtrl);
router.get("/read", readAllDocumentosCtrl); 
router.get("/read/:id", validatorReadDocumento, readDocumentoCtrl); 
router.put("/update/:id", validatorReadDocumento, uploadDocsMiddleware, updateDocumentosCtrl);
router.delete("/delete/:id", validatorReadDocumento, deleteDocumentosCtrl);

module.exports = router;
