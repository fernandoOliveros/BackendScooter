const { matchedData } = require ("express-validator");
const { usersModel } = require ('../models');
const {tokenSign } = require("../utils/handleJwt");
const { encrypte, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */

const registerCtrl = async (req, res)=>{
    try { //usamos un try catch para utilizar el manejador de errores handleError
    req = matchedData(req); //aqui aseguramos que la data venga correcta (curada)
    const password = await encrypte(req.password); //await is only valid in async functions
    const body = {...req, password} //Cambiamos el password plano (explicito) por el password encriptado
    const dataUser = await usersModel.create(body); //tipo stored procedure
    //dataUser.set("password", undefined, { strict : false}); 

    const data = {
        token: await tokenSign (dataUser),
        user: dataUser
    }
    res.send({ data: data })
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

/**
 * Este controlador es el encargado de logear un usuario
 * @param {*} req 
 * @param {*} res 
 */

const loginCtrl = async (req, res)=>{
    try{
        req=matchedData(req); //data curada, obtener solo los datos que necesitamos
        const user= await usersModel.findOne({
            where: { 
                email: req.email
            }
        }) //funcion tipo stored procedure, busca los datos del usuario segun el correo registrado en la bdd
        if(!user){
            handleHttpError(res, "Correo inválido", 404 );
            return
        }

        const hashPasword = user.get('password'); //revisar clase 20 min 5, porque el password no se debe regresar
        console.log({hashPasword})

        const check = await compare(req.password, hashPasword);
        if(!check){
            handleHttpError(res, "Contraseña incorrecta", 401 );
            return
        }
        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user), //mandar a llamar la funcion con await porque la madre es async
            user
        }

        res.send({data});
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_LGIN_USER", 404);
    }
}

module.exports = { loginCtrl, registerCtrl };