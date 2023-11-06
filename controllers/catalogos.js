const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
//const { QueryTypes } = require("sequelize");
const {impuestoModel,objImpModel, tipofactorModel} = require("../models")






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


async function readProdServicioCPCtrl(req, res) {
  try {
    let sqlQuery = "SELECT * FROM cat_claveproductoservicio WHERE 1";
    const dataProdServicio = await sequelize.query(
      sqlQuery,
      true,
      function (error, result) {
        return result;
      }
    );
    handleHttpResponse(res, dataProdServicio[0]);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_readProdServicioCP");
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

async function readMaterialesPeligrososCtrl(req, res) {
  try {
    let sqlQuery = "CALL 	readAllMaterialesPeligrosos()";
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
    handleHttpError(res, "ERROR_READ_readMaterialesPeligrososCtrl-SERVICIO-CFDI");
  }
}


async function readRegimenFiscalCFDICtrl(req, res) {
  try {
    let sqlQuery = "CALL 	readAllRegimenFiscalCFDI()";
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
    handleHttpError(res, "ERROR_READ_REGIMEN-FISCAL-CFDI");
  }
}

async function readEmbalajesCtrl(req, res) {
  try {
    let sqlQuery = "SELECT * FROM cat_tipoembalaje";
    const dataProdServicio = await sequelize.query(
      sqlQuery,
      true,
      function (error, result) {
        return result;
      }
    );
    handleHttpResponse(res, dataProdServicio[0]); //para no traer info duplicada
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_REGIMEN-FISCAL-CFDI");
  }
}


async function readUnidadPesoCPCtrl(req, res) {
  try {
    let sqlQuery = "call readAllClaveUnidadPeso();";
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
    handleHttpError(res, "ERROR_READ_ClaveUnidadPeso-CARTAPORTE");
  }
}

async function readTipoImpuestosCtrl(req, res) {
  try {
    const dataProdServicio =  await impuestoModel.findAll();

    handleHttpResponse(res, dataProdServicio);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_readTipoImpuestos");
  }
}

async function readObjetoImpuestoCtrl(req, res) {
  try {
    const dataProdServicio =  await objImpModel.findAll();

    handleHttpResponse(res, dataProdServicio);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_readTipoImpuestos");
  }
}


async function readTipoFactorCtrl(req, res) {
  try {
    const dataProdServicio =  await tipofactorModel.findAll();

    handleHttpResponse(res, dataProdServicio);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_readTipoImpuestos");
  }
}






module.exports = {
  readMonedasCtrl,
  readFormasPagoCtrl,
  readMetodosPagoCtrl,
  readProdServicioCFDICtrl,
  readUnidadPesoCFDICtrl,
  readUsosCFDICtrl,
  readRegimenFiscalCFDICtrl,
  // timbrarCFDICtrl,
  readProdServicioCPCtrl,
  readMaterialesPeligrososCtrl,
  readEmbalajesCtrl,
  readUnidadPesoCPCtrl,
  readTipoImpuestosCtrl,
  readObjetoImpuestoCtrl,
  readTipoFactorCtrl,

};
