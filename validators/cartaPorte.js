const { sequelize } = require("../config/mysql");
const { DataTypes } = require("sequelize");
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const {viajeModel, cfdiModel, cartaPorteModel} = require("../models/index")

const validateCartaporte = [
  check("id_Viaje").exists(),
  check("id_CFDI").optional({checkFalsy: true}).isInt(),
  check("folio_int_cp").optional().exists(),
  check("i_NumTotalMercancias").optional(),
  check("st_LugarExpedicion").optional().exists(), //CHECK THIS ONE CUZ IY MIGHT GET DELETED
  check("st_Version").optional().exists(), 
  check("dec_TotalDistRec").optional().exists(), 
  check("dec_PesoBrutoTotalMercancias").optional().exists(), 
  check("id_UnidadPeso").optional().exists(), 
  check("id_AseguraMedAmbiente").optional().exists(), 
  check("id_AseguraCarga").optional().exists(), 
  check("st_PolizaMedAmbiente").optional().exists(), 
  check("st_AseguraCarga").optional().exists(), 
  check("dec_PesoBrutoVehicular").optional().exists(), 

  



  

  
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
  
module.exports = { validateCartaporte };
