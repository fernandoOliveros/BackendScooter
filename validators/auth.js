const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**
 * Esto es un Middleware
 */
const validatorRegister = [
  check("id_User").isEmpty(),
  check("id_Empresa").isNumeric(),
  check("st_Nombre")
    .exists() //comrpueba si existe
    .notEmpty() //asegura que no esté vacío
    .isLength({ min: 2, max: 30 }),
  check("i_Edad").exists().notEmpty().isNumeric(), //se puede calcular si el usuario pone su fecha de nacimiento
  check("st_Password").exists().notEmpty(), // Debe concordar con el tipo de dato de Modelos/users
  check("st_Email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  //Es un array []
  check("st_Password").exists().notEmpty(), //aqui se pueden poner mas condiciones para el password del user
  check("st_Email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin }; // entre llaves porque es un array
