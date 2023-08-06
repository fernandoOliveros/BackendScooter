const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware
 */


const validatorXml = [
  /***VALIDATE CFDI FIELDS */
  check("st_RFC_emisor").exists(), //comrpueba si existe
  check("id_TipoComprobante").exists(), //comrpueba si existe
  check("id_Moneda").exists(), //comrpueba si existe
  check("id_RegimenFiscal_emisor").exists(),
  check("id_RegimenFiscalReceptor").exists(),
  check("id_MetodoPago").exists(),
  check("id_UsoCFDI").exists(),
  check("id_DomicilioFiscalReceptor").exists(),
  check("st_RFC_receptor").exists(), //comrpueba si existe
  check("st_nombre_receptor").exists(), //comrpueba si existe
  check("st_nombre_emisor").exists(), //comrpueba si existe
  check("id_ObjetoImp").exists(), //comrpueba si existe
  check("i_Importe").exists(), //comrpueba si existe
  check("dec_TotalDistRec").exists(), //CHECAR QUE SEA DECIMAL
  /***VALIDATE CARTA PORTE FIELDS */
  
  check("Ubicaciones.0.st_RemitenteRFC").exists(), //comrpueba si existe
  check("Ubicaciones.0.date_FechaSalida").exists(), //comrpueba si existe
  check("Ubicaciones.1.st_DestinatarioRFC").exists(), //comrpueba si existe
  check("Ubicaciones.1.st_FechaHoraLlegada").exists(), //CHECAR QUE SEA DECIMAL
  (req, res, next) => {
    console.log("validatorXml test");
    return validateResults(req, res, next);
  },
];

module.exports = { validatorXml }; // entre llaves porque es un array
