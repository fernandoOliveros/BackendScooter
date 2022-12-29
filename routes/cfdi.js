const express = require("express");
const router = express.Router();

const {
  readMonedasCtrl,
  readFormasPagoCtrl,
  readMetodosPagoCtrl,
  readProdServicioCFDICtrl,
  readUnidadPesoCFDICtrl,
  readUsosCFDICtrl,
  timbrarCFDICtrl

} = require("../controllers/cfdi");

/**
 * RUTAS
Create Unidad: http://localhost:5000/api/cfdi/readMoneda
Create Unidad: http://localhost:5000/api/cfdi/readFormaPago
Create Unidad: http://localhost:5000/api/cfdi/readMetodosPago
Create Unidad: http://localhost:5000/api/cfdi/readProdServicioCFDI
Create Unidad: http://localhost:5000/api/cfdi/timbrarCFDI

 */

router.get("/readMoneda/", readMonedasCtrl);
router.get("/readFormasPago/", readFormasPagoCtrl);
router.get("/readMetodosPago/", readMetodosPagoCtrl);
router.get("/readProdServicioCFDI/", readProdServicioCFDICtrl);
router.get("/readUnidadPesoCFDI/", readUnidadPesoCFDICtrl);
router.get("/readUsoCFDI/", readUsosCFDICtrl);
router.post("/timbrarCFDI/", timbrarCFDICtrl );




module.exports = router;
