const { relViajeRemolqueCPModel } = require("../models");

// const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
// const { QueryTypes } = require("sequelize");


// CREATE
const createViajeRemolqueCtrl = async (req, res, next) => {
  try {  
    const body =req.body; //la data del request venga curada

    const cfdi = await relViajeRemolqueCPModel.create(body);
    handleHttpResponse(res, cfdi)
  } catch (err) {
    console.error(err);
    handleHttpError(res, "ERROR_CREATE_createViajeRemolqueCtrl")
  }
};


module.exports = {
  createViajeRemolqueCtrl,
};
