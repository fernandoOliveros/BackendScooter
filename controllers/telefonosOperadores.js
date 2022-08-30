const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { telefonosOperadoresModel } = require("../models");

/**
 * @param {} req  http://localhost:5000/api/telefonosOperadores/...
 * @param {*} res   Query de la operacion
 */

const createTelefonoCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataTelefono = await telefonosOperadoresModel.create(body);
    handleHttpResponse(res, dataTelefono);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_TELEFONO");
  }
};

const updateTelefonoCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataTelefono = await telefonosOperadoresModel.findByPk(id);
    if (!dataTelefono) {
      handleHttpError(res, `No existe telefonoOperador con id: ${id}`, 404);
      return;
    }
    const dataUpdateTelefono = await telefonosOperadoresModel.update(body, {
      where: { id_NumTelefono: id },
    });
    handleHttpResponse(res, dataUpdateTelefono);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_TELEFONO");
  }
};

const readAllTelefonosCtrl = async (req, res) => {
  try {
    const dataAllTelefonos = await telefonosOperadoresModel.findAll();
    handleHttpResponse(res, dataAllTelefonos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_TELEFONOS");
  }
};

const readTelefonoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataTelefono = await telefonosOperadoresModel.findByPk(id);
    if (!dataTelefono) {
      handleHttpError(res, `No existe telefonoOperador con id: ${id}`, 404);
      return;
    } else {
      handleHttpResponse(res, dataTelefono);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_READ_TELEFONO");
  }
};

const deleteTelefonoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataTelefono = await telefonosOperadoresModel.findByPk(id);
    if (!dataTelefono) {
      handleHttpError(res, `No existe telefonoOperador con id: ${id}`, 404);
      return;
    }
    const dataDeleteTelefono = await telefonosOperadoresModel.destroy({
      where: { id_NumTelefono: id },
    });
    handleHttpResponse(res, dataDeleteTelefono);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_TELEFONO");
  }
};

module.exports = {
  createTelefonoCtrl,
  updateTelefonoCtrl,
  readTelefonoCtrl,
  readAllTelefonosCtrl,
  deleteTelefonoCtrl,
};
