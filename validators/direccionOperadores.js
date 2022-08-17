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
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReadDireccion = [
  check("id").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorDireccion, validatorReadDireccion };
