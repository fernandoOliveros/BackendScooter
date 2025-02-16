const { documentosUnidadesModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

async function saveDocumentosCtrl(req, res) {
  let id_Unidad = +req.body.id_Unidad;
  try {
    // armamos el arreglo para el INSERT
    let dataToInsert = makeArrayFiles(req?.files);
    dataToInsert = { ...dataToInsert, id_Unidad: id_Unidad }; // añadimos el idUnidad al arreglo
    let dataRow = await documentosUnidadesModel.create(dataToInsert);
    handleHttpResponse(res, dataRow);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_DOCS");
  }
}

const updateNew = async (req, res) => {
  try {
    let id_Unidad = +req.body.id_Unidad; // body => id_Unidad
    let id = +req.params.id; // params /:id
    let dataRow = null;

    // armamos el arreglo para el UPDATE
    let dataToUpdate = makeArrayFiles(req?.files);
    // añadimos el id_Unidad al arreglo
    dataToUpdate = { ...dataToUpdate, id_Unidad: id_Unidad };

    console.log("Paramas: " + id);

    //Preguntamos si tiene registro, sino tiene generamos uno nuevo
    if(Number.isNaN(id)){
      dataRow = await documentosUnidadesModel.create(dataToUpdate);
    }else{
      //Buscamos el registro por el id_Unidad
      let findRowDocumento = await documentosUnidadesModel.findByPk(id);
      let id_Documento = findRowDocumento.dataValues.id_Documento;

      // UPDATE
      let dataUpdatedRow = await documentosUnidadesModel.update(dataToUpdate, {
        where: { id_Documento: id_Documento },
      });

      dataRow = await documentosUnidadesModel.findByPk(id_Documento);
      dataRow = { dataRow, status: `${dataUpdatedRow}` };
    }
    handleHttpResponse(res, "");
  } catch (e) {
    console.log(e);
    handleHttpError(res,"ERROR_UPDATE_DOCS");
  }
}

const readAllDocumentosCtrl = async (req, res) => {
  try {
    let dataAllDocumentos = await documentosUnidadesModel.findAll();
    handleHttpResponse(res, dataAllDocumentos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DOCUMENTOS");
  }
};

const readDocumentoCtrl = async (req, res) => {
  try {
    let id_Documento = req.params.id;
    let dataDocumento = null;
    if(id_Documento !== null){
      dataDocumento = await documentosUnidadesModel.findByPk(+id_Documento);
    }
    handleHttpResponse(res, dataDocumento);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    let { id } = req;
    let dataDeleteDocumentos = await documentosUnidadesModel.destroy({
      where: { id_Documento: id },
    });
    handleHttpResponse(res, dataDeleteDocumentos);
  } catch (e) {
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
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  saveDocumentosCtrl,
  updateNew
};
