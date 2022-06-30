const {check} = require("express-validator");
const validateResults = require('../utils/handleValidator');


/**
 * Esto es un Middleware
 */

const validatorCreateItem = [ //Es un array []
    check("name").
    exists(). //comrpueba si existe
    notEmpty(),  //asegura que no esté vacío
    check("age").
    exists().
    notEmpty(), 
    check("Id_track").
    exists().
    notEmpty(), 
    (req, res, next) =>{
        return validateResults(req, res, next)
    }
];

module.exports= { validatorCreateItem }; // entre llaves porque es un array