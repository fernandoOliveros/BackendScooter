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

const updateCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const cartaPorte = await CartaPorte.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    await cartaPorte.update(body);
    handleHttpResponse(res, cartaPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATING_CARTAPORTE");
  }
};

const readAllCartasPorteCtrl = async (req, res) => {
  try {
    const cartasPorte = await CartaPorte.findAll();
    handleHttpResponse(res, cartasPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_READING_CARTASPORTE");
  }
};

const readCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const cartaPorte = await CartaPorte.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    handleHttpResponse(res, cartaPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_READING_CARTAPORTE");
  }
};

const deleteCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const cartaPorte = await CartaPorte.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    await cartaPorte.destroy();
    handleHttpResponse(res, "CartaPorte eliminada correctamente.");
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETING_CARTAPORTE");
  }
};

module.exports = {
  createDireccionOrigenCPCtrl,
};
