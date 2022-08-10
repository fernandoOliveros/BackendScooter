const { documentosUnidadesModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
//const { sequelize } = require("../config/mysql");
//const { QueryTypes } = require("sequelize");

async function createDocumentosCtrl(req, res, next) {
  try {
    const dataEmpty = {
      // id_Unidad,
    };

    const dataRow = await documentosUnidadesModel.create(dataEmpty); //only to generate id_Documento
    let idCreatedRow = dataRow.dataValues.id_Documento;

    const findDataRow = await documentosUnidadesModel.findByPk(idCreatedRow);

    req.findDataRow = findDataRow; //attaches variable dataDocs to the global request
    next();
  } catch (e) {
    let idRowToDelete = findDataRow.dataValues.id_Documento;
    const dataDeleteDocumentos = await documentosUnidadesModel.destroy({
      where: { id_Documento: idRowToDelete },
    });
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
}

const updateNewNameDocsCtrl = async (req, res) => {
  try {
    let { body, files } = req; //splits the request into two objects, id and body
    let fileNames = [];
    let fieldNames = [];
    for (const i in req?.files) {
      const [file] = req.files[i];
      let currentFileName = file.filename;
      let currentFieldName = file.fieldname;
      fileNames.push(currentFileName);
      fieldNames.push(currentFieldName);
    }
    const dataFiles = fileNames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldNames[index]}`]: value };
    }, {});

    const id_Unidad = parseInt(req.body.id_Unidad);
    const dataToUpdate = { id_Unidad, ...dataFiles };

    let id_Documento = req.findDataRow.dataValues.id_Documento;

    const dataUpdateDocumento = await documentosUnidadesModel.update(
      dataToUpdate,
      {
        where: { id_Documento: id_Documento },
      }
    );
    const dataReadDocumento = await documentosUnidadesModel.findByPk(
      id_Documento
    );

    handleHttpResponse(res, dataReadDocumento);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_NEWNAMES_DOCS");
  }
};

async function readDataToUpdateCtrl(req, res, next) {
  try {
    let id = parseInt(req.params.id);
    const findDataRow = await documentosUnidadesModel.findByPk(id);
    //req.findDataRow = findDataRow;
    req.findDataRow = findDataRow;
    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_ROWDATA");
  }
}

const updateDocumentosCtrl = async (req, res) => {
  try {
    /*
    let { body, files } = matchedData(req); //splits the request into two objects, id and body
    let id_Documento = req.findDataRow.dataValues.id_Documento;
    let id_Unidad = parseInt(req.body.id_Unidad);
    let [url_TarjetaCirculacion] = req.files.url_TarjetaCirculacion || "null";
    let [url_Factura] = req.files.url_Factura || "null";
    let [url_PermisoSCT] = req.files.url_PermisoSCT || "null";

    url_TarjetaCirculacion = url_TarjetaCirculacion.filename || null;
    url_Factura = url_Factura.filename || null;
    url_PermisoSCT = url_PermisoSCT.filename || null;

    let dataToUp = {
      id_Unidad,
      url_TarjetaCirculacion,
      url_Factura,
      url_PermisoSCT,
    };
    console.log(dataToUp);

    const dataUpdatedRow = await documentosUnidadesModel.update(dataToUp, {
      where: { id_Documento },
    });
    let dataFiles = await documentosUnidadesModel.findByPk(id_Documento);
    dataFiles = { dataFiles, status: `${dataUpdatedRow}` };
    handleHttpResponse(res, dataFiles);
    */

    //let id_Documento = parseInt(req.params.id);
    let { body, files, id } = matchedData(req); //splits the request into two objects, id and body

    let fileNames = [];
    let fieldNames = [];
    for (const i in req?.files) {
      const [file] = req.files[i];
      let currentFileName = file.filename;
      let currentFieldName = file.fieldname;
      fileNames.push(currentFileName);
      fieldNames.push(currentFieldName);
    }
    //convierto array en objeto
    const dataFiles = fileNames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldNames[index]}`]: value };
    }, {});

    const id_Unidad = parseInt(req.body.id_Unidad);
    const dataToUpdate = { id_Unidad, ...dataFiles };

    let id_Documento = req.findDataRow.dataValues.id_Documento;

    console.log(dataToUpdate);

    const dataUpdatedRow = await documentosUnidadesModel.update(dataToUpdate, {
      where: { id_Documento: id_Documento },
    });
    let dataRow = await documentosUnidadesModel.findByPk(id_Documento);
    dataRow = { dataRow, status: `${dataUpdatedRow}` };
    handleHttpResponse(res, dataRow);
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
    let id_Documento = parseInt(req.params.id);
    const dataDocumento = await documentosUnidadesModel.findByPk(id_Documento);
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
  updateNewNameDocsCtrl,
  readDataToUpdateCtrl,
};
