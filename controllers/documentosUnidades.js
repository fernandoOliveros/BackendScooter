const { documentosUnidadesModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

async function createDocumentosCtrl(req, res, next) {
  try {
    const filesPrueba = {
      // id_Unidad,
    };

    const dataDocs = await documentosUnidadesModel.create(filesPrueba); //only to generate id_Documento
    req.dataDocs = dataDocs; //attaches variable dataDocs to the global request
    //handleHttpResponse(res, dataDocs)
    next();
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
}

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
    //const arr = ["zero", "one", "two"];
    //convierto array en objeto
    const dataFiles = filenames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldnames[index]}`]: value };
    }, {});

    // objeto listo👇️️ {'key0': 'zero', 'key1': 'one', 'key2': 'two'}
    //console.log(dataFiles);

    const id_Unidad = parseInt(req.body.id_Unidad);
    const dataToUpdate = { id_Unidad, ...dataFiles };

    let id_Documento = req.dataDocs.dataValues.id_Documento;

    console.log(dataToUpdate);
    const dataUpdateDocumento = await documentosUnidadesModel.update(
      dataToUpdate,
      {
        where: { id_Documento: id_Documento },
      }
    );
    handleHttpResponse(res, dataUpdateDocumento);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_NEWNAMES_DOCS");
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

async function showDocumentosCtrl(req, res) {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDocumento = await documentosUnidadesModel.findByPk(id);
    if (!dataDocumento) {
      handleHttpError(res, `No existe documento con id: ${id}`, 404);
      return;
    } else {
      
    }
  } catch (e) {
    handleHttpError(res, "ERROR_SHOW_DOCUMENTOS")
  }
}

module.exports = {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  updateNewNameDocsCtrl,
  showDocumentosCtrl
};
