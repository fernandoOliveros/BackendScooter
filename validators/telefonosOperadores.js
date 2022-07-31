const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Unidades
 */
const validatorTelefonosOperadores = [
  check("id_NumTelefono").isEmpty(),
  check("id_Categoria").exists(),
  check("id_Operador").exists(),
  check("st_NumTelefono").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReadTelefonoOperador = [
  check("id").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorTelefonosOperadores,
  validatorReadTelefonoOperador,
};
