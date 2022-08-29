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
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_UNIDAD");
  }
};

const updateUnidadesCtrl = async (req, res) => {
  try {
    /*const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    }
    const dataUpdateUnidad = await unidadesModel.update(body, {
      where: { id_Unidad: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);*/
    let id_Unidad = parseInt(req.params.id);
    const { body } = req; //splits the request into two objects, id and body
    let query =
      "SELECT `id_Unidad`" + "FROM `tbl_unidades`" + "WHERE `id_Unidad` =:id;";
    let dataId = await sequelize.query(query, {
      replacements: { id: `${id_Unidad}` },
      type: QueryTypes.SELECT,
    });
    if (!dataId) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    } else {
      const dataUpdatedUnidad = await unidadesModel.update(body, {
        where: { id_Unidad },
      });

      let dataRow = await unidadesModel.findByPk(id_Unidad);
      dataRow = { dataRow, status: `${dataUpdatedUnidad}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const readAllUnidadesCtrl = async (req, res) => {
  try {
    let query = "SELECT `candado`.`st_DescripcionCandado`, `unidades`.*"+
    "FROM `tbl_unidades` as `unidades`" +
    "INNER JOIN  `tbl_tipocandado` as `candado`" +
    "ON `candado`.`id_Candado`= `unidades`.`id_Candado`" ;
    const readAllUnidades = await sequelize.query(query, {
      type: QueryTypes.SELECT
    })
    //const dataAllUnidades = await unidadesModel.findAll();
    handleHttpResponse(res, readAllUnidades);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_UNIDADES");
  }
};

const readUnidadCtrl = async (req, res) => {
  try {
    const id= parseInt(req.params.id)
    //console.log(`El id ESSSS ${id}`)

    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `candado`.`st_DescripcionCandado`, `unidades`.*, `docs`.`url_TarjetaCirculacion`, `docs`.`url_Factura` , `docs`.`url_PermisoSCT`,`docs`.`id_Documento` " +
        "FROM `tbl_unidades` as `unidades`" +
        "INNER JOIN `tbl_documentos` as `docs`" +
        "ON `docs`.`id_Unidad`= `unidades`.`id_Unidad`" +
        "INNER JOIN  `tbl_tipocandado` as `candado`" +
        "ON `candado`.`id_Candado`= `unidades`.`id_Candado`" +
        " AND `candado`.`id_Candado`= `unidades`.`id_Candado`" +
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
    } else {
      let query =
        "UPDATE `tbl_unidades` SET `id_Candado`='0' WHERE `id_Unidad`=:id;";
      const statusDeleteUnidad = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.UPDATE,
      });
      let getLogicStatus = statusDeleteUnidad.pop();
      let dataRow = await unidadesModel.findByPk(id);
      dataRow = { dataRow, status: `${getLogicStatus}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
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
