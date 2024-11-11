const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { empresasModel } = require("../models");
const { QueryTypes } = require("sequelize");

/**
 * @param {GET} req api/unidadesEmpresa/read
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
      let query =
        "SELECT id_Unidad, id_Candado, id_TipoUnidad, st_Marca, st_SubMarca, st_PermisoSCT, st_Economico, st_Anio, st_Placa, " + 
        "st_NumMotor, st_NumSerie, st_NumPoliza, date_Mecanico, date_Ecologico, id_TipoPermiso, id_AseguradoraRespCivil " + 
        "FROM tbl_unidades WHERE id_Empresa =:id AND id_Candado = 1;";
      const dataUnidadModified = await sequelize.query(query, {
        replacements: { id: `${user.id_Empresa}`},
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataUnidadModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(e, null, 401);
  }
};

module.exports = { readUnidadesEmpresaCtrl };
