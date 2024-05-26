const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

//aqui verificamos la autorization por bearer Token

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NO_TOKEN", 401);
      return;
    }
    const authHeader = req.headers["authorization"];

    // console.log("authHeader is", authHeader)
    const token = authHeader && authHeader.split(" ")[1]; //no nulo && indice 1 es donde esta el token, el 0 es Bearer
    // console.log("token is", token)
    
    const dataToken = await verifyToken(token);
    // console.log("dataToken is", dataToken)
    //console.log(dataToken.id_User)
    if (!dataToken.id_User) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }

    const user = await usersModel.findOne({
      where: {
        id_User: dataToken.id_User,
      },
    });
    req.user = user;
    next();
  } catch (e) {
    console.log(e)
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = { authMiddleware };
