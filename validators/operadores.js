const { check } = require("express-validator");
const validateResults = require ("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Unidades
 */
const validatorOperadores = [
    check("id_Operador").
    isEmpty(),
    check("id_Empresa") 
    .exists(),
    check("id_TipoPuesto")
    .exists(),
    check("st_Nombre")
    .exists(),
    check("st_ApellidoP")
    .exists(),
    check("st_ApellidoM")
    .exists(),
    check("date_Nacimiento")
    .exists(),
    check("st_NumIMSS")
    .exists(),
    check("st_CURP")
    .exists(),
    check("st_NumLicencia")
    .exists(),
    check("date_Vigencia")
    .exists(),
    check("i_Status")
    .exists(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorReadOperador = [
    check("id").exists(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorOperadores, validatorReadOperador};