const { direccionOrigenCPModel, direccionDestinoCPModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDireccionOrigenCPCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    console.log(
      "createDireccionOrigenCPCtrl",
      body,
      "ending body"
    );
    const direccionOrigenCP = await direccionOrigenCPModel.create(body);
    //console.log("printing direccionOrigenCP", direccionOrigenCP);
    //next();
    handleHttpResponse(res, direccionOrigenCP);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATING_DIRECCION_ORIGEN_CARTAPORTE");
  }
};

module.exports = {
  createDireccionOrigenCPCtrl,
};
