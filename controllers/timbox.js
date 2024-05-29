const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");
const fs = require('fs');
const path = require('path');

const Authentication = require('sw-sdk-nodejs').Authentication;

// Leer archivo de configuración AMBIENTE DE DESARROLLO QA/PRO
const configPath = path.join(__dirname, '..', 'configQA.json');
const rawXMLlocation = path.join(__dirname, '..', 'storage/');
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData);
const url = config.url;
const user = config.user;
const password = config.password;

const StampService = require('sw-sdk-nodejs').StampService; //Libreria para timbrar (o sellar)

// async function timbrarXML_Ctrl(req, res) {
//   try {
//     let id = parseInt(req.params.id);
//     console.log(`timbrarXML_Ctrl: The id of the CFDI database is ${id}, connecting to SW services`);

//     let query = `SELECT * FROM tbl_cfdi WHERE id_CFDI = :id;`;

//     const OperadorInformation = await sequelize.query(query, {
//       replacements: { id: `${id}` },
//       type: QueryTypes.SELECT,
//     });

//     let rawXMLName = `${OperadorInformation[0].st_nombreCrudoXML}.xml`;

//     console.log(`timbrandoo  ${rawXMLName}`);

//     const contents = fs.readFileSync(`./storage/documentos/${rawXMLName}`, 'utf8');
//     const generatedToken = await timboxAuthenticateCtrl();

//     // console.log("the token in timbrar controller is ", generatedToken);

//     let xml = contents;
//     let params = { url: `${url}`, token: generatedToken };
//     let stamp = StampService.Set(params);

//     return new Promise((resolve, reject) => {
//       stamp.StampV4(xml, async (error, dataCfdiSellado) => { // mark the function as async here
//         if (error) {
//           console.log("error message is", error.message);
//           reject(error); // Reject the promise if there's an error
//         } else {
//           console.log(dataCfdiSellado);
//           let updateTrasladoCfdiStatus = "UPDATE tbl_cfdi set i_Timbrado = 1 WHERE id_CFDI = :id";
//           await sequelize.query(updateTrasladoCfdiStatus, {
//             replacements: { id: `${id}` },
//           type: sequelize.QueryTypes.UPDATE, // Use the appropriate type
//           });
//           console.log("\nthe uuid is:", dataCfdiSellado.data.uuid)
  
//           handleHttpResponse(res, dataCfdiSellado)
//           resolve(dataCfdiSellado); // Resolve the promise with the data
//         }
//       });
//     });
//   } catch (error) {
//     console.log("error message is", error.message);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// }

async function BuildXML(xmlFileName, xml) {
  fs.writeFile(`./storage/documentos/${xmlFileName}`, xml, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`\nFile ${xmlFileName} updated successfullyy.`);
  });
}


const util = require('util');
const { stringifyFunction } = require("puppeteer-core/internal/util/Function.js");

