const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { encrypte, compare } = require("../utils/handlePassword");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const {Authentication} = require("sw-sdk-nodejs").Authentication;


/**
 * Este controlador es el encargado de registrar un usuario
 * Este controlador es el encargado de logear un usuario
 * @param {*} req
 * @param {*} res
 */



const registerCtrl = async (req, res) => {
  try {
    //usamos un try catch para utilizar el manejador de errores handleError
    req = matchedData(req); //aqui aseguramos que la data venga correcta (curada)
    const user = await usersModel.findOne({
      where: {
        st_Email: req.st_Email,
      },
    });
    if (user) {
      handleHttpError(
        res,
        "Ya existe un usuario registrado con ese correo",
        401
      );
      return;
    }

    const st_Password = await encrypte(req.st_Password); //await is only valid in async functions
    const body = { ...req, st_Password }; //Cambiamos el password plano (explicito) por el password encriptado
    const dataUser = await usersModel.create(body); //tipo stored procedure
    //dataUser.set("password", undefined, { strict : false});  //para ocultar el password en la response

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    handleHttpResponse(res, data);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};



const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req); //data curada, obtener solo los datos que necesitamos
    const user = await usersModel.findOne({
      where: {
        st_Email: req.st_Email,
      },
    }); //funcion tipo stored procedure, busca los datos del usuario segun el correo registrado en la bdd
    if (!user) {
      handleHttpError(res, "Correo inválido", 404);
      return;
    }

    const hashPassword = user.get("st_Password"); //revisar clase 20 min 5, porque el password no se debe regresar
    //console.log(req.st_Password) //solo para verificar el hash

    const check = await compare(req.st_Password, hashPassword);
    if (!check) {
      handleHttpError(res, "Contraseña incorrecta", 401);
      return;
    }
    //user.set('st_Password', undefined, {strict:false})
    const data = {
      token: await tokenSign(user), //mandar a llamar la funcion con await porque la madre es async
      user,
    };
    handleHttpResponse(res, data);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER", 404);
  }
};

const cfdiCtrl = async (req, res) => {
  try {
    let obj = req.body;
    console.log(obj)
    let auth = Authentication.auth(obj);

    let callback = (err, data) => {
        if(err) {
            console.log(err)
        } else{
            console.log(data)
        }
    };
    const data=auth.Token(callback);
    handleHttpResponse(res, data)
    
  } catch (error) {
    console.log(error)
    handleHttpError(res, error)
  }

}

module.exports = { loginCtrl, registerCtrl, cfdiCtrl };
