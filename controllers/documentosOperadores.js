const { documentosOperadoresModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { sequelize } = require("../config/mysql");
const { QueryTypes } = require("sequelize");

 const saveDocumentosCtrl = async (req, res) => {
  let id_Operador = +req.body.id_Operador;
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No se subieron archivos" });
    }
    // armamos el arreglo para el INSERT
    let dataToInsert = makeArrayFiles(req?.files);
    dataToInsert = { ...dataToInsert, id_Operador: id_Operador }; // añadimos el idUnidad al arreglo
    let dataRow = await documentosOperadoresModel.create(dataToInsert);
    handleHttpResponse(res, dataRow);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_DOCS_OPERADOR");
  }
}

const updateDocuments = async (req, res) => {
  try {
    let id_Operador = +req.body.id_Operador; // id_Operador
    console.log(id_Operador);
    let id = +req.params.id; // idDocumento
    console.log(id);
    let dataRow = null;

    // armamos el arreglo para el UPDATE
    let dataToUpdate = makeArrayFiles(req?.files);
    // añadimos el id_Operador al arreglo
    dataToUpdate = { ...dataToUpdate, id_Operador: id_Operador };
    //Preguntamos si tiene registro, sino tiene generamos uno nuevo
    if(Number.isNaN(id)){
      dataRow = await documentosOperadoresModel.create(dataToUpdate);
    }else{
      //Buscamos el registro por el id_Operador
      let findRowDocumento = await documentosOperadoresModel.findByPk(id);
      let id_Documento = findRowDocumento.dataValues.id_Documento;

      // UPDATE
      let dataUpdatedRow = await documentosOperadoresModel.update(dataToUpdate, {
        where: { id_Documento: id_Documento },
      });

      dataRow = await documentosOperadoresModel.findByPk(id_Documento);
      dataRow = { dataRow, status: `${dataUpdatedRow}` };
    }
    handleHttpResponse(res, dataRow);
  } catch (e) {
    console.log(e);
    handleHttpError(res,"ERROR_UPDATE_DOCS");
  }
}

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

const readDocumentosByOperador = async(req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    let query = "SELECT * FROM tbl_docs_operadores WHERE id_Operador=:id;";
    const dataDocsOperador = await sequelize.query(query, {
      replacements: { id: `${id}` },
      type: QueryTypes.SELECT,
    });
    handleHttpResponse(res, dataDocsOperador);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_READ_DOCS_OPERADOR");
  }
}

const deleteDocumentosCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const dataDeleteDocumentos = await documentosOperadoresModel.destroy({
      where: { id_Documento: id },
    });
    handleHttpResponse(res, dataDeleteDocumentos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_DOCUMENTO");
  }
};

const makeArrayFiles = (files) => {
  let arrayFiles = [];
  // armamos el arreglo para el UPDATE
  for (const i in files) {
    let [file] = files[i];
    arrayFiles = {...arrayFiles, [file.fieldname]: file.filename};
  }
  return arrayFiles;
}

module.exports = {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  updateNewNameDocsCtrl,
  readDataToUpdateCtrl,
  updateDocumentosCtrl,
  saveDocumentosCtrl,
  readDocumentosByOperador,
  updateDocuments,
};
