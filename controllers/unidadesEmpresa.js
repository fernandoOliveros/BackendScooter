const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { unidadesModel } = require("../models");
const { matchedData } = require("express-validator");


const { QueryTypes } = require("sequelize");

/**
 * @param {GET} req  http://localhost:5000/api/tiposUnidades/read
 * @param {*} res   Query para leer todo el tipo de unidades (SAT DB)
 */

const readUnidadesEmpresaCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await unidadesModel.findByPk(id);
    if (!dataUnidad) {
      handleHttpError(res, `No existe unidad con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `unidades`.*, `empresa`.`id_Empresa`" +
        "FROM `tbl_unidades` as `unidades`" +
        "INNER JOIN  `tbl_empresas` as `empresa`" +
        "ON `empresa`.`id_Empresa`= `unidades`.`id_Empresa`" +
        "WHERE `empresa`.`id_Empresa`=:id;";
      const dataUnidadModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataUnidadModified);
    }
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_READ_UNIDADES-EMPRESA");
  }
};

module.exports = { readUnidadesEmpresaCtrl };
