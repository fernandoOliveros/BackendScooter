const { direccionDestinoCPModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDireccionDestinoCPCtrl = async (req, res) => {
  try {
    const ubicaciones = req.body.Ubicaciones;
    const ubicacionesLength = ubicaciones.length;
    console.log(`Length of 'Ubicaciones' array: ${ubicacionesLength}`);
    for (let i = 0; i < ubicacionesLength; i++) {
      const ubicacion = ubicaciones[i];
      if (ubicacion.TipoUbicacion === "Destino") {
        // Perform the action for "TipoUbicacion" equal to "Origen"
        console.log(`Processing 'TipoUbicacion' ${i} equal to 'Destino'`);
      
        const {
          id_CartaPorte = req.body.Ubicaciones.id_CartaPorte,
          id_Estado = req.body.Ubicaciones[i].Domicilio.id_Estado,
          id_Localidad = req.body.Ubicaciones[i].Domicilio.id_Localidad,
          id_Municipio = req.body.Ubicaciones[i].Domicilio.id_Municipio,
          id_Colonia = req.body.Ubicaciones[i].Domicilio.id_Colonia,
          st_Calle = req.body.Ubicaciones[i].Domicilio.st_Calle,
          st_NoExterior = req.body.Ubicaciones[i].Domicilio.st_NoExterior,
          st_NoInterior = req.body.Ubicaciones[i].Domicilio.st_NoInterior,
          st_RefDomicilio = req.body.Ubicaciones[i].Domicilio.st_RefDomicilio,
          st_DestinatarioNombre = req.body.Ubicaciones[i].st_DestinatarioNombre,
          st_IdUbicacion = req.body.Ubicaciones[i].st_IdUbicacion,
          st_FechaHoraLlegada = req.body.Ubicaciones[i].st_FechaHoraLlegada,
          st_DestinatarioRFC = req.body.Ubicaciones[i].st_DestinatarioRFC,
          c_codigoPostal = req.body.Ubicaciones[i].Domicilio.c_codigoPostal,
        } = req.body;
        const newRow2 = new direccionDestinoCPModel({
          id_CartaPorte,
          id_Estado,
          id_Localidad,
          id_Municipio,
          id_Colonia,
          st_Calle,
          st_NoExterior,
          st_NoInterior,
          st_RefDomicilio,
          st_DestinatarioNombre,
          st_IdUbicacion,
          st_FechaHoraLlegada,
          st_DestinatarioRFC,
          c_codigoPostal,
        });
        await newRow2.save();
      }
    }    
        
    //const body = matchedData(req.body.Ubicaciones[1].Domicilio); //la 
    handleHttpResponse(res, "newRow");
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATING_DIRECCION_DESTINO_CARTAPORTE");
  }
};

const updateCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const cartaPorte = await CartaPorte.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    await cartaPorte.update(body);
    handleHttpResponse(res, cartaPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_UPDATING_CARTAPORTE");
  }
};

const readAllCartasPorteCtrl = async (req, res) => {
  try {
    const cartasPorte = await CartaPorte.findAll();
    handleHttpResponse(res, cartasPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_READING_CARTASPORTE");
  }
};

const readCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const cartaPorte = await CartaPorte.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    handleHttpResponse(res, cartaPorte);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_READING_CARTAPORTE");
  }
};

const deleteCartaPorteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const cartaPorte = await CartaPorte.findByPk(id);
    if (!cartaPorte) {
      handleHttpError(res, `No existe CartaPorte con id: ${id}`, 404);
      return;
    }
    await cartaPorte.destroy();
    handleHttpResponse(res, "CartaPorte eliminada correctamente.");
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETING_CARTAPORTE");
  }
};

module.exports = {
  createDireccionDestinoCPCtrl,
};
