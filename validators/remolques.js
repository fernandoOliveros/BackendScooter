const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Remolques
 */
const validatorRemolque = [
  check("id_Remolque").isEmpty(),
  check("id_Empresa").exists(),
  check("st_Anio").exists(),
  check("st_Marca").exists(),
  check("st_NumSerie").exists(),
  check("date_VigenciaFM").exists(),
  check("i_Status").exists(),
  check("id_TipoRemolque").exists(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = { validatorRemolque };
