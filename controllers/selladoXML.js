const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { sequelize } = require("../config/mysql");
//const { QueryTypes } = require("sequelize");
const { exec } = require("child_process"); //

async function RunPythonSelladoCtrl(req, res) {
  // Ruta al script de Python que deseas ejecutar
  const pythonScriptPath = "./controllers/pySelladoXML.py";

  // Comando para ejecutar el script de Python
  const command = `python ${pythonScriptPath}`;

 
  try {
    const { stdout } = await executeCommand(command);
    console.log(`Salida del script: ${stdout}`);

    // Parse the Python script's output to retrieve the certBase64 value
    certBase64 = stdout.trim(); // Trim any leading/trailing whitespace
  } catch (error) {
    console.error(`Error al ejecutar el script: ${error}`);
  }

  // Parse the Python script's output to retrieve the cert_base64 value
//   const certBase64 = stdout.trim(); // Trim any leading/trailing whitespace
//   return certBase64
}

async function GetCertBase64Ctrl(req, res) {
    // Ruta al script de Python que deseas ejecutar
    const pythonScriptPath = "./controllers/pySelladoXML.py";
  
    // Comando para ejecutar el script de Python
    const command = `python ${pythonScriptPath}`;
  
    try {
        const { stdout } = await executeCommand(command);
        console.log(`Salida del script: ${stdout}`);
    
        // Parse the Python script's output to retrieve the certBase64 value
        certBase64 = stdout.trim(); // Trim any leading/trailing whitespace
        return certBase64
    } catch (error) {
        console.error(`Error al ejecutar el script: ${error}`);
      }
}
  

function executeCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }


module.exports = {
    RunPythonSelladoCtrl,
    GetCertBase64Ctrl
};
