const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { empresasModel } = require("../models");
const { QueryTypes } = require("sequelize");

/**
 * @param {GET} req  http://localhost:5000/api/unidadesEmpresa/read
 * @param {*} res   Query para leer todo las unidades que pertenecen a una empresa ())
 */

const readUnidadesEmpresaCtrl = async (req, res) => {
  try {
    const { user } = req;
    const dataEmpresa = await empresasModel.findByPk(user.id_User);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${user.id_User}`, 404);
      return;
    } else {
      //Params
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const offset = (page - 1) * limit;
      let query =
        "SELECT * FROM tbl_unidades WHERE id_Empresa =:id AND id_Candado = 1 limit :limit offset :offset;";
      const dataUnidadModified = await sequelize.query(query, {
        replacements: { id: `${user.id_Empresa}`, limit: limit, offset: offset},
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataUnidadModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpResponse(e, null, 401);
  }
};

module.exports = { readUnidadesEmpresaCtrl };
