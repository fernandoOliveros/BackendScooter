const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

async function readClaveUnidadPeso(req, res) {
  try {
    let sql = "CALL readAllClaveUnidadPeso()";
    const dataq = await sequelize.query(sql, true, function (error, result) {
      return result;
    });
    handleHttpResponse(res, dataq);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_CLAVE-PESO-UNIDAD");
  }
}

async function readClaveProductoServicioCtrl(req, res) {
  try {
    const descripcion = req.params.descripcion;
    let sql = `CALL readClaveProductoServicioLike(${descripcion})`;
    const dataq = await sequelize.query(sql, true, function (error, result) {
      return result;
    });
    handleHttpResponse(res, dataq);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_CLAVE-PRODUCTO-SERVICIO");
  }
}

module.exports = { readClaveProductoServicioCtrl, readClaveUnidadPeso };