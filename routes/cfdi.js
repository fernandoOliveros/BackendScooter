const express = require("express");
const router = express.Router();
const {
  validatorCreateCFDI,
  //validatorReadCFDI,
} = require("../validators/cfdi");
const {
  validatorXml,
  //validatorReadCFDI,
} = require("../validators/CreateXml");



const {
  createCFDICtrl,
  readAllByEmpresaCFDICtrl,
  readCFDICtrl,
  updateCFDICtrl,
  deleteCFDICtrl,
} = require("../controllers/cfdi");


const { createXmlCtrl, createXmlCtrlFromDB } = require('../controllers/createXml');


/**
 * RUTAS - CFDI
 * Create CFDI: http://localhost:5000/api/cfdi/create
 * Read All CFDI: http://localhost:5000/api/cfdi/read
 * Read One CFDI: http://localhost:5000/api/cfdi/read/:id
 * Update CFDI: http://localhost:5000/api/cfdi/update/:id
 * Delete CFDI: http://localhost:5000/api/cfdi/delete/:id
 */

//router.post("/create", validatorCreateCFDI, createCFDICtrl, validatorXml, createXmlCtrl);
router.post("/create", validatorCreateCFDI, createCFDICtrl);

router.get("/create/:id", createXmlCtrlFromDB);


router.get("/readAllByEmpresa/:id", readAllByEmpresaCFDICtrl);
//router.get("/read/:id", validatorReadCFDI, readCFDICtrl);
router.put("/update/:id", updateCFDICtrl);
//router.delete("/delete/:id", validatorReadCFDI, deleteCFDICtrl);

module.exports = router;
