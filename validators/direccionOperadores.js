const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Unidades
 */
const validatorDireccion = [
  check("id_Dir_Operador").isEmpty(),
  check("id_Operador").exists(),
  check("c_codigoPostal").exists(),
  check("id_Estado").exists(),
  check("id_Localidad").exists(),
  check("id_Municipio").exists(),
  check("id_Colonia").exists(),
  check("st_Calle").exists(),
  check("st_NoExterior").exists(),
  check("st_NoInterior").exists(),
  check("st_RefDomicilio").exists(),
  
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = { validatorDireccion };
