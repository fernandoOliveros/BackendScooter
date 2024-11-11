const { documentosRemolquesModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");

async function createDocumentosCtrl(req, res, next) {
  let id_Remolque = +req.body.id_Remolque;
  try {
    let dataToInsert = makeArrayFiles(req?.files);
    dataToInsert = { ...dataToInsert, id_Remolque: id_Remolque }; // añadimos el id_Remolque al arreglo
    let dataRow = documentosRemolquesModel.create(dataToInsert);
    handleHttpResponse(res, dataRow);
  } catch (error) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_DOCS REMOLQUE");
  }
  /*
    //! DEPRECATED
    try {
      const dataEmpty = {
        // id_Remolque,
      };
      const dataRow = await documentosRemolquesModel.create(dataEmpty); //only to generate id_Documento
      console.log(dataRow.dataValues)
      let idCreatedRow = dataRow.dataValues.id_Documento;
      const findDataRow = await documentosRemolquesModel.findByPk(idCreatedRow);
      req.findDataRow = findDataRow; //attaches variable dataDocs to the global request
      next();
    } catch (e) {
      console.log(e);
      handleHttpError(res, "ERROR_UPLOAD_DOCS");
    }
  */
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

    const id_Remolque = parseInt(req.body.id_Remolque);
    const dataToUpdate = { id_Remolque, ...dataFiles };

    let id_Documento = req.findDataRow.dataValues.id_Documento;

    const dataUpdateDocumento = await documentosRemolquesModel.update(
      dataToUpdate,
      {
        where: { id_Documento: id_Documento },
      }
    );
    const dataReadDocumento = await documentosRemolquesModel.findByPk(
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
    const findDataRow = await documentosRemolquesModel.findByPk(id);
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
    let id_Remolque = +req.body.id_Remolque; // body => id_Remolque
    let id = +req.params.id; // params /:id
    let dataRow = null;

    // armamos el arreglo para el UPDATE
    let dataToUpdate = makeArrayFiles(req?.files);
    // añadimos el id_Remolque al arreglo
    dataToUpdate = { ...dataToUpdate, id_Remolque: id_Remolque };

    console.log("Paramas: " + id);

    //Preguntamos si tiene registro, sino tiene generamos uno nuevo
    if(Number.isNaN(id)){
      dataRow = await documentosRemolquesModel.create(dataToUpdate);
    }else{
      //Buscamos el registro por el id_Remolque
      let findRowDocumento = await documentosRemolquesModel.findByPk(id);
      let id_Documento = findRowDocumento.dataValues.id_Documento;

      // UPDATE
      let dataUpdatedRow = await documentosRemolquesModel.update(dataToUpdate, {
        where: { id_Documento: id_Documento },
      });

      dataRow = await documentosRemolquesModel.findByPk(id_Documento);
      dataRow = { dataRow, status: `${dataUpdatedRow}` };
    }
    
    handleHttpResponse(res, dataRow);
  } catch (e) {
    console.log(e);
    handleHttpError(res,"ERROR_UPDATE_DOCS");
  }

  /*
  try {
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

    const id_Remolque = parseInt(req.body.id_Remolque);
    const dataToUpdate = { id_Remolque, ...dataFiles };

    let id_Documento = req.findDataRow.dataValues.id_Documento;

    console.log(dataToUpdate);

    const dataUpdatedRow = await documentosRemolquesModel.update(dataToUpdate, {
      where: { id_Documento: id_Documento },
    });
    let dataRow = await documentosRemolquesModel.findByPk(id_Documento);
    dataRow = { dataRow, status: `${dataUpdatedRow}` };
    handleHttpResponse(res, dataRow);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_REMOLQUE");
  }
  */
};

const readAllDocumentosCtrl = async (req, res) => {
  try {
    const dataAllDocumentos = await documentosRemolquesModel.findAll();
    handleHttpResponse(res, dataAllDocumentos);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_READ_DOCUMENTOS");
  }
};

const readDocumentoCtrl = async (req, res) => {
  try {
    let id_Documento = parseInt(req.params.id);
    const dataDocumento = await documentosRemolquesModel.findByPk(id_Documento);
    handleHttpResponse(res, dataDocumento);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
    let id_Documento = parseInt(req.params.id);
    const dataDeleteDocumentos = await documentosRemolquesModel.destroy({
      where: { id_Documento: id_Documento },
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
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
  updateNewNameDocsCtrl,
  readDataToUpdateCtrl,
};


