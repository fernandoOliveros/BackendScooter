const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { operadoresModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/operadores/...
 * @param {*} res   Query de la operacion
 */

const createOperadorCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataOperador = await operadoresModel.create(body);
    await handleHttpResponse(res, dataOperador);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_OPERADOR");
  }
};

const updateOperadorCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataOperador = await operadoresModel.findByPk(id);
    if (!dataOperador) {
      handleHttpError(res, `No existe operador con id: ${id}`, 404);
      return;
    }
    const dataUpdateOperador = await operadoresModel.update(body, {
      where: { id_Operador: id },
    });
    /*if(dataUpdateOperador==0){
      //console.log(`No se logro updateOperador con id: ${id}`)
      handleHttpError(res, `No se logro updateOperador con id: ${id}`, 404);
      return
    }*/
    handleHttpResponse(res, dataUpdateOperador);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_OPERADOR");
  }
};

const readAllOperadoresCtrl = async (req, res) => {
  try {
    const dataAllOperadores = await operadoresModel.findAll();
    handleHttpResponse(res, dataAllOperadores);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_OPERADORES");
  }
};

const readOperadorCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataOperador = await operadoresModel.findByPk(id);
    if (!dataOperador) {
      handleHttpError(res, `No existe operador con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `operadores`.*, `docs`.`url_SolicitudEmpleo`, `docs`.`url_CURP` , `docs`.`url_RFC`,`docs`.`url_ComprobanteDom` " +
        "FROM `tbl_operadores` as `operadores`" +
        "INNER JOIN `tbl_docs_operadores` as `docs`" +
        "ON `docs`.`id_Operador`= `operadores`.`id_Operador`" +
        "WHERE `operadores`.`id_Operador`=:id;";
      const dataOperadorModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataOperadorModified);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_READ_OPERADOR");
  }
};

const deleteOperadorCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataOperador = await operadoresModel.findByPk(id);
    if (!dataOperador) {
      handleHttpError(res, `No existe operador con id: ${id}`, 404);
      return;
    }
    const dataDeleteOperador = await operadoresModel.destroy({
      where: { id_Operador: id },
    });
    handleHttpResponse(res, dataDeleteOperador);
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
