const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");




const validatorClientesCreate = [
  check("st_RazonSocial").exists(),
  check("st_AliasCliente").exists(),
  check("id_RegimenFiscal").exists(),
  check("st_RFC").exists().isLength({ max: 13 }).withMessage("The st_RFC value must be no longer than 13 characters."),
  check("i_Status").exists(),
  check("st_PersonaRepresenta").optional({checkFalsy: true}).isString(),
  check("st_Celular").optional({checkFalsy: true}).isString().isLength({ max: 15 }),
  check("st_Correo").optional({checkFalsy: true}).isEmail(),
  check("id_Empresa").optional({checkFalsy: true}).isInt(),
  check("c_DomicilioFiscal").optional({checkFalsy: true}).isInt(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReadCliente = [
  check("id").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorClientesCreate, validatorReadCliente };
