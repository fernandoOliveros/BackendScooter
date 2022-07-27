const { check } = require("express-validator");
const validateResults = require ("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create, read, update, delete Unidades
 */
const validatorUnidades = [
    check("id_Unidad").
    isEmpty(),
    check("id_Empresa") 
    .exists(),
    check("id_TipoUnidad")
    .exists(),
    check("id_Candado")
    .exists(),
    check("st_Marca")
    .exists(),
    check("st_SubMarca")
    .exists(),
    check("st_PermisoSCT")
    .exists(),
    check("st_Economico")
    .exists(),
    check("st_Anio")
    .exists(),
    check("st_Placa")
    .exists(),
    check("st_NumMotor")
    .exists(),
    check("st_NumSerie")
    .exists(),
    check("st_NumPoliza")
    .exists(),
    check("date_Mecanico")
    .exists(),
    check("date_Ecologico")
    .exists(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorReadUnidad = [
    check("id").exists(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorUnidades, validatorReadUnidad};