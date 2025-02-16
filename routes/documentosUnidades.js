const express = require("express");
const router = express.Router();
const { validatorReadDocumento } = require("../validators/documentos"); //BORRAR
const {
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  saveDocumentosCtrl,
  updateNew
} = require("../controllers/documentosUnidades");

const { uploadMiddleware } = require("../utils/handleDocumentosUnidades");
const { authMiddleware } = require("../middleware/session");

/**
 * RUTAS - DOCUMENTOS DE UNIDAD
  Create documento: /api/documentosUnidades/create
  Read All documentos: /api/documentosUnidades/read
  Read One documento: /api/documentosUnidades/read/:id
  Update documento: /api/documentosUnidades/update/:id
  Delete documento: /api/documentosUnidades/delete/:id
 */

const uploadDocsMiddleware = uploadMiddleware.fields([
  { name: "url_TarjetaCirculacion", maxCount: 1 },
  { name: "url_Factura", maxCount: 1 },
  { name: "url_PermisoSCT", maxCount: 1 }
]);

router.post("/create", uploadDocsMiddleware, authMiddleware, saveDocumentosCtrl);
router.get("/read", readAllDocumentosCtrl);
router.get("/read/:id", readDocumentoCtrl);
router.put("/update/:id", uploadDocsMiddleware,authMiddleware, updateNew);
router.delete("/delete/:id", authMiddleware, validatorReadDocumento, deleteDocumentosCtrl);

module.exports = router;
