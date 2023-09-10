const express = require("express");
const router = express.Router();

const {
  readMonedasCtrl,
  readFormasPagoCtrl,
  readMetodosPagoCtrl,
  readProdServicioCFDICtrl,
  readUnidadPesoCFDICtrl,
  readUsosCFDICtrl,
  //timbrarCFDICtrl,
  readRegimenFiscalCFDICtrl,
  readProdServicioCPCtrl,
  readMaterialesPeligrososCtrl,
  readEmbalajesCtrl
} = require("../controllers/catalogos");

/**
 * RUTAS
Create Unidad: http://localhost:5000/api/catalogos/readMoneda
Create Unidad: http://localhost:5000/api/catalogos/readFormaPago
Create Unidad: http://localhost:5000/api/catalogos/readMetodosPago
Read productos y servicios para CFDI: http://localhost:5000/api/catalogos/readProdServicioCFDI
Read aLl cat regimen fiscal: http://localhost:5000/api/catalogos/readRegimenFiscalCFDI
http://localhost:5000/api/catalogos/readUnidadPesoCFDI
http://localhost:5000/api/catalogos/readUsoCFDI
 */



router.get("/readMoneda/", readMonedasCtrl);
router.get("/readFormasPago/", readFormasPagoCtrl);
router.get("/readMetodosPago/", readMetodosPagoCtrl);
router.get("/readProdServicioCFDI/", readProdServicioCFDICtrl);
router.get("/readProdServicioCP/", readProdServicioCPCtrl);

router.get("/readUnidadPesoCFDI/", readUnidadPesoCFDICtrl);
router.get("/readUsoCFDI/", readUsosCFDICtrl);
router.get("/readRegimenFiscalCFDI/", readRegimenFiscalCFDICtrl );
router.get("/readMaterialesPeligrosos/", readMaterialesPeligrososCtrl);
router.get("/readEmbalajes/", readEmbalajesCtrl);









module.exports = router;
