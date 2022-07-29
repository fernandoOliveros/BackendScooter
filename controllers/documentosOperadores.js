const { documentosOperadoresModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDocumentosCtrl = async (req, res) => {
  try {
    const { files, body } = req;
    let id_Operador = parseInt(body.id_Operador); //el POSTMAN lo manda como string
    let [dataSolicitudEmpleo] = files["url_SolicitudEmpleo"];
    let [dataCURP] = files["url_CURP"];
    let [dataRFC] = files["url_RFC"];
    let [dataComprobanteDom] = files["url_ComprobanteDom"];

    const filesData = {
      id_Operador,
      url_SolicitudEmpleo: `${dataSolicitudEmpleo.filename}`,
      url_CURP: `${dataCURP.filename}`,
      url_RFC: `${dataRFC.filename}`,
      url_ComprobanteDom: `${dataComprobanteDom.filename}`,
    };
    const dataDocs = await documentosOperadoresModel.create(filesData);
    handleHttpResponse(res, dataDocs);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const updateDocumentosCtrl = async (req, res) => {
  try {
    let { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const id_Operador = parseInt(req.body.id_Operador);
    body = { ...body, id_Operador };
    const dataUpdateDocumento = await documentosOperadoresModel.update(body, {
      where: { id_Documento: id },
    });
    handleHttpResponse(res, dataUpdateDocumento);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const readAllDocumentosCtrl = async (req, res) => {
  try {
    const dataAllDocumentos = await documentosOperadoresModel.findAll();
    handleHttpResponse(res, dataAllDocumentos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DOCUMENTOS");
  }
};

const readDocumentoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDocumento = await documentosOperadoresModel.findByPk(id);
    handleHttpResponse(res, dataDocumento);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteDocumentos = await documentosOperadoresModel.destroy({
      where: { id_Documento: id },
    });
    handleHttpResponse(res, dataDeleteDocumentos);
  } catch (e) {
    handleHttpError(res, "ERROR_DELETE_DOCUMENTO");
  }
};

module.exports = {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
};
