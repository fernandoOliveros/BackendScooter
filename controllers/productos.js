const {handleHttpResponse} = require('../utils/handleResponse')
const {handleHttpError } = require('../utils/handleError')
const {sequelize} = require('../config/mysql')
const { QueryTypes} = require('sequelize')

async function readClaveProductoServicioCtrl(req, res){
    try {
        let sql = "CALL readAllClaveUnidadPeso()";
        console.log('Hola')
        await sequelize.query("CALL readAllClaveUnidadPeso()", true,function (error, result) { 
            console.log('inside query')
            console.log(result)
        })


       
    }catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_READ_CLAVE-PRODUCTO-SERVICIO")
    }

  } 

module.exports = { readClaveProductoServicioCtrl }