const {handleHttpError}= require('../utils/handleError');
const {verifyToken} = require("../utils/handleJwt")


/*
const authMiddleware(req, res, next){ //middleware, importante agregar el "next"
    const  authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //no nulo && indice 1 es donde esta el token, el 0 es Bearer
    if (!token ){
        return res.sendStatus(400);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err){
            return res.sendStatus(400);
        }
        req.user=user;
        next(); //para que siga el flujo del codigo
    });
}
*/

const authMiddleware=(req, res, next)=>{ 
    try {

        if(!req.headers.authorization){
            handleHttpError(res, "NO_TOKEN", 401)
            return
        }
    const  authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //no nulo && indice 1 es donde esta el token, el 0 es Bearer
    const dataToken =await verifyToken(token);
    //

    next();

    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports=authMiddleware;