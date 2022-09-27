const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
//const { QueryTypes } = require("sequelize");

async function readMonedasCtrl(req, res) {
  try {
    let sql = "CALL readAllMonedas()";
    const dataq = await sequelize.query(sql, true, function (error, result) {
      return result;
    });
    handleHttpResponse(res, dataq);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_MONEDAS");
  }
}

async function readFormasPagoCtrl(req, res) {
  try {
    let sql = "CALL readAllFormasPago()";
    const dataq = await sequelize.query(sql, true, function (error, result) {
      return result;
    });
    handleHttpResponse(res, dataq);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_FORMAS-PAGO");
  }
}

async function readMetodosPagoCtrl(req, res) {
  try {
    let sql = "CALL readAllMetodosPago()";
    const dataq = await sequelize.query(sql, true, function (error, result) {
      return result;
    });
    handleHttpResponse(res, dataq);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_METODOS-PAGO");
  }
}

async function readProdServicioCFDICtrl(req, res) {
  try {
    let sqlQuery = "CALL readAllClaveProdServicioCFDI()";
    const dataProdServicio = await sequelize.query(
      sqlQuery,
      true,
      function (error, result) {
        return result;
      }
    );
    handleHttpResponse(res, dataProdServicio);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_PROD-SERVICIO-CFDI");
  }
}

async function readUsosCFDICtrl(req, res) {
  try {
    let sqlQuery = "CALL readAllUsosCFDI()";
    const dataProdServicio = await sequelize.query(
      sqlQuery,
      true,
      function (error, result) {
        return result;
      }
    );
    handleHttpResponse(res, dataProdServicio);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_PROD-SERVICIO-CFDI");
  }
}




async function readUnidadPesoCFDICtrl(req, res) {
  try {
    let sqlQuery = "CALL 	readAllUnidadPesoCFDI()";
    const dataProdServicio = await sequelize.query(
      sqlQuery,
      true,
      function (error, result) {
        return result;
      }
    );
    handleHttpResponse(res, dataProdServicio);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_PROD-SERVICIO-CFDI");
  }
}

module.exports = {
  readMonedasCtrl,
  readFormasPagoCtrl,
  readMetodosPagoCtrl,
  readProdServicioCFDICtrl,
  readUnidadPesoCFDICtrl,
  readUsosCFDICtrl
};
