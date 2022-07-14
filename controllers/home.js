const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { unidadesModel, documentosUnidadModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;

/**
 * @param {} req  http://localhost:5000/api/home
 * @param {*} res   Aqui retornamos los valores del usuario, una vez que se ha verificado su token
 */

const homeCtrl = async (req, res) => {
  try {
    const user = req.user;
    res.send({
      user,
      success: true,
    });
  } catch (e) {
    handleHttpError(res, "ERROR_TOKEN_VERIFICATION", 402);
  }
};

//Controlador : dar de alta unidades
const unidadesCtrl = async (req, res) => {
  try {
    const dataa = matchedData(req); //la data del request venga curada
    let bodyy = {
      ...dataa,
    };
    const dataUnidad = await unidadesModel.create(bodyy);
    //let id_Unidad = dataUnidad.id; console.log(id_Unidad);
    const data = {
      unidad: dataUnidad,
      success: true,
    };
    res.send({
      data: data,
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_UNIDAD");
  }
};

//Controlador : actualizar unidades
const updateUnidadesCtrl = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req); //splits the request into two objects, id and body
    let idToUptate = id;
    let bodyToUpdate = body;
    console.log(idToUptate)
    console.log(bodyToUpdate)
    const dataUpdateUnidad = await unidadesModel.update( body, { where: { id: id }});

    res.send({
    dataUpdateUnidad,
    success: true})
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPDATE_UNIDAD");
  }
};

const docsCtrl = async (req, res) => {
  try {
    const { files } = req;

    let [dataTarjetaCirculacion] = files["url_TarjetaCirculacion"];
    let [dataFactura] = files["url_Factura"];
    let [dataPermisoSCT] = files["url_PermisoSCT"];

    const filesData = {
      //id_Unidad : NULL,
      url_TarjetaCirculacion: `${PUBLIC_URL}/${dataTarjetaCirculacion.filename}`,
      url_Factura: `${PUBLIC_URL}/${dataFactura.filename}`,
      url_PermisoSCT: `${PUBLIC_URL}/${dataPermisoSCT.filename}`,
    };
    const data = await documentosUnidadModel.create(filesData);
    res.send({ 
      data, 
      success: true 
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const getAllUnidadesCtrl = async (req, res) => {
  try {
    const allUnidades = await unidadesModel.findAll()
    res.send({
      allUnidades,
      success: true 
    })
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_UNIDADES")
  }
};

const getUnidadCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const {id} = req;
    const getUnidad = await unidadesModel.findByPk(id)
    res.send({
      getUnidad,
      success: true 
    })
  } catch (e) {
    handleHttpError(res, "ERROR_GET_UNIDAD")
  }
};

module.exports = {
  homeCtrl,
  unidadesCtrl,
  getAllUnidadesCtrl,
  getUnidadCtrl,
  docsCtrl,
  updateUnidadesCtrl,

};
