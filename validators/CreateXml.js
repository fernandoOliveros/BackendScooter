const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware
 */
const validatorXml = [
  
  check("st_RFC")
    .exists() //comrpueba si existe
    //.notEmpty() //asegura que no esté vacío
    //.isLength({ min: 2, max: 30 })
    ,
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = {validatorXml }; // entre llaves porque es un array
