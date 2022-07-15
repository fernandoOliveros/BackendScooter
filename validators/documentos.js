const { check } = require("express-validator");
const validateResults = require ("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Unidades
 */

const validatorReadDocumento = [
    check("id").exists(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorReadDocumento};