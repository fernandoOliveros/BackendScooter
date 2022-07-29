const { documentosUnidadesModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDocumentosCtrl = async (req, res) => {
  try {
    const { files, body } = req;
    let id_Unidad = parseInt(body.id_Unidad); //el POSTMAN lo manda como string
    let [dataTarjetaCirculacion] = files["url_TarjetaCirculacion"];
    let [dataFactura] = files["url_Factura"];
    let [dataPermisoSCT] = files["url_PermisoSCT"];

    const filesData = {
      id_Unidad,
      url_TarjetaCirculacion: `${dataTarjetaCirculacion.filename}`,
      url_Factura: `${dataFactura.filename}`,
      url_PermisoSCT: `${dataPermisoSCT.filename}`,
    };
    const dataDocs = await documentosUnidadesModel.create(filesData);
    handleHttpResponse(res, dataDocs);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const updateDocumentosCtrl = async (req, res) => {
  try {
    let { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const id_Unidad = parseInt(req.body.id_Unidad);
    body = { ...body, id_Unidad };
    const dataUpdateDocumento = await documentosUnidadesModel.update(body, {
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
    const dataAllDocumentos = await documentosUnidadesModel.findAll();
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
    const dataDocumento = await documentosUnidadesModel.findByPk(id);
    handleHttpResponse(res, dataDocumento);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteDocumentos = await documentosUnidadesModel.destroy({
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
