const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { unidadesModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

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
    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    }
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
    handleHttpError(res, "ERROR_READ_UNIDADES");
  }
};

const readUnidadCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    }
    else {
    let query =
      "SELECT `candado`.`st_DescripcionCandado`, `unidades`.*, `docs`.`url_TarjetaCirculacion`, `docs`.`url_Factura` , `docs`.`url_PermisoSCT`" +
      "FROM `tbl_unidades` as `unidades`" +
      "INNER JOIN `tbl_documentos` as `docs`" +
      "INNER JOIN  `tbl_tipocandado` as `candado`" +
      "ON `docs`.`id_Unidad`= `unidades`.`id_Unidad`" +
      "WHERE `unidades`.`id_Unidad`=:id;";
    const dataUnidadModified = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });
    handleHttpResponse(res, dataUnidadModified);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_READ_UNIDAD");
  }
};

const deleteUnidadCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    }
    const dataDeleteUnidad = await unidadesModel.destroy({
      where: { id_Unidad: id },
    });
    handleHttpResponse(res, dataDeleteUnidad);
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
