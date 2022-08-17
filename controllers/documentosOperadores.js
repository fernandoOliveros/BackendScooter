const { documentosOperadoresModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDocumentosCtrl = async (req, res, next) => {
  try {
    const dataEmpty = {};
    let dataRow = await documentosOperadoresModel.create(dataEmpty); //only to generate id_Documento
    let idCreatedRow = dataRow.dataValues.id_Documento;
    const foundDataRow = await documentosOperadoresModel.findByPk(idCreatedRow);
    req.foundDataRow = foundDataRow; //attaches variable dataDocs to the global request
    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const updateNewNameDocsCtrl = async (req, res) => {
  try {
    //handleHttpResponse(res, dataUpdateDocumento);
    let { body, files } = req; //splits the request into two objects, id and body
    let filenames = [];
    let fieldnames = [];
    for (const i in req?.files) {
      const [file] = req.files[i];
      let currentFileName = file.filename;
      let currentFieldName = file.fieldname;
      filenames.push(currentFileName);
      fieldnames.push(currentFieldName);
    }
    //convierto array en objeto
    const dataFiles = filenames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldnames[index]}`]: value };
    }, {});

    const id_Operador = parseInt(req.body.id_Operador);
    const dataToUpdate = { id_Operador, ...dataFiles };

    let id_Documento = req.foundDataRow.dataValues.id_Documento;

    console.log(dataToUpdate);
    await documentosOperadoresModel.update(dataToUpdate, {
      where: { id_Documento },
    });
    const dataReadDocumento = await documentosOperadoresModel.findByPk(
      id_Documento
    );
    handleHttpResponse(res, dataReadDocumento);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_RENAME_DOCS");
  }
};

const readDataToUpdateCtrl = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    const foundDataRow = await documentosOperadoresModel.findByPk(id);
    if (!foundDataRow) {
      handleHttpError(res, `No existe documento con id: ${id}`, 404);
      return;
    } else {
      req.foundDataRow = foundDataRow; //attaches variable dataDocs to the global request
      next();
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DATA2UPDATE");
  }
};

const updateDocumentosCtrl = async (req, res) => {
  try {
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

    const id_Operador = parseInt(req.body.id_Operador);
    const dataToUpdate = { id_Operador, ...dataFiles };

    let id_Documento = req.foundDataRow.dataValues.id_Documento;

    console.log(dataToUpdate);

    const dataUpdatedRow = await documentosOperadoresModel.update(
      dataToUpdate,
      {
        where: { id_Documento },
      }
    );
    let dataRow = await documentosOperadoresModel.findByPk(id_Documento);
    dataRow = { dataRow, status: `${dataUpdatedRow}` };
    handleHttpResponse(res, dataRow);
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
    if (!dataDocumento) {
      handleHttpError(res, `No existe documento con id: ${id}`, 404);
      return;
    } else {
      handleHttpResponse(res, dataDocumento);
    }
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    console.log(id);
    const dataDeleteDocumentos = await documentosOperadoresModel.destroy({
      where: { id_Documento: id },
    });
    handleHttpResponse(res, dataDeleteDocumentos);
  } catch (e) {
    console.log(e);
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
  updateDocumentosCtrl,
};
