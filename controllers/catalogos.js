const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
//const { QueryTypes } = require("sequelize");
const { exec } = require('child_process');

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


// Ruta al script de Python que deseas ejecutar
const pythonScriptPath = './controllers/selladoXML.py';

// Comando para ejecutar el script de Python
const command = `python ${pythonScriptPath}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar el script: ${error}`);
    return;
  }
  console.log(`Salida del script: ${stdout}`);
});

}

// async function readFormasPagoCtrl(req, res) {
//   try {
//     let sql = "CALL readAllFormasPago()";
//     const dataq = await sequelize.query(sql, true, function (error, result) {
//       return result;
//     });
//     handleHttpResponse(res, dataq);
//   } catch (e) {
//     console.log(e);
//     handleHttpError(res, "ERROR_READ_FORMAS-PAGO");
//   }
//}


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
    handleHttpResponse(res, dataProdServicio);
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
  readUnidadPesoCPCtrl
};
