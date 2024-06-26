const express = require("express");
const router = express.Router();
const { validatorReadDocumento } = require("../validators/documentos"); //BORRAR
const {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  updateNewNameDocsCtrl,
  readDataToUpdateCtrl
} = require("../controllers/documentosUnidades");

const { uploadMiddleware } = require("../utils/handleDocumentosUnidades");

/**
 * RUTAS - DOCUMENTOS DE UNIDAD
Create documento: http://localhost:5000/api/documentosUnidades/create
Read All documentos: http://localhost:5000/api/documentosUnidades/read
Read One documento: http://localhost:5000/api/documentosUnidades/read/:id
Update documento: http://localhost:5000/api/documentosUnidades/update/:id
Delete documento: http://localhost:5000/api/documentosUnidades/delete/:id
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
router.get("/read/:id", 
//validatorReadDocumento, 
readDocumentoCtrl);

router.put(
  "/update/:id",
  readDataToUpdateCtrl,
  uploadDocsMiddleware,
  updateDocumentosCtrl,
);
router.delete("/delete/:id", validatorReadDocumento, deleteDocumentosCtrl);

module.exports = router;
