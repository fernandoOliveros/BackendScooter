const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { unidadesModel } = require("../models");

/**
 * @param {} req  http://localhost:5000/api/unidades/...
 * @param {*} res   Query de la operacion
 */

const createUnidadCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataUnidad = await unidadesModel.create(body);
    await handleHttpResponse(res, dataUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_UNIDAD");
  }
};

const updateUnidadesCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUpdateUnidad = await unidadesModel.update(body, {
      where: { id_Unidad: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const readAllUnidadesCtrl = async (req, res) => {
  try {
    const dataAllUnidades = await unidadesModel.findAll();
    handleHttpResponse(res, dataAllUnidades);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_UNIDADES");
  }
};

const readUnidadCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await unidadesModel.findByPk(id);
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_GET_UNIDAD");
  }
};

const deleteUnidadCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const {id} = req;
    const dataDeleteUnidad = await unidadesModel.destroy({where: {id_Unidad: id}});
    handleHttpResponse(res, dataDeleteUnidad)
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_UNIDAD");
  }
};

module.exports = {
  createUnidadCtrl,
  readAllUnidadesCtrl,
  readUnidadCtrl,
  updateUnidadesCtrl,
  deleteUnidadCtrl,
};
