const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { direccionOperadoresModel, operadoresModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/unidades/...
 * @param {*} res   Query de la operacion
 */

const createDireccionCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const dataUnidad = await direccionOperadoresModel.create(body);
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DIRECCION");
  }
};

const updateDireccionCtrl = async (req, res) => {
  try {
    const { body } = req; //splits the request into two objects, id and body
    let id = parseInt(req.params.id);
    let query =
      "SELECT `id_Dir_Operador` FROM `tbl_dir_operadores` WHERE `id_Dir_Operador`=:id ";
    const dataRow = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });

    if (dataRow.length == 0) {
      handleHttpError(res, `No existe Direccion operador con id: ${id}`);
    } else {
      const dataUpdateUnidad = await direccionOperadoresModel.update(body, {
        where: { id_Dir_Operador: id },
      });
      handleHttpResponse(res, dataUpdateUnidad);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_DIRECCION");
  }
};

const readAllDireccionesCtrl = async (req, res) => {
  try {
    const dataAllUnidades = await direccionOperadoresModel.findAll();
    handleHttpResponse(res, dataAllUnidades);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DIRECCION");
  }
};

const readDireccionCtrl = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let dataReadOperador = await operadoresModel.findByPk(id) ? true : false
    if (dataReadOperador == false) {
      handleHttpError(res, `No existe Operador con id: ${id}`)
      return
    } else {
      let query =
        "SELECT `municipio`.`st_Municipio`,  `col`.`st_Colonia`, `est`.`st_Estado`, `local`.`st_Localidad`, `dir`.* " +
        "FROM `tbl_dir_operadores` AS `dir` " +
        "INNER JOIN `cat_colonia` AS `col` " +
        "ON `dir`.`id_Colonia`=`col`.`id_colonia` " +
        "INNER JOIN `cat_estado` AS `est` " +
        "ON `est`.`id_Estado`=`dir`.`id_Estado` " +
        "INNER JOIN `cat_localidad` AS `local` " +
        "ON `local`.`id_Localidad`=`dir`.`id_Localidad` " +
        "INNER JOIN `cat_municipio` AS `municipio` " +
        "ON `municipio`.`id_Municipio`=`dir`.`id_Municipio` " +
        "WHERE `dir`.`id_Operador`=:id ";
      const [dataRow] = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      })
      if (dataRow == undefined) {
        handleHttpError(res, `No existe direccion asociada al operador con id: ${id}`)
      } else {
        handleHttpResponse(res, dataRow)
      }
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DIRECCION");
  }
};

const deleteDireccionCtrl = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let query =
      "SELECT `id_Dir_Operador` FROM `tbl_dir_operadores` WHERE `id_Dir_Operador`=:id ";
    const dataRow = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });

    if (dataRow.length == 0) {
      handleHttpError(res, `No existe Direccion operador con id: ${id}`);
    } else {
      const dataDeleteUnidad = await direccionOperadoresModel.destroy({
        where: { id_Dir_Operador: id },
      });
      handleHttpResponse(res, dataDeleteUnidad);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_DIRECCION");
  }
};

const getByCPCtrl = async (req, res) => {
  let CP = String(req.params.CP);
  console.log(CP);
  let query =
    "SELECT `CP`.`c_codigoPostal`,  `CP`.`c_Estado`" +
    ", `municipio`.`st_Municipio`" +
    ",`loc`.`st_Localidad`" +
    ",`loc`.`id_Localidad`" +
    ",`municipio`.`id_Municipio`" +
    ",`estado`.`id_Estado`" +
    ",`CP`.`id_codigoPostal`" +
    ",`estado`.`st_Estado`" +
    "FROM `cat_codigo_postal`  AS  `CP`" +
    "INNER JOIN  `cat_municipio` AS `municipio` ON `CP`.`c_Estado`=`municipio`.`c_Estado` AND `CP`.`c_Municipio`=`municipio`.`c_Municipio`" +
    "INNER JOIN  `cat_localidad` AS `loc` ON `CP`.`c_Estado`=`loc`.`c_Estado` AND `CP`.`c_Localidad`=`loc`.`c_Localidad`" +
    "INNER JOIN  `cat_estado` AS `estado` ON `CP`.`c_Estado`=`estado`.`c_Estado`" +
    "WHERE `CP`.`c_codigoPostal`=:CP";
  let dataDireccion = await sequelize.query(query, {
    replacements: { CP: `${CP}` },
    type: QueryTypes.SELECT,
  });
  dataDireccion = dataDireccion[0];

  let queryColonias =
    "SELECT `st_Colonia`,`id_colonia`  FROM `cat_colonia` WHERE `c_CodigoPostal` =:CP";
  const dataColonias = await sequelize.query(queryColonias, {
    replacements: { CP: `${CP}` },
    type: sequelize.QueryTypes.SELECT,
  });

  /*let colonias = [];
  for (const i in dataColonias) {
    const colonia = dataColonias[i];
    let currentColonia = colonia.st_Colonia;
    colonias.push(currentColonia);
  }*/
  dataDireccion = { ...dataDireccion, dataColonias };
  //dataDireccion=[...dataDireccion, {colonias: `${colonias}` }]
  //dataDireccion.push(colonias)
  //console.log(dataDireccion)
  //console.log(colonias)

  handleHttpResponse(res, dataDireccion);
};

module.exports = {
  createDireccionCtrl,
  readAllDireccionesCtrl,
  readDireccionCtrl,
  updateDireccionCtrl,
  deleteDireccionCtrl,
  getByCPCtrl,
};
