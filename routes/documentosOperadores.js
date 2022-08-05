const express = require("express");
const router = express.Router();
const { validatorReadDocumento } = require("../validators/documentos");
const {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  updateNewNameDocsCtrl,
  readDataToUpdateCtrl,

} = require("../controllers/documentosOperadores");

const uploadMiddleware = require("../utils/handleDocumentosOperadores");
const updateMiddleware = require("../utils/handleUpdateDocumentosOperadores");

 
/**
 * RUTAS - DOCUMENTOS DE OPERADORES
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

const updateDocsMiddleware = updateMiddleware.fields([
  { name: "url_SolicitudEmpleo", maxCount: 1 },
  { name: "url_CURP", maxCount: 1 },
  { name: "url_RFC", maxCount: 1 },
  { name: "url_ComprobanteDom", maxCount: 1 },
]);

router.post(
  "/create",
  createDocumentosCtrl, //works as a middleware
  uploadDocsMiddleware,
  updateNewNameDocsCtrl
);
router.get("/read", readAllDocumentosCtrl);
router.get("/read/:id", validatorReadDocumento, readDocumentoCtrl);

router.put(
  "/update/:id",
  validatorReadDocumento,
  readDataToUpdateCtrl,
  uploadDocsMiddleware,
  updateDocumentosCtrl
);
router.delete("/delete/:id", validatorReadDocumento, deleteDocumentosCtrl);

module.exports = router;
