const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Contactos de emergencia de los operadores
 */
const validatorContactosEmOperadores = [
  check("id_ContactoEm").isEmpty(),
  check("id_Operador").exists(),
  check("st_Nombre").exists(),
  check("st_NumTelefono").exists(),
  check("st_Parentesco").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReadContactoEmOperador = [
  check("id").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorContactosEmOperadores,
  validatorReadContactoEmOperador,
};
