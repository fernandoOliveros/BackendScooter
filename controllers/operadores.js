const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { operadoresModel, empresasModel } = require("../models");
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
    handleHttpResponse(res, dataOperador);
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
    let query =
      "SELECT `op`.*, `tipop`.`st_NombreTipoPuesto`" +
      "FROM `tbl_operadores` AS `op`" +
      " INNER JOIN `tbl_tipopuesto` AS `tipop`" +
      "ON `op`.`id_TipoPuesto`=`tipop`.`id_TipoPuesto`"+
      "WHERE  `op`.`id_Candado` = 1";
    const dataReadAllOperadoresModified = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    handleHttpResponse(res, dataReadAllOperadoresModified);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_OPERADORES");
  }
};

const readOperadorCtrl = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const dataOperador = await operadoresModel.findByPk(id);
    if (!dataOperador) {
      handleHttpError(res, `No existe operador con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `candado`.`st_DescripcionCandado`, `tipopuesto`.`st_NombreTipoPuesto`, `docs`.`url_CURP` , `docs`.`url_RFC`,`docs`.`url_ComprobanteDom`, `docs`.`id_Documento`, `operadores`.* " +
        "FROM `tbl_operadores` as `operadores`" +
        "INNER JOIN  `tbl_tipocandado` as `candado`" +
        "ON `candado`.`id_Candado`= `operadores`.`id_Candado`" +
        "INNER JOIN `tbl_docs_operadores` as `docs`" +
        "INNER JOIN `tbl_tipopuesto` AS `tipopuesto`" +
        "ON `docs`.`id_Operador`= `operadores`.`id_Operador`" +
        "AND `tipopuesto`.`id_TipoPuesto`= `operadores`.`id_TipoPuesto`" +
        "WHERE `operadores`.`id_Operador`=:id;";
      const dataOperadorModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataOperadorModified);
    }
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_READ_OPERADOR");
  }
};


const deleteOperadorCtrl = async (req, res) => {
  try {
    id = parseInt(req.params.id)
    const dataOperador = await operadoresModel.findByPk(id);
    if (!dataOperador) {
      handleHttpError(res, `No existe operador con id: ${id}`, 404);
      return;
    } else {
      let query =
        "UPDATE `tbl_operadores` SET `id_Candado`='0' WHERE `id_Operador`=:id;";
      const statusDeleteOperador = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.UPDATE,
      });
      let getLogicStatus = statusDeleteOperador.pop();
      let dataRow = await operadoresModel.findByPk(id);
      dataRow = { dataRow, status: `${getLogicStatus}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_OPERADOR");
  }
};

const readOperadoresEmpresaCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const dataEmpresa = await empresasModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `operadores`.*, `empresa`.`id_Empresa`" +
        "FROM `tbl_operadores` as `operadores`" +
        "INNER JOIN  `tbl_empresas` as `empresa`" +
        "ON `empresa`.`id_Empresa`= `operadores`.`id_Empresa`" +
        "WHERE `empresa`.`id_Empresa`=:id;";
      const dataOperadorModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataOperadorModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_OPERADORES-EMPRESA");
  }
};

module.exports = {
  createOperadorCtrl,
  updateOperadorCtrl,
  readAllOperadoresCtrl,
  readOperadorCtrl,
  deleteOperadorCtrl,
  readOperadoresEmpresaCtrl
};
