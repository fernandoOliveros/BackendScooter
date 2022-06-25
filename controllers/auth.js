const { matchedData } = require ("express-validator");
const { usersModel } = require ('../models');
const {tokenSign } = require("../utils/handleJwt");
const { encrypte } = require("../utils/handlePassword");

const loginCtrl = async (req, res)=>{
    req = matchedData(req); //aqui aseguramos que la data venga correcta
    const password = await encrypte(req.password); //await is only valid in async functions
    const body = {...req, password} //Cambiamos el password plano (explicito) por el password encriptado
    const dataUser = await usersModel.create(body);
    //dataUser.set("password", undefined, { strict : false});

    const data = {
        token: await tokenSign (dataUser),
        user: dataUser
    }

    res.send({ data: data })
}

module.exports = loginCtrl;