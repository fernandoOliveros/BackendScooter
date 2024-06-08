const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { remolquesModel, empresasModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/remolques/...
 * @param {*} res   Query de la operacion
 */

const createRemolqueCtrl = async (req, res) => {
  try {
    const body = matchedData(req); 
    const dataRemolque = await remolquesModel.create(body);
    handleHttpResponse(res, dataRemolque);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_REMOLQUE");
  }
};

const updateRemolqueCtrl = async (req, res) => {
  try {
    const id= parseInt(req.params.id)
    const { body } = req; 
    let query =
      "SELECT `id_Remolque`" + "FROM `tbl_remolques`" + "WHERE `id_Remolque`=:id;";
    let dataId = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });
    if (!dataId) {
      handleHttpError(res, `No existe remolque con id: ${id}`, 404);
      return;
    } else {
      const dataUpdatedRemolque = await remolquesModel.update(body, {
        where: { id_Remolque:id },
      });

      let dataRow = await remolquesModel.findByPk(id);
      dataRow = { dataRow, status: `${dataUpdatedRemolque}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_REMOLQUE");
  }
};

const readAllRemolquesCtrl = async (req, res) => {
  try {
    let query = "SELECT `remolques`.*"+
    "FROM `tbl_remolques` as `remolques`" 
    //+"INNER JOIN  `tbl_tipocandado` as `candado`" 
    //+"ON `candado`.`id_Candado`= `unidades`.`id_Candado`" ;

    //const dataAllUnidades = await remolquesModel.findAll();
    const dataAllRemolques = await sequelize.query(query, {
      type: QueryTypes.SELECT
    })

    handleHttpResponse(res, dataAllRemolques);
  } catch (e) {
    //console.log(e);
    handleHttpError(res, "ERROR_READ_REMOLQUES");
  }
};

const readRemolqueCtrl = async (req, res) => {
  try {
    const id= parseInt(req.params.id)

    const dataRemolque = await remolquesModel.findByPk(id);
    if (!dataRemolque) {
      handleHttpError(res, `No existe remolque con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `remolques`.*, `docs`.`id_Documento`, `docs`.`url_Factura`, `docs`.`url_PermisoSCT`, `docs`.`url_TarjetaCirculacion` "+
        //"`docs`.`url_TarjetaCirculacion`, `docs`.`url_Factura` , `docs`.`url_PermisoSCT`,`docs`.`id_Documento` " +
        "FROM `tbl_remolques` as `remolques`" +
        "LEFT JOIN `tbl_docs_remolques` as `docs`" +
        "ON `docs`.`id_Remolque`= `remolques`.`id_Remolque`" +
        //"INNER JOIN  `tbl_tipocandado` as `candado`" +
        //"ON `candado`.`id_Candado`= `unidades`.`id_Candado`" +
        //" AND `candado`.`id_Candado`= `unidades`.`id_Candado`" +
        "WHERE `remolques`.`id_Remolque`=:id;";
      const dataRemolqueModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataRemolqueModified);
    }
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_READ_REMOLQUE");
  }
};

const deleteRemolqueCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    let query = "SELECT `id_Remolque` FROM `tbl_remolques` WHERE `id_Remolque`=:id";

    const dataRemolque = await sequelize.query(query, {
      replacements: {id:  `${id}`},
      type: QueryTypes.SELECT,
    });

    if (!dataRemolque) {
      handleHttpError(res, `No existe remolque con id: ${id}`, 404);
      return;
    } else {
      let query =
        "UPDATE `tbl_remolques` SET `i_Status`='0' WHERE `id_Remolque`=:id;";
      const statusDeleteRemolque = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.UPDATE,
      });
      let getLogicStatus = statusDeleteRemolque.pop();
      let dataRow = await remolquesModel.findByPk(id);
      dataRow = { dataRow, status: `${getLogicStatus}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    //console.log(e);
    handleHttpError(res, "ERROR_DELETE_REMOLQUE");
  }
};

const readRemolquesEmpresaCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    let queryEmpresaId = "SELECT `id_Empresa` FROM `tbl_empresas` WHERE `id_Empresa` = :id"

    const dataIdEmpresa = await sequelize.query(queryEmpresaId, {
      replacements: {id: `${id}`},
      type: QueryTypes.SELECT,
    })
    
    if (dataIdEmpresa.length==0) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
      let query =
        "SELECT `remolques`.*, `empresa`.`id_Empresa`, `docs`.`url_TarjetaCirculacion`, `docs`.`url_Factura` , `docs`.`url_PermisoSCT`,`docs`.`id_Documento` "+
        "FROM `tbl_remolques` as `remolques`" +
        "LEFT JOIN  `tbl_empresas` as `empresa`" +
        "ON `empresa`.`id_Empresa`= `remolques`.`id_Empresa`" +
        "LEFT JOIN  `tbl_docs_remolques` as `docs`" +
        "ON `docs`.`id_Remolque`= `remolques`.`id_Remolque`" +
        "WHERE `empresa`.`id_Empresa`=:id " + 
        "AND `remolques`.`i_Status`!=0" ;

      const dataRemolqueModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      if (dataRemolqueModified.length==0){
        handleHttpError(res, `Empresa con id: ${id} aun no cuenta con remolques o documentos de remolques`, 404);
        return;
      } else{
        handleHttpResponse(res, dataRemolqueModified);
      }
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_REMOLQUES-EMPRESA");
  }
};

async function readAllTiposRemolquesCtrl(req, res){
  try {
    let query = "SELECT * FROM `cat_tiporemolque`"
    const dataTiposRemolques = await sequelize.query(query, {
      type: QueryTypes.SELECT
    })
    handleHttpResponse(res, dataTiposRemolques)
  } catch (e) {
    handleHttpError(res, "ERROR_READ_TIPOS-REMOLQUES")
  }
}

module.exports = {
  createRemolqueCtrl,
  readAllRemolquesCtrl,
  readRemolqueCtrl,
  updateRemolqueCtrl,
  deleteRemolqueCtrl,
  readRemolquesEmpresaCtrl,
  readAllTiposRemolquesCtrl,
}


