const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { tiposUnidadesModel } = require("../models/index");

/**
 * @param {GET} req  http://localhost:5000/api/tiposUnidades/read
 * @param {*} res   Query para leer todo el tipo de unidades (SAT DB)
 */

const readAllTiposUnidadesCtrl = async (req, res) => {
  try {
    const tiposUnidadesData = await tiposUnidadesModel.findAll();
    handleHttpResponse(res, tiposUnidadesData);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_TIPOS-UNIDADES");
  }
};

module.exports = { readAllTiposUnidadesCtrl };
