const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");
const fs = require('fs');
const path = require('path');

//const axios = require('axios');
const Authentication = require('sw-sdk-nodejs').Authentication;
// Leer archivo de configuración AMBIENTE DE DESARROLLO QA/PRO
const configPath = path.join(__dirname, '..', 'configQA.json');
const rawXMLlocation = path.join(__dirname, '..', 'storage/');
const configData = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configData);
const url = config.url;

const StampService = require('sw-sdk-nodejs').StampService; //Libreria para timbrar (o sellar)

/**
 * @param {} req  http://localhost:5000/api/timbox/security/...
 * @param {*} res   Query de la operacion
 */

const timboxAuthenticateCtrl = async (req, res) => {
  try {
    const user = config.user;
    const password = config.password;

    console.log(url, user, password)
    console.log("Authenticating...")
    let obj = {
      url : `${url}`,
      user: `${user}`,
      password: `${password}`,
    }
    
    let auth = Authentication.auth(obj);
    
    let callback = (err, data) => {
      if(err) {
        console.log(err)
      } else{
        //console.log(data)
        console.log("Successfully authenticated on Timbox")
        //let dataToken = data;
        handleHttpResponse(res, data);

      }
    };
    auth.Token(callback);
    
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_Authenticating_Timbox_Credentials");
  }
};


async function timbrarXML_Ctrl(req, res) {
  try {
    
    let { body, id } = req; //splits the request into two objects, id and body
    console.log(`${id}`);


    

    rawXMLName("query to test")
    
    console.log(`${rawXMLlocation}/${rawXMLName}`);
    fs.readFile(`${rawXMLlocation}/${rawXMLName}`, 'utf8', function (err, contents) {
      if (err) {
        let errRes = {
          status: 'error',
          message: err.message,
          messageDetail: err.message,
        };
        console.log(errRes);
      } else {
        var callback = (error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            console.log("test"); // Moved the console.log("test") inside the else block
          }
        };
        let xml = contents;
        let params = { url, token: generatedToken }; // Set the appropriate parameters
        let stamp = StampService.Set(params);
        stamp.StampV4(xml, callback);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  timboxAuthenticateCtrl,
  timbrarXML_Ctrl
};
