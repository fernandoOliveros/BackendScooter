const { documentosOperadoresModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDocumentosCtrl = async (req, res, next) => {
  try {
    const dataEmpty = {
      // id_Unidad,
    };
    const dataRow = await documentosOperadoresModel.create(dataEmpty); //only to generate id_Documento
    req.dataRow = dataRow; //attaches variable dataDocs to the global request
    console.log(req.dataRow)
    //handleHttpResponse(res, dataDocs)
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

    // objeto listo👇️️ {'key0': 'zero', 'key1': 'one', 'key2': 'two'}
    //console.log(dataFiles);

    const id_Operador = parseInt(req.body.id_Operador);
    const dataToUpdate = { id_Operador, ...dataFiles };

    let id_Documento = req.dataRow.dataValues.id_Documento;

    console.log(dataToUpdate);
    const dataUpdateDocumento = await documentosOperadoresModel.update(
      dataToUpdate,
      {
        where: { id_Documento: id_Documento },
      }
    );
    handleHttpResponse(res, dataUpdateDocumento);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_RENAME_DOCS");
  }
};

const readDataToUpdateCtrl = async (req, res, next) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataRow = await documentosOperadoresModel.findByPk(id);
    if (!dataRow) {
      handleHttpError(res, `No existe documento con id: ${id}`, 404);
      return;
    }
    req.dataProof = 123; //attaches variable dataDocs to the global request
    //console.log(req.dataRow)
    next();
    //handleHttpResponse(res, dataDocumento);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DATA2UPDATE");
  }
}

const updateDocumentosCtrl = async (req, res) => {
  try {
    let { body, files, id } = matchedData(req); //splits the request into two objects, id and body
    //console.log(req.files)

    let fileNames = [];
    let fieldNames = [];
    for (const i in req?.files) {
      const [file] = req.files[i];
      let currentFileName = file.filename;
      let currentFieldName = file.fieldname;
      fileNames.push(currentFileName);
      fieldNames.push(currentFieldName);
    }
    //console.log(fileNames);
    //console.log(fieldNames);

    //const arr = ["zero", "one", "two"];

    const dataFiles = fileNames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldNames[index]}`]: value };
    }, {});
    // 👇️️ {'key0': 'zero', 'key1': 'one', 'key2': 'two'}
    //console.log(dataFiles);

    const id_Operador = parseInt(req.body.id_Operador);
    const dataUpdate = { id_Operador, ...dataFiles };
    console.log(dataUpdate);

    //const dataUp = { ...body, id_Operador };
    //let id_Documento = req.dataDocumento.dataValues.id_Documento;
    const dataUpdateDocumento = await documentosOperadoresModel.update(
      dataUpdate,
      {
        where: { id_Documento: id },
      }
    );

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
};
