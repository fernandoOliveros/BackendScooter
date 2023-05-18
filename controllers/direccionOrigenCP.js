const { direccionOrigenCPModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDireccionOrigenCPCtrl = async (req, res, next) => {
  console.log(
    "Printing what's being sent on the controller:",
    req.body,
    "ending"
  );

  const {
    id_CartaPorte = req.body.Ubicaciones.id_CartaPorte,
    id_Estado = req.body.Ubicaciones[0].Domicilio.id_Estado,
    id_Localidad = req.body.Ubicaciones[0].Domicilio.id_Localidad,
    id_Municipio = req.body.Ubicaciones[0].Domicilio.id_Municipio,
    id_Colonia = req.body.Ubicaciones[0].Domicilio.id_Colonia,
    st_Calle = req.body.Ubicaciones[0].Domicilio.st_Calle,
    st_NoExterior = req.body.Ubicaciones[0].Domicilio.st_NoExterior,
    st_NoInterior = req.body.Ubicaciones[0].Domicilio.st_NoInterior,
    st_RefDomicilio = req.body.Ubicaciones[0].Domicilio.st_RefDomicilio,
    st_RemitenteNombre = req.body.Ubicaciones[0].st_RemitenteNombre,
    st_IdUbicacion = req.body.Ubicaciones[0].st_IdUbicacion,
    date_FechaSalida = req.body.Ubicaciones[0].date_FechaSalida,
    st_RemitenteRFC = req.body.Ubicaciones[0].st_RemitenteRFC,
    c_codigoPostal = req.body.Ubicaciones[0].Domicilio.c_codigoPostal
  } = req.body;


  try {
    
    //const direccionOrigenCP = await direccionOrigenCPModel.create(body);
    const newRow = new direccionOrigenCPModel({
      id_CartaPorte,
      id_Estado,
      id_Localidad,
      id_Municipio,
      id_Colonia,
      st_Calle,
      st_NoExterior,
      st_NoInterior,
      st_RefDomicilio,
      st_RemitenteNombre,
      st_IdUbicacion,
      date_FechaSalida,
      st_RemitenteRFC,
      c_codigoPostal,
    });
    await newRow.save();
    //req.body = req.body.Ubicaciones
    //console.log("printing direccionOrigenCP", direccionOrigenCP);
    next();
    //handleHttpResponse(res, direccionOrigenCP);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATING_DIRECCION_ORIGEN_CARTAPORTE");
  }
};

module.exports = {
  createDireccionOrigenCPCtrl,
};
