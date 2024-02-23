const express = require("express");
const router = express.Router();



const {
  createImpuestosAgrupadosCFDICtrl,
  readImpuestosAgrupadosCFDICtrl,
   updateImpuestosAgrupadosCFDICtrl,
   deleteImpuestosAgrupadosCFDICtrl
} = require("../controllers/ImpuestosAgrupadosCFDI");



/**
 * RUTAS - CFDI
 * Create CFDI: http://localhost:5000/api/prodServCFDI/create
 * Read All prodServCFDI: http://localhost:5000/api/prodServCFDI/read
 * Read One prodServCFDI: http://localhost:5000/api/prodServCFDI/read/:id
 * Update prodServCFDI: http://localhost:5000/api/prodServCFDI/update/:id
 * Delete prodServCFDI: http://localhost:5000/api/prodServCFDI/delete/:id
 */

//router.post("/create", validatorCreateCFDI, createCFDICtrl, validatorXml, createXmlCtrl);
router.post("/create", createImpuestosAgrupadosCFDICtrl);
router.get("/read/:id", readImpuestosAgrupadosCFDICtrl);
router.put("/update/:id_CFDI/:id_TipoImpuesto/:id_TipoFactor", updateImpuestosAgrupadosCFDICtrl);
router.delete("/update/:id_CFDI/:id_TipoImpuesto/:id_TipoFactor", deleteImpuestosAgrupadosCFDICtrl);



module.exports = router;
