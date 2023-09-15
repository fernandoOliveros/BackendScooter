const { cartaPorteModel,
  direccionOrigenCP, 
  direccionDestinoCPModel  } = require('../models');
const { handleHttpResponse } = require('../utils/handleResponse');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require("express-validator");

const createCartaPorteCtrl = async (req, res, next ) => {
  try {

   
    const body = matchedData(req); //la data del request venga curada
    console.log("entering controller createCartaPorteCtrl", body, "ending body sample")
    const cartaPorte = await cartaPorteModel.create(body);
    const id_CartaPorte = cartaPorte.dataValues.id_CartaPorte;
    req.body.Ubicaciones.id_CartaPorte = id_CartaPorte;
    //req.body = req.body;
    //console.log("printing req.body.Ubicaciones[1].Domicilio", req.body.Ubicaciones[1].Domicilio)
    next();
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_CREATING_CARTAPORTE');
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
    handleHttpError(res, 'ERROR_UPDATING_CARTAPORTE');
  }
};

const readAllCartasPorteCtrl = async (req, res) => {
  try {
    const cartasPorte = await CartaPorte.findAll();
    handleHttpResponse(res, cartasPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_READING_CARTASPORTE');
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
    handleHttpError(res, 'ERROR_READING_CARTAPORTE');
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
    handleHttpResponse(res, 'CartaPorte eliminada correctamente.');
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'ERROR_DELETING_CARTAPORTE');
  }
};

module.exports = {
  createCartaPorteCtrl,
  updateCartaPorteCtrl,
  readAllCartasPorteCtrl,
  readCartaPorteCtrl,
  deleteCartaPorteCtrl,
};
