const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { contactosEmergenciaModel, operadoresModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/contactosEmOperadores/...
 * @param {*} res   Query de la operacion
 */

const createContactoCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataContacto = await contactosEmergenciaModel.create(body);
    handleHttpResponse(res, dataContacto);
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
    let id = parseInt(req.params.id);
    let dataReadOperador = await operadoresModel.findByPk(id) ? true : false
    if (dataReadOperador == false) {
      handleHttpError(res, `No existe Operador con id: ${id}`)
      return
    } else {
      let query =
        "SELECT `contacto`.*"+
        "FROM `tbl_contactoem_operadores` AS `contacto` " +
        "WHERE `contacto`.`id_Operador`=:id ";
      const [dataRow] = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      })
      if (dataRow == undefined) {
        handleHttpError(res, `No existe Contacto emergencia asociado al Operador con id: ${id}`)
      } else {
        handleHttpResponse(res, dataRow)
      }
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_CONTACTO-EM");
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
