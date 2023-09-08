const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { viajeModel, empresasModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/Viajes/...
 * @param {*} res   Query de la operacion
 */

const createViajeCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    console.log("entering createViajeCtrl")
    const dataViaje = await viajeModel.create(body);
    handleHttpResponse(res, dataViaje);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_Viaje");
  }
};

const updateViajesCtrl = async (req, res) => {
  try {
    let id_Viaje = parseInt(req.params.id);
    const { body } = req; //splits the request into two objects, id and body
    let query =
      "SELECT `id_Viaje`" + "FROM `tbl_viaje`" + "WHERE `id_Viaje` =:id;";
    let dataId = await sequelize.query(query, {
      replacements: { id: `${id_Viaje}` },
      type: QueryTypes.SELECT,
    });
    if (!dataId) {
      handleHttpError(res, `No existe Viaje con id: ${id}`, 404);
      return;
    } else {
      const dataUpdatedViaje = await viajeModel.update(body, {
        where: { id_Viaje },
      });

      let dataRow = await viajeModel.findByPk(id_Viaje);
      dataRow = { dataRow, status: `${dataUpdatedViaje}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_Viaje");
  }
};

// const readAllViajesCtrl = async (req, res) => {
//   try {
//     let query = "SELECT `candado`.`st_DescripcionCandado`, `Viajes`.*"+
//     "FROM `tbl_Viajes` as `Viajes`" +
//     "INNER JOIN  `tbl_tipocandado` as `candado`" +
//     "ON `candado`.`id_Candado`= `Viajes`.`id_Candado`" +
//     "WHERE  `Viajes`.`id_Candado` = 1" ;
//     const readAllViajes = await sequelize.query(query, {
//       type: QueryTypes.SELECT
//     })
//     //const dataAllViajes = await viajeModel.findAll();
//     handleHttpResponse(res, readAllViajes);
//   } catch (e) {
//     console.log(e);
//     handleHttpError(res, "ERROR_READ_Viajes");
//   }
// };


const deleteViajeCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataViaje = await viajeModel.findByPk(id);
    if (!dataViaje) {
      handleHttpError(res, `No existe Viaje con id: ${id}`, 404);
      return;
    } else {
      let query =
        "UPDATE `tbl_viaje` SET `id_Candado`='0' WHERE `id_Viaje`=:id;";
      const statusDeleteViaje = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.UPDATE,
      });
      let getLogicStatus = statusDeleteViaje.pop();
      let dataRow = await viajeModel.findByPk(id);
      dataRow = { dataRow, status: `${getLogicStatus}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_Viaje");
  }
};


const readViajeEmpresaCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const dataEmpresa = await empresasModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `viaje`.*, `empresa`.`id_Empresa`" +
        "FROM `tbl_viaje` as `viaje`" +
        "INNER JOIN  `tbl_empresas` as `empresa`" +
        "ON `empresa`.`id_Empresa`= `viaje`.`id_Empresa`" +
        "WHERE `empresa`.`id_Empresa`=:id "+
        "AND `viaje`.`id_Candado`= 1";


      const dataViajeModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataViajeModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_viaje-EMPRESA");
  }
};


module.exports = {
  createViajeCtrl,
//  readAllViajesCtrl,
//  readViajeCtrl,
  updateViajesCtrl,
  deleteViajeCtrl,
  readViajeEmpresaCtrl
};
