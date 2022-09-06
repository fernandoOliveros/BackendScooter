const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { empresasModel } = require("../models");
const { matchedData } = require("express-validator");
const { QueryTypes } = require("sequelize");

/**
 * @param {GET} req  http://localhost:5000/api/unidadesEmpresa/read
 * @param {*} res   Query para leer todo las unidades que pertenecen a una empresa ())
 */

const readUnidadesEmpresaCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataEmpresa = await empresasModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `unidades`.*, `empresa`.`id_Empresa`,  `candado`.`st_DescripcionCandado`" +
        "FROM `tbl_unidades` as `unidades`" +
        "INNER JOIN  `tbl_empresas` as `empresa`" +
        "ON `empresa`.`id_Empresa`= `unidades`.`id_Empresa`" +
        "INNER JOIN  `tbl_tipocandado` as `candado`" +
        "ON `candado`.`id_Candado`= `unidades`.`id_Candado`" +
        "WHERE `empresa`.`id_Empresa`=:id "+
        "AND `unidades`.`id_Candado` = 1;";
      const dataUnidadModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataUnidadModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_UNIDADES-EMPRESA");
  }
};

module.exports = { readUnidadesEmpresaCtrl };
