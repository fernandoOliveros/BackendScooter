const {handleHttpError}= require('../utils/handleError');
const {verifyToken} = require("../utils/handleJwt")
const { usersModel } = require ('../models')

//aqui verificamos la autorization por bearer Token

const authMiddleware= async (req, res, next)=>{ 
    try {

        if(!req.headers.authorization){
            handleHttpError(res, "NO_TOKEN", 401)
            return
        }
    const  authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //no nulo && indice 1 es donde esta el token, el 0 es Bearer
    const dataToken =await verifyToken(token);
    
    if(!dataToken.id){
        handleHttpError(res, "ERROR_ID_TOKEN", 401)
        return
    }

    const user =  await usersModel.findOne({
        where: { 
            id: dataToken.id
        }
    })

    req.user = user

    next();

    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports={authMiddleware};