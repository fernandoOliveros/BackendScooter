const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware
 */
const validatorXml = [
  
  check("st_RFC")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,
  check("id_TipoComprobante")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,
    check("id_TipoMoneda")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,
    check("id_RegimenFiscal")
    .exists() 
    ,
    check("id_RegimenFiscalReceptor")
    .exists() 
    ,
    check("id_MetodoPago")
    .exists() 
    ,
    check("id_FormaPago")
    .exists() 
    ,
    check("id_UsoCFDI")
    .exists() 
    ,
    check("id_DomicilioFiscalReceptor")
    .exists() 
    ,
    
    
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = {validatorXml }; // entre llaves porque es un array
