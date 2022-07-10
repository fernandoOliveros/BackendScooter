const { matchedData } = require ("express-validator");
const  Dbmanager = require ('../models/mysql/users');
const tokenSign  = require("../utils/handleJwt");
const { encrypte, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */

const getUsersCtrl = async (req, res) =>{
    try {
        console.log('works');
        //const proofConn = new Dbmanager('localhost', 'root', '', 'scooterprueba');
        //await (await proofConn.getConnection()).getUsers;
        const proofConn = new Dbmanager();
        const nombre = await proofConn.getAllFrom('users');
        //res.send(nombre);
        console.log(nombre);
    } catch (e) {
        console.log(e)
        handleHttpError(res, "Error to retrieve data", 404)
    }
}

const registerCtrl = async (req, res)=>{
    try {
        const allUsers = await dbManager.getUsers; 
        console.log(allUsers)
        res.status(200).json(allUsers)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "Error ", 404)
    }




    /*try { //usamos un try catch para utilizar el manejador de errores handleError
    req = matchedData(req); //aqui aseguramos que la data venga correcta (curada)
    
    const user= await usersModel.findOne({
        where: { 
            email: req.email
        }
    })
    
    if(user){
        handleHttpError(res, "Ya existe un usuario registrado con ese correo", 401 );
        return
    }
    
    const password = await encrypte(req.password); //await is only valid in async functions
    const body = {...req, password} //Cambiamos el password plano (explicito) por el password encriptado
    const dataUser = await usersModel.create(body); //tipo stored procedure
    //dataUser.set("password", undefined, { strict : false}); 

    const data = {
        token: await tokenSign (dataUser),
        user: dataUser,
        sucess: true
    }
    res.send({ data: data })

    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }*/
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
        //console.log({hashPasword}) //solo para verificar el hash

        const check = await compare(req.password, hashPasword);
        if(!check){
            handleHttpError(res, "Contraseña incorrecta", 401 );
            return
        }
        user.set('password', undefined, {strict:false})
        const data = {
            token: await tokenSign(user), //mandar a llamar la funcion con await porque la madre es async
            user,
            sucess: true
        }

        res.send({data});
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER", 404);
    }
}

module.exports = { loginCtrl, registerCtrl, getUsersCtrl};