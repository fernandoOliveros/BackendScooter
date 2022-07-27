const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { operadoresModel } = require("../models");

/**
 * @param {} req  http://localhost:5000/api/operadores/...
 * @param {*} res   Query de la operacion
 */

const createOperadorCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataUnidad = await operadoresModel.create(body);
    await handleHttpResponse(res, dataUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_UNIDAD");
  }
};

const updateOperadorCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUpdateUnidad = await operadoresModel.update(body, {
      where: { id_Unidad: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const readAllOperadoresCtrl = async (req, res) => {
  try {
    const dataAllUnidades = await operadoresModel.findAll();
    handleHttpResponse(res, dataAllUnidades);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_UNIDADES");
  }
};

const readOperadorCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await operadoresModel.findByPk(id);
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_GET_UNIDAD");
  }
};

const deleteOperadorCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteUnidad = await operadoresModel.destroy({
      where: { id_Unidad: id },
    });
    handleHttpResponse(res, dataDeleteUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_UNIDAD");
  }
};

module.exports = {
  createOperadorCtrl,
  updateOperadorCtrl,
  readAllOperadoresCtrl,
  readOperadorCtrl,
  deleteOperadorCtrl,
};
