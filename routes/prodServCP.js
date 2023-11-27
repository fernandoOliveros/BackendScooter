const express = require("express");
const router = express.Router();



const {
  createProdServCPCtrl,
  readAllByEmpresaProdServCPCtrl,
  //   readAllCFDICtrl,
//   readCFDICtrl,
   updateProdServCPCtrl,
   deleteProdServCPCtrl
} = require("../controllers/ProdServCP");



/**
 * RUTAS - CFDI
 * Create CFDI: http://localhost:5000/api/ProdServCP/create
 * Read All ProdServCP: http://localhost:5000/api/ProdServCP/read
 * Read One ProdServCP: http://localhost:5000/api/ProdServCP/read/:id
 * Update ProdServCP: http://localhost:5000/api/ProdServCP/update/:id
 * Delete ProdServCP: http://localhost:5000/api/ProdServCP/delete/:id
 */

//router.post("/create", validatorCreateCFDI, createCFDICtrl, validatorXml, createXmlCtrl);
router.post("/create", createProdServCPCtrl);
router.get("/readAllByEmpresa/:id", readAllByEmpresaProdServCPCtrl);
router.put("/update/:id_CartaPorte/:id_prodserv", updateProdServCPCtrl);
router.delete("/delete/:id_CartaPorte/:id_prodserv", deleteProdServCPCtrl);



module.exports = router;
