const { check } = require("express-validator");
const validateResults = require ("../utils/handleValidator");

/**
 * Esto es un Middleware para el request de Create Unidades
 */
const validatorUnidades = [
    check("id_Empresa")  //Poner mas validaciones despues
    .exists(),
    check("id_Marca")
    .exists(),
    check("id_Documento")
    .isEmpty(),
    check("id_TipoUnidad")
    .exists(),
    check("id_Candado")
    .exists(),
    check("st_PermisoSCT")
    .exists(),
    check("st_Economico")
    .exists(),
    check("i_Año")
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



module.exports = { validatorUnidades};