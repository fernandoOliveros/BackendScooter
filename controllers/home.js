const { matchedData } = require ("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { tracksModel } = require("../models");

/*const { usersModel } = require ('../models');
const {tokenSign } = require("../utils/handleJwt");
const { encrypte, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError"); */

const homeCtrl = async (req, res) =>{
    const user = req.user;
    res.send({
        user,
        sucess: true
    })
}

module.exports = {homeCtrl};