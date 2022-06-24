const {check} = require("express-validator");
const validateResults = require('../utils/handleValidator');


/**
 * Esto es un Middleware
 */
const validatorRegister = [ //Es un array []
    check("name")
    .exists() //comrpueba si existe
    .notEmpty()//asegura que no esté vacío
    .isLength({min: 2, max:30}),  
    check("age")
    .exists()
    .notEmpty()
    .isNumeric(),  //se puede calcular si el usuario pone su fecha de nacimiento
    check("password")
    .exists()
    .notEmpty()
    .isNumeric(), 
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLogin = [ //Es un array []
    check("password").
    exists().
    notEmpty(),  //aqui se pueden poner mas condiciones para el password del user
    check("email").
    exists().
    notEmpty()
    .isEmail, 
    (req, res, next) =>{
        return validateResults(req, res, next)
    }
];

module.exports= { validatorRegister, validatorLogin }; // entre llaves porque es un array