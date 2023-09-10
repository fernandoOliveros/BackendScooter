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

/**
 * @param {} req post  http://localhost:5000/api/timbox/security/authenticate...
 * @param {*} res   Query de la operacion
 */



async function timbrarXML_Ctrl(req, res) {
  try {
    //console.log(req)    
    let id = parseInt(req.params.id);

    console.log(`The id of the CFDI database is ${id}`);

    let query =
    `SELECT *  FROM tbl_cfdi WHERE id_CFDI= :id ;` ;


    const OperadorInformation = await sequelize.query(query, {
      replacements: { 
                    id: `${id}`},
      type: QueryTypes.SELECT,
    });    
    let rawXMLName = `${OperadorInformation[0].st_nombreCrudoXML}.xml`; 

    console.log(`timbrando  ${rawXMLName}`);
    
    fs.readFile(`./controllers/${rawXMLName}`, 'utf8', function (err, contents) {
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
        let generatedToken = "T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbXB3YVZxTHdOdHAwVXY2NTdJb1hkREtXTzE3dk9pMmdMdkFDR2xFWFVPUTQyWFhnTUxGYjdKdG8xQTZWVjFrUDNiOTVrRkhiOGk3RHladHdMaEM0cS8rcklzaUhJOGozWjN0K2h6R3gwQzF0c0g5aGNBYUt6N2srR3VoMUw3amtvPQ.T2lYQ0t4L0RHVkR4dHZ5Nkk1VHNEakZ3Y0J4Nk9GODZuRyt4cE1wVm5tbFlVcU92YUJTZWlHU3pER1kySnlXRTF4alNUS0ZWcUlVS0NhelhqaXdnWTRncklVSWVvZlFZMWNyUjVxYUFxMWFxcStUL1IzdGpHRTJqdS9Zakw2UGQ1MmJPVW1nQ2J3NDk0Tys0ZmorOUlmSjBncDR3UnRpTzBnNUd5UUVDUG5VZGNsR0dYM1hnb3QvQmo0dDFGb3JFeWlPbkVaeWhualVFaVp2aStaOWkycXBWWno3ZG1QTlphdTN6YldzOGJpSnJOMDVnb252bThPQ1g3TTBoemhnTnlXYWZyRENOWEx3STFjbm9WZ3hSSml3TDFyNWo4bDhRcGRMTmdOU3pMeVJDUnlydVh4SFQzRGZ5dEp0c3JGRTBiY25pQ2tJRlh2Sm9Fb1NOS2ZqS0Nic1VCUkJjVmVKN2ROYWtQdHBBdnN3Z3F4VGF6MktrQWRpcExlOFhFVTlmQ3hrUkxGMjhOOWJDYUFyQnhoK0hiK09ZaWR5R1dFaURVaTlwdzRKTk5wUGJwSUhPTWhQZEQydkpNZU0ybHE1UzlmcnhQNnJQcloyU3d3Y1J6UHFXbVZobEJoWWNYT1pXSzMvd1V6TUJOT1JHR2w3eVdwdEltV2lUL1VaeFI3TlE0RWpFd0pwckw3QVpRcDBacWhZeUlBPT0.w576ockOrX8LQVWkEC-J839M3NE_MZVsHWAJ8H77lKw"
        let params = { url : `${url}`, token: generatedToken }; // Set the appropriate parameters
        let stamp = StampService.Set(params);
        stamp.StampV4(xml, callback);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


// module.exports = {
//   timboxAuthenticateCtrl,
//   timbrarXML_Ctrl
// };







//const Authentication = require('sw-sdk-nodejs').Authentication;
// async function timboxAuthenticateCtrl(req, res){
  const timboxAuthenticateCtrl = async (req, res) => {
    try {
        console.log("enteting testCtrl")
      
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
        console.log(data)
        console.log("Successfully authenticated on Timbox")
        let dataToken = data;
        handleHttpResponse(res, data);

      }
    }
        
        auth.Token(callback);
    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_Authenticating_Timbox_Credentials");
    }


};


module.exports={timboxAuthenticateCtrl, timbrarXML_Ctrl};