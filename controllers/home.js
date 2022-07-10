const { matchedData } = require ("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { tracksModel } = require("../models");

/**
 * 
 * @param {} req  http://localhost:5000/api/home
 * @param {*} res   Aqui retornamos los valores del usuario, una vez que se ha verificado su token
 */

const homeCtrl = async (req, res) =>{
    const user = req.user;
    res.send({
        user,
        success: true
    })
}

module.exports = {homeCtrl};