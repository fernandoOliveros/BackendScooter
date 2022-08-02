const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { direccionOperadoresModel } = require("../models");

/**
 * @param {} req  http://localhost:5000/api/unidades/...
 * @param {*} res   Query de la operacion
 */

const createDireccionCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataUnidad = await direccionOperadoresModel.create(body);
    await handleHttpResponse(res, dataUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DIRECCION");
  }
};

const updateDireccionCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUpdateUnidad = await direccionOperadoresModel.update(body, {
      where: { id_Dir_Operador: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_DIRECCION");
  }
};

const readAllDireccionesCtrl = async (req, res) => {
  try {
    const dataAllUnidades = await direccionOperadoresModel.findAll();
    handleHttpResponse(res, dataAllUnidades);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DIRECCION");
  }
};

const readDireccionCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await direccionOperadoresModel.findByPk(id);
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DIRECCION");
  }
};

const deleteDireccionCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteUnidad = await direccionOperadoresModel.destroy({
      where: { id_Dir_Operador: id },
    });
    handleHttpResponse(res, dataDeleteUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_DIRECCION");
  }
};

module.exports = {
  createDireccionCtrl,
  readAllDireccionesCtrl,
  readDireccionCtrl,
  updateDireccionCtrl,
  deleteDireccionCtrl,
};


