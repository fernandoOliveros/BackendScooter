const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { telefonosOperadoresModel, operadoresModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/telefonosOperadores/...
 * @param {*} res   Query de la operacion
 */

const createTelefonoCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataTelefono = await telefonosOperadoresModel.create(body);
    handleHttpResponse(res, dataTelefono);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_TELEFONO");
  }
};

const updateTelefonoCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataTelefono = await telefonosOperadoresModel.findByPk(id);
    if (!dataTelefono) {
      handleHttpError(res, `No existe telefonoOperador con id: ${id}`, 404);
      return;
    }
    const dataUpdateTelefono = await telefonosOperadoresModel.update(body, {
      where: { id_NumTelefono: id },
    });
    handleHttpResponse(res, dataUpdateTelefono);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_TELEFONO");
  }
};

const readAllTelefonosCtrl = async (req, res) => {
  try {
    const dataAllTelefonos = await telefonosOperadoresModel.findAll();
    handleHttpResponse(res, dataAllTelefonos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_TELEFONOS");
  }
};


const readTelefonoCtrl = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let dataReadOperador = await operadoresModel.findByPk(id) ? true : false
    if (dataReadOperador == false) {
      handleHttpError(res, `No existe Operador con id: ${id}`)
      return
    } else {
      let query =
        "SELECT `tel`.*, `catego`.`st_Descripcion` "+
        "FROM `tbl_tel_operadores` AS `tel` " +
        "INNER JOIN `tbl_tel_categorias` AS `catego` " +
        "ON `catego`.`id_Categoria`=`tel`.`id_Categoria` " +
        "WHERE `tel`.`id_Operador`=:id ";
      const [dataRow] = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      })
      if (dataRow == undefined) {
        handleHttpError(res, `No existe telefono asociado al operador con id: ${id}`)
      } else {
        handleHttpResponse(res, dataRow)
      }
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_TELEFONO");
  }
};

const deleteTelefonoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataTelefono = await telefonosOperadoresModel.findByPk(id);
    if (!dataTelefono) {
      handleHttpError(res, `No existe telefonoOperador con id: ${id}`, 404);
      return;
    }
    const dataDeleteTelefono = await telefonosOperadoresModel.destroy({
      where: { id_NumTelefono: id },
    });
    handleHttpResponse(res, dataDeleteTelefono);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_TELEFONO");
  }
};

module.exports = {
  createTelefonoCtrl,
  updateTelefonoCtrl,
  readTelefonoCtrl,
  readAllTelefonosCtrl,
  deleteTelefonoCtrl,
};
