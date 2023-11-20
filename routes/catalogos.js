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
  readAseguradoraCtrl,
  readRegimenFiscalCFDICtrl,
  readProdServicioCPCtrl,
  readMaterialesPeligrososCtrl,
  readEmbalajesCtrl,
  readUnidadPesoCPCtrl, //checar
  readTipoImpuestosCtrl,
  readObjetoImpuestoCtrl,
  readTipoFactorCtrl,
} = require("../controllers/catalogos");

/**
 * RUTAS
Create Unidad: http://localhost:5000/api/catalogos/readMoneda

Create Unidad: http://localhost:5000/api/catalogos/readFormaPago
Create Unidad: http://localhost:5000/api/catalogos/readMetodosPago
Read productos y servicios para CFDI: http://localhost:5000/api/catalogos/readProdServicioCFDI
Read aLl cat regimen fiscal: http://localhost:5000/api/catalogos/readRegimenFiscalCFDI
http://localhost:5000/api/catalogos/readAseguradoraCtrl

http://localhost:5000/api/catalogos/readUnidadPesoCFDI
http://localhost:5000/api/catalogos/readUsoCFDI
 */

router.get("/readMoneda/", readMonedasCtrl);
router.get("/readFormasPago/", readFormasPagoCtrl);
router.get("/readMetodosPago/", readMetodosPagoCtrl);
router.get("/readProdServicioCFDI/", readProdServicioCFDICtrl);
router.get("/readProdServicioCP/", readProdServicioCPCtrl);

router.get("/readUnidadPesoCFDI/", readUnidadPesoCFDICtrl);
//router.get("/readUnidadPesoCP/", readUnidadPesoCPCtrl);

router.get("/readUsoCFDI/", readUsosCFDICtrl);
router.get("/readRegimenFiscalCFDI/", readRegimenFiscalCFDICtrl);
router.get("/readMaterialesPeligrosos/", readMaterialesPeligrososCtrl);
router.get("/readEmbalajes/", readEmbalajesCtrl);
router.get("/readTipoImpuestos/", readTipoImpuestosCtrl);
router.get("/readObjetoImpuesto/", readObjetoImpuestoCtrl);
router.get("/readTipoFactor/", readTipoFactorCtrl);
router.get("/readAseguradora/", readAseguradoraCtrl);

module.exports = router;
