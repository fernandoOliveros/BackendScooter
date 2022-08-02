const express = require("express");
const router = express.Router();
const { validatorReadDocumento } = require("../validators/documentos");
const {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
} = require("../controllers/documentosOperadores");

const uploadMiddleware = require("../utils/handleDocumentosOperadores");
 
/**
 * RUTAS - DOCUMENTOS DE UNIDAD
Create documento: http://localhost:5000/api/documentosOperadores/create
Read All documentos: http://localhost:5000/api/documentosOperadores/read
Read One documento: http://localhost:5000/api/documentosOperadores/read/:id
Update documento: http://localhost:5000/api/documentosOperadores/update/:id
Delete documento: http://localhost:5000/api/documentosOperadores/delete/:id
 */

const uploadDocsMiddleware = uploadMiddleware.fields([
  { name: "url_SolicitudEmpleo", maxCount: 1 },
  { name: "url_CURP", maxCount: 1 },
  { name: "url_RFC", maxCount: 1 },
  { name: "url_ComprobanteDom", maxCount: 1 },
]);
 
router.post("/create", uploadDocsMiddleware, createDocumentosCtrl);
router.get("/read", readAllDocumentosCtrl);
router.get("/read/:id", validatorReadDocumento, readDocumentoCtrl);
router.put(
  "/update/:id",
  validatorReadDocumento,
  uploadDocsMiddleware,
  updateDocumentosCtrl
);
router.delete("/delete/:id", validatorReadDocumento, deleteDocumentosCtrl);

module.exports = router;