async function timboxAuthenticateCtrl() {
  try {
    let obj = {
      url: `${url}`,
      user: `${user}`,
      password: `${password}`,
    };

    let auth = Authentication.auth(obj);

    const tokenInformation = await util.promisify(auth.Token.bind(auth))(); // Convert callback to promise

    console.log(tokenInformation.data.token);
    console.log("Successfully authenticated on SW Sapiens platform");

    return tokenInformation.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


async function timbrarXML_Ctrl(req, res) {
  try {
    logs_audit_gmail=JSON.stringify(req.user.st_Email, null, 2).toString();

    // const userId = req.user.tbl_users; // Assuming userId is part of the JWT payload
    let id = parseInt(req.params.id);
    console.log(`timbrarXML_Ctrl: The id of the CFDI database is ${id}, connecting to SW services`);

    let query = `SELECT * FROM tbl_cfdi WHERE id_CFDI = :id;`;

    const OperadorInformation = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });

    let rawXMLName = `${OperadorInformation[0].st_nombreCrudoXML}.xml`;

    console.log(`timbrando  ${rawXMLName}`);

    const contents = fs.readFileSync(`./storage/documentos/${rawXMLName}`, 'utf8');
    const generatedToken = await timboxAuthenticateCtrl();

    let xml = contents;
    let params = { url: `${url}`, token: generatedToken };
    let stamp = StampService.Set(params);

    return new Promise((resolve, reject) => {
      stamp.StampV4(xml, async (error, dataCfdiSellado) => { // mark the function as async here
        if (error) {
          // str_matriz_errores_sat=JSON.stringify(error)
          // console.log("str_matriz_errores_sat is", str_matriz_errores_sat)
          let st_codigo_error=(error.message).toString();
          let st_detalle_error=(error.messageDetail).toString();
          console.log(error);
          let insertCfdiTimbrado = "INSERT INTO tbl_audit_cfdi (id_CFDI,	st_codigo_error,	st_detalle_error,	st_usuario) VALUES (:id, :st_codigo_error,	:st_detalle_error,	:st_usuario)";
          await sequelize.query(insertCfdiTimbrado, {
            replacements: { id: `${id}`, st_codigo_error: `${st_codigo_error}`,	 st_detalle_error: `${st_detalle_error}`,	st_usuario: `${logs_audit_gmail}` },
          type: sequelize.QueryTypes.INSERT // Use the appropriate type
          });

          reject(error); // Reject the promise if there's an error
        } else {
          // console.log("dataCfdiSellado.data is:", dataCfdiSellado.data);
          let updateTrasladoCfdiStatus = "UPDATE tbl_cfdi set i_Timbrado = 1 WHERE id_CFDI = :id";
          
          await sequelize.query(updateTrasladoCfdiStatus, {
            replacements: { id: `${id}` },
          type: sequelize.QueryTypes.UPDATE, // Use the appropriate type
          });

          let insertCfdiTimbrado = "INSERT INTO tbl_cfdi_timbrados (id_CFDI,	st_noCertificadoSAT,	st_noCertificadoCFDI,	st_uuid,	fch_fechaTimbrado,	st_qrCode,	st_selloCFDI,	st_selloSAT) VALUES (:id, :st_noCertificadoSAT,	:st_noCertificadoCFDI,	:st_uuid,	:fch_fechaTimbrado,	:st_qrCode,	:st_selloCFDI,	:st_selloSAT )";
          
          await sequelize.query(insertCfdiTimbrado, {
            replacements: { id, st_noCertificadoSAT: dataCfdiSellado.data.noCertificadoSAT,
              	 st_noCertificadoCFDI: `${dataCfdiSellado.data.noCertificadoCFDI}`,	st_uuid: `${dataCfdiSellado.data.uuid}`,	fch_fechaTimbrado: `${dataCfdiSellado.data.fechaTimbrado}`,	st_qrCode: `${dataCfdiSellado.data.qrCode}`,	st_selloCFDI: `${dataCfdiSellado.data.selloCFDI}`,	st_selloSAT: `${dataCfdiSellado.data.selloSAT}` },
          type: QueryTypes.INSERT // Use the appropriate type
          });

    

          let query_xml_name="SELECT st_nombreCrudoXML from tbl_cfdi where id_cfdi = :id";
          let query_result_xml_name = await sequelize.query(query_xml_name, {
            replacements: { id,
          type: sequelize.QueryTypes.SELECT // Use the appropriate type
          }});
          let xmlFileName=query_result_xml_name.shift();
          xmlFileName=xmlFileName.shift()

          xmlFileName=xmlFileName.st_nombreCrudoXML+".xml";

          let xml_cfdi=dataCfdiSellado.data.cfdi;        
          await BuildXML(xmlFileName, xml_cfdi);
  
          handleHttpResponse(res, dataCfdiSellado)
          resolve(dataCfdiSellado); // Resolve the promise with the data
        }
      });
    });
  } catch (error) {
    console.log("error message is ", error.message);
    throw error; // Rethrow the error to be caught by the caller
  }
}



module.exports = { timboxAuthenticateCtrl, timbrarXML_Ctrl };
