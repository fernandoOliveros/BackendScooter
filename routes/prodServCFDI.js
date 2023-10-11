const express = require("express");
const router = express.Router();



const {
  createProdServCFDICtrl,
  readAllByEmpresaProdServCFDICtrl,
  //   readAllCFDICtrl,
//   readCFDICtrl,
   updateProdServCFDICtrl,
   deleteProdServCFDICtrl
} = require("../controllers/prodServCFDI");



/**
 * RUTAS - CFDI
 * Create CFDI: http://localhost:5000/api/prodServCFDI/create
 * Read All prodServCFDI: http://localhost:5000/api/prodServCFDI/read
 * Read One prodServCFDI: http://localhost:5000/api/prodServCFDI/read/:id
 * Update prodServCFDI: http://localhost:5000/api/prodServCFDI/update/:id
 * Delete prodServCFDI: http://localhost:5000/api/prodServCFDI/delete/:id
 */

//router.post("/create", validatorCreateCFDI, createCFDICtrl, validatorXml, createXmlCtrl);
router.post("/create", createProdServCFDICtrl);
router.get("/readAllByEmpresa/:id", readAllByEmpresaProdServCFDICtrl);
router.put("/update/:id_cfdi/:id_prodserv", updateProdServCFDICtrl);
router.delete("/delete/:id_cfdi/:id_prodserv", deleteProdServCFDICtrl);



module.exports = router;
