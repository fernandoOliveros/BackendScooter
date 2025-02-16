const express = require("express");
const router = express.Router();
const { validatorReadDocumento } = require("../validators/documentos");
const {
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  saveDocumentosCtrl,
  readDocumentosByOperador,
  updateDocuments
} = require("../controllers/documentosOperadores");

const {uploadMiddleware} = require("../utils/handleDocumentosOperadores");
const { authMiddleware } = require("../middleware/session");
 
/**
 * RUTAS - DOCUMENTOS DE OPERADORES
Create documento: http://localhost:5000/api/documentosOperadores/create
Read All documentos: http://localhost:5000/api/documentosOperadores/read
Read One documento: http://localhost:5000/api/documentosOperadores/read/:id
Update documento: http://localhost:5000/api/documentosOperadores/update/:id
Delete documento: http://localhost:5000/api/documentosOperadores/delete/:id
 */


const uploadDocsMiddleware = uploadMiddleware.fields([
  { name: "url_CURP", maxCount: 1 },
  { name: "url_RFC", maxCount: 1 },
  { name: "url_ComprobanteDom", maxCount: 1 },
]);

router.post("/create", uploadDocsMiddleware, authMiddleware, saveDocumentosCtrl);
router.get("/read", readAllDocumentosCtrl);
router.get("/read/:id", validatorReadDocumento, readDocumentoCtrl);
router.get("/readByOperador/:id", authMiddleware, validatorReadDocumento, readDocumentosByOperador);
router.put("/update/:id", uploadDocsMiddleware, authMiddleware, updateDocuments);
router.delete("/delete/:id", validatorReadDocumento, deleteDocumentosCtrl);

// router.post(
//   "/create",
//   createDocumentosCtrl, //works as a middleware
//   uploadDocsMiddleware,
//   updateNewNameDocsCtrl
// );

// router.put(
//   "/update/:id",
//   authMiddleware,
//   readDataToUpdateCtrl,
//   uploadDocsMiddleware,
//   updateDocumentosCtrl,
// );
module.exports = router;
