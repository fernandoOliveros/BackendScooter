const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware
 */

console.log()
const validatorXml = [
  
  check("st_RFC_emisor")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,

  check("id_TipoComprobante")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,
    check("id_Moneda")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,
    check("id_RegimenFiscal_emisor")
    .exists() 
    ,
    check("id_RegimenFiscalReceptor")
    .exists() 
    ,
    check("id_MetodoPago")
    .exists() 
    ,
    //check("id_FormaPago").exists() ,
    check("id_UsoCFDI")
    .exists() 
    ,
    check("id_DomicilioFiscalReceptor")
    .exists() 
    ,

    check("st_RFC_receptor")
    .exists() //comrpueba si existe
    ,

    check("st_nombre_receptor")
    .exists() //comrpueba si existe
    ,
    check("st_nombre_emisor")
    .exists() //comrpueba si existe
    ,
    check("id_ObjetoImp")
    .exists() //comrpueba si existe
    ,
    check("i_Importe")
    .exists() //comrpueba si existe
    ,
    check("dec_TotalDistRec")
    .exists() //CHECAR QUE SEA DECIMAL
    ,
    

    check("st_RFCRemitente")
    .exists() //comrpueba si existe
    ,
    check("st_FechaHoraSalida")
    .exists() //comrpueba si existe
    ,
    check("st_RFCDestinatario")
    .exists() //comrpueba si existe
    ,
    check("st_FechaHoraLlegada")
    .exists() //CHECAR QUE SEA DECIMAL
    ,
    
    
            
    
  (req, res, next) => {
console.log("validatorXml")

    return validateResults(req, res, next);
  },
];


module.exports = {validatorXml }; // entre llaves porque es un array
