const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Unidades
 */
const validatorOperadores = [
  check("id_Operador").isEmpty(),
  check("id_Empresa").exists(),
  check("id_TipoPuesto").exists(),
  check("st_Nombre").exists().isString(),
  check("st_ApellidoP").exists(), 
  check("st_ApellidoM").exists(),
  check("date_Nacimiento").exists(),
  check("st_NumIMSS").optional({checkFalsy: true}), //varch( 11)
  /**nullable: if true, fields with null values will be considered optional
  checkFalsy: if true, fields with falsy values (eg "", 0, false, null) will also be considered optional */
  check("st_CURP").exists(), //varch( 18)
  check("st_RFC").optional({checkFalsy: true}), //varch( 13) //checkfalsy
  check("st_NumLicencia").exists(),
  check("date_LicenciaVigencia").exists(),
  check("i_Status").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReadOperador = [
  check("id").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorOperadores, validatorReadOperador };
