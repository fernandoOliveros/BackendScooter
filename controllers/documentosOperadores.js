const { documentosOperadoresModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDocumentosCtrl = async (req, res) => {
  try {
    let { body, files } = matchedData(req); //splits the request into two objects, id and body
    let filenames = [];
    let fieldnames = [];
    for (const i in req?.files) {
      const [file] = req.files[i];
      let cart = file.filename;
      let cart2 = file.fieldname;
      filenames.push(cart);
      fieldnames.push(cart2);
    }
    //const arr = ["zero", "one", "two"];
    //convierto array en objeto
    const dataFiles = filenames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldnames[index]}`]: value };
    }, {});

    // objeto listo👇️️ {'key0': 'zero', 'key1': 'one', 'key2': 'two'}
    //console.log(obj4);

    const id_Operador = parseInt(req.body.id_Operador);
    const dataCreateOperador = { id_Operador, ...dataFiles };
    console.log(dataCreateOperador);

    const dataOperador = await documentosOperadoresModel.create(
      dataCreateOperador
    );
    handleHttpResponse(res, dataOperador);

    /*const { files, body } = req;
    let id_Operador = parseInt(body.id_Operador); //el POSTMAN lo manda como string
    let [dataSolicitudEmpleo] = files["url_SolicitudEmpleo"];
    let [dataCURP] = files["url_CURP"];
    let [dataComprobanteDom] = files["url_ComprobanteDom"];

    let filesData = {
      id_Operador,
      url_SolicitudEmpleo: `${dataSolicitudEmpleo.filename}`,
      url_CURP: `${dataCURP.filename}`,
      url_ComprobanteDom: `${dataComprobanteDom.filename}`,
    };
    const [url_RFC] = files["url_RFC"] ? files["url_RFC"] : "0";
    if ([url_RFC] == "0") {
      const dataDocss = await documentosOperadoresModel.create(filesData);
      handleHttpResponse(res, dataDocss);
    } else {
      const filesOperadores = { ...filesData, url_RFC: `${url_RFC.filename}` };
      const dataDocs = await documentosOperadoresModel.create(filesOperadores);
      handleHttpResponse(res, dataDocs);
    }*/
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const updateDocumentosCtrl = async (req, res) => {
  try {
    let { body, files, id } = matchedData(req); //splits the request into two objects, id and body

    let filenames = [];
    let fieldnames = [];
    for (const i in req?.files) {
      const [aa] = req.files[i];
      let cart = aa.filename;
      let cart2 = aa.fieldname;
      //console.log(aa.filename);
      filenames.push(cart);
      fieldnames.push(cart2);
    }
    console.log(filenames);
    console.log(fieldnames);

    //const arr = ["zero", "one", "two"];

    const obj4 = filenames.reduce((accumulator, value, index) => {
      return { ...accumulator, [`${fieldnames[index]}`]: value };
    }, {});

    // 👇️️ {'key0': 'zero', 'key1': 'one', 'key2': 'two'}
    //console.log(obj4);

    const id_Operador = parseInt(req.body.id_Operador);
    const dataUpdate = { id_Operador, ...obj4 };
    console.log(dataUpdate);

    //const dataUp = { ...body, id_Operador };

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
    handleHttpResponse(res, dataDocumento);
  } catch (e) {
    handleHttpError(res, "ERROR_READ_DOCUMENTO");
  }
};

const deleteDocumentosCtrl = async (req, res) => {
  try {
  req = matchedData(req);
    const { id } = req;
    console.log(id)
    const dataDeleteDocumentos = await documentosOperadoresModel.destroy({
      where: { id_Documento: id }
    });
    handleHttpResponse(res, dataDeleteDocumentos);
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_DELETE_DOCUMENTO");
  }
};

module.exports = {
  createDocumentosCtrl,
  updateDocumentosCtrl,
  readAllDocumentosCtrl,
  readDocumentoCtrl,
  deleteDocumentosCtrl,
}
