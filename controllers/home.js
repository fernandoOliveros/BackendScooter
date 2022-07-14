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
    let peticion = req.body;
    const dataa = matchedData(req); //la data del request venga curada
    let bodyy = {
      ...dataa,
    };
    console.log(bodyy);
    //console.log(peticion)
    //res.send({req})
    //console.log(body.i_Año);
    const dataUnidad = await unidadesModel.create(bodyy);
    let id_Unidad = dataUnidad.id;
    console.log(id_Unidad);
    //docsCtrl(id_Unidad); //** */
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
      filesData, 
      success: true 
    });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_UPLOAD_DOCS");
  }
};

const getAllUnidadesCtrl = async (req, res) => {
  console.log("hola mundo");
  res.send("Leer todas las unidades...");
};

const getUnidadCtrl = async (req, res) => {
  res.send("leer una unidad...");
};

module.exports = {
  homeCtrl,
  unidadesCtrl,
  getAllUnidadesCtrl,
  getUnidadCtrl,
  docsCtrl,
};
