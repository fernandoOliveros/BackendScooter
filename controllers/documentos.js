const { documentosModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");


const createDocumentosCtrl = async (req, res) => {
  try {
    const { files } = req;
    let [dataTarjetaCirculacion] = files["url_TarjetaCirculacion"];
    let [dataFactura] = files["url_Factura"];
    let [dataPermisoSCT] = files["url_PermisoSCT"];

    const filesData = {
      //id_Unidad : 11,
      url_TarjetaCirculacion: `${dataTarjetaCirculacion.filename}`,
      url_Factura: `${dataFactura.filename}`,
      url_PermisoSCT: `${dataPermisoSCT.filename}`,
    };
    const dataDocs = await documentosModel.create(filesData);
    handleHttpResponse(res, dataDocs);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const updateDocumentosCtrl = async (req, res) => {
  try {
    /*const { id, ...body } = matchedData(req); //splits the request into two objects, id and body
    const dataUpdateUnidad = await unidadesModel.update(body, {
      where: { id: id },
    });
    handleHttpResponse(res, dataUpdateUnidad);*/
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const readAllDocumentosCtrl = async (req, res) => {
  try {
    const dataAllDocumentos = await documentosModel.findAll();
    handleHttpResponse(res, dataAllDocumentos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_DOCUMENTOS");
  }
};

const readDocumentoCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDocumento = await documentosModel.findByPk(id);
    handleHttpResponse(res, dataDocumento);
  } catch (e) {
    handleHttpError(res, "ERROR_GET_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteDocumentos = await documentosModel.destroy({ where: { id: id } });
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
