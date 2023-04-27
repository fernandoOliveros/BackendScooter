const { matchedData } = require("express-validator");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { clientesModel, empresasModel } = require("../models");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

/**
 * @param {} req  http://localhost:5000/api/clientes/...
 * @param {*} res   Query de la operacion
 */



const createclienteCtrl = async (req, res) => {
  try {
    const body = matchedData(req); //la data del request venga curada
    const datacliente = await clientesModel.create(body);
    handleHttpResponse(res, datacliente);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_cliente");
  }
};

const updateclienteCtrl = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const datacliente = await clientesModel.findByPk(id);
    if (!datacliente) {
      handleHttpError(res, `No existe clientee con id: ${id}`, 404);
      return;
    }
    const dataUpdatecliente = await clientesModel.update(body, {
      where: { id_cliente: id },
    });
    handleHttpResponse(res, dataUpdatecliente);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_cliente");
  }
};

const readAllClientesCtrl = async (req, res) => {
  try {
    console.log("\nPrinting READ CLIENTS CONTROLERS")

    let query =
      "SELECT * " +
      "FROM `tbl_clientes`";
    const dataReadAllclientesModified = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    handleHttpResponse(res, dataReadAllclientesModified);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_clienteS");
  }
};

const readclienteCtrl = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const datacliente = await clientesModel.findByPk(id);
    if (!datacliente) {
      handleHttpError(res, `No existe clientee con id: ${id}`, 404);
      return;
    } else {
      let query=`SELECT * FROM tbl_clientes AS clientes
      INNER JOIN tbl_empresas AS empresas
      ON clientes.id_Empresa = empresas.id_Empresa
      WHERE clientes.id_Cliente = :id`;
      const dataclienteModified =await sequelize.query(query, {replacements: { id: `${id}` },
      type: QueryTypes.SELECT});
      handleHttpResponse(res, dataclienteModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_OclienteE");
  }
};

const deleteclienteCtrl = async (req, res) => {
  try {
    id = parseInt(req.params.id);
    const dataclientee = await clientesModel.findByPk(id);
    if (!dataclientee) {
      handleHttpError(res, `No existe clientee con id: ${id}`, 404);
      return;
    } else {
      let query =
        "UPDATE `tbl_clientes` SET `id_Candado`='0' WHERE `id_cliente`=:id;";
      const statusDeleteclientee = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.UPDATE,
      });
      let getLogicStatus = statusDeleteclientee.pop();
      let dataRow = await clientesModel.findByPk(id);
      dataRow = { dataRow, status: `${getLogicStatus}` };
      handleHttpResponse(res, dataRow);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_clienteE");
  }
};

const readclientesEmpresaCtrl = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("\nid empresa", id)
    const dataEmpresa = await empresasModel.findByPk(id);
    if (!dataEmpresa) {
      handleHttpError(res, `No existe empresa con id: ${id}`, 404);
      return;
    } else {
    console.log("\n\n doing query", id)

      let query =
        "SELECT `clientes`.*, `empresa`.`id_Empresa`" +
        "FROM `tbl_clientes` as `clientes`" +
        "INNER JOIN  `tbl_empresas` as `empresa`" +
        "ON `empresa`.`id_Empresa`= `clientes`.`id_Empresa`" +
        "WHERE `empresa`.`id_Empresa`=:id " +
        "AND `clientes`.`id_Candado` = 1;";
      const dataclienteeModified = await sequelize.query(query, {
        replacements: { id: `${id}` },
        type: QueryTypes.SELECT,
      });
      handleHttpResponse(res, dataclienteeModified);
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_clienteES-EMPRESA");
  }
};




module.exports = {
  createclienteCtrl,
  updateclienteCtrl,
  readAllClientesCtrl,
  readclienteCtrl,
  deleteclienteCtrl,
  readclientesEmpresaCtrl,
};
