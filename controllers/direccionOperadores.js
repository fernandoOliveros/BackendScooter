const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { direccionOperadoresModel } = require("../models");
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
    await handleHttpResponse(res, dataUnidad);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DIRECCION");
  }
};

const updateDireccionCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUpdateUnidad = await direccionOperadoresModel.update(body, {
      where: { id_Dir_Operador: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);
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
    req = matchedData(req);
    const { id } = req;
    const dataUnidad = await direccionOperadoresModel.findByPk(id);
    handleHttpResponse(res, dataUnidad);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DIRECCION");
  }
};

const deleteDireccionCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteUnidad = await direccionOperadoresModel.destroy({
      where: { id_Dir_Operador: id },
    });
    handleHttpResponse(res, dataDeleteUnidad);
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
    "FROM `cat_codigo_postal`  AS  `CP`" +
    "INNER JOIN  `cat_municipio` AS `municipio` ON `CP`.`c_Estado`=`municipio`.`c_Estado` AND `CP`.`c_Municipio`=`municipio`.`c_Municipio`" +
    "INNER JOIN  `cat_localidad` AS `loc` ON `CP`.`c_Estado`=`loc`.`c_Estado` AND `CP`.`c_Localidad`=`loc`.`c_Localidad`" +
    "INNER JOIN  `cat_estado` AS `estado` ON `CP`.`c_Estado`=`estado`.`c_Estado`"+
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

  console.log(dataColonias)
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
