const { sequelize } = require("../config/mysql");
const { DataTypes } = require("sequelize");
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const {viajeModel, cfdiModel, cartaPorteModel} = require("../models/index")

const validateCartaporte = [
  check("id_Viaje").exists(),
  check("id_CFDI").optional({checkFalsy: true}).isInt(),
  check("folio_int_cp").exists(),
  check("i_NumTotalMercancias").exists(),
  check("st_LugarExpedicion").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
  
module.exports = { validateCartaporte };
