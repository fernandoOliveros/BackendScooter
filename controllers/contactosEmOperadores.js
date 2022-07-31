const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { contactosEmergenciaModel } = require("../models");

/**
 * @param {} req  http://localhost:5000/api/contactosEmOperadores/...
 * @param {*} res   Query de la operacion
 */

const createContactoCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataContacto = await contactosEmergenciaModel.create(body);
    await handleHttpResponse(res, dataContacto);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_UNIDAD");
  }
};

const updateContactoCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataContacto = await contactosEmergenciaModel.findByPk(id);
    if (!dataContacto) {
      handleHttpError(
        res,
        `No existe Contacto Emergencia Operador con id: ${id}`,
        404
      );
      return;
    }
    const dataUpdateContacto = await contactosEmergenciaModel.update(body, {
      where: { id_ContactoEm: id },
    });
    handleHttpResponse(res, dataUpdateContacto);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const readAllContactosCtrl = async (req, res) => {
  try {
    const dataAllContactos = await contactosEmergenciaModel.findAll();
    handleHttpResponse(res, dataAllContactos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_UNIDADES");
  }
};

const readContactoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataContacto = await contactosEmergenciaModel.findByPk(id);
    if (!dataContacto) {
      handleHttpError(
        res,
        `No existe Contacto Emergencia Operador con id: ${id}`,
        404
      );
      return;
    } else {
      handleHttpResponse(res, dataContacto);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_READ_UNIDAD");
  }
};

const deleteContactoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataContacto = await contactosEmergenciaModel.findByPk(id);
    if (!dataContacto) {
      handleHttpError(
        res,
        `No existe Contacto Emergencia Operador con id: ${id}`,
        404
      );
      return;
    }
    const dataDeleteContacto = await contactosEmergenciaModel.destroy({
      where: { id_ContactoEm: id },
    });
    handleHttpResponse(res, dataDeleteContacto);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_UNIDAD");
  }
};

module.exports = {
  createContactoCtrl,
  readAllContactosCtrl,
  readContactoCtrl,
  updateContactoCtrl,
  deleteContactoCtrl,
};



