const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { coloniasModel } = require("../models/index");

/**
 * @param {GET} req  http://localhost:5000/api/tiposUnidades/read
 * @param {*} res   Query para leer todo el tipo de unidades (SAT DB)
 */

const readAllColoniasCtrl = async (req, res) => {
  try {
    const dataColonias = await coloniasModel.findAll();
    handleHttpResponse(res, dataColonias);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_COLONIAS");
  }
};

module.exports = { readAllColoniasCtrl };
