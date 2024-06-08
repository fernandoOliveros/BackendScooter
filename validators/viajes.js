const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");



/**
 * Esto es un Middleware para el request de Create, read, update, delete Viajees
 */
const validatorViajes = [
  check("id_Viaje").isEmpty(),
  check("id_Cliente").exists(),
  check("folio_int_viaje").exists(),
  check("id_TipoViaje").exists(),
  check("id_Unidad").exists(),
  check("id_Operador").exists(),
  // check("id_Remolque").exists(),
  check("i_km_totales").exists(),
  check("id_Empresa").exists(),
  check("id_StatusViaje").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReadViaje = [
  check("id").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorViajes, validatorReadViaje };
