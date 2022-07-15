const { handleHttpResponse} = require("../utils/handleResponse");
const { handleHttpError} = require("../utils/handleError");

/**
 * @param {} req  http://localhost:5000/api/home
 * @param {*} res   Aqui retornamos los valores del usuario, una vez que se ha verificado su token
 */

const homeCtrl = async (req, res) => {
  try {
    const user = req.user;
    handleHttpResponse(res, user)
  } catch (e) {
    handleHttpError(res, "ERROR_TOKEN_VERIFICATION", 402);
  }
};

module.exports = { homeCtrl };
