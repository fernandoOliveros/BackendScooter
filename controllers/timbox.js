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

async function timbrarXML_Ctrl(req, res) {
  try {
    let id = parseInt(req.params.id);
    console.log(`The id of the CFDI database is ${id}`);

    let query = `SELECT * FROM tbl_cfdi WHERE id_CFDI = :id;`;

    const OperadorInformation = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });
    let rawXMLName = `${OperadorInformation[0].st_nombreCrudoXML}.xml`;

    console.log(`timbrando  ${rawXMLName}`);

    const contents = fs.readFileSync(`./storage/documentos/${rawXMLName}`, 'utf8');
    const generatedToken = await timboxAuthenticateCtrl();

    console.log("the token in timbrar controller is ", generatedToken);

    let xml = contents;
    let params = { url: `${url}`, token: generatedToken };
    let stamp = StampService.Set(params);
    stamp.StampV4(xml, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        console.log("test");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const util = require('util');

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


module.exports = { timboxAuthenticateCtrl, timbrarXML_Ctrl };
