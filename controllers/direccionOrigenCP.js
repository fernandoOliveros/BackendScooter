const { direccionOrigenCPModel } = require("../models");
const { handleHttpResponse } = require("../utils/handleResponse");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const createDireccionOrigenCPCtrl = async (req, res, next) => {
  console.log(
    "Printing what's being sent on the createDireccionOrigenCPCtrl:",
    req.body
  );
  try {

    /***Looping trhough each Ubicacion */
    const ubicaciones = req.body.Ubicaciones;
    const ubicacionesLength = ubicaciones.length;

    console.log(`Length of 'Ubicaciones' array: ${ubicacionesLength}`);

    for (let i = 0; i < ubicacionesLength; i++) {
      const ubicacion = ubicaciones[i];
      if (ubicacion.TipoUbicacion === "Origen") {
        // Perform the action for "TipoUbicacion" equal to "Origen"
        console.log(`Processing 'TipoUbicacion' ${i} equal to 'Origen'`);
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
          st_RemitenteNombre = req.body.Ubicaciones[i].st_RemitenteNombre,
          st_IdUbicacion = req.body.Ubicaciones[i].st_IdUbicacion,
          date_FechaSalida = req.body.Ubicaciones[i].date_FechaSalida,
          st_RemitenteRFC = req.body.Ubicaciones[i].st_RemitenteRFC,
          c_codigoPostal = req.body.Ubicaciones[i].Domicilio.c_codigoPostal,
        } = req.body;

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
        console.log(ubicacion);
        // Example action: Call a function or perform operations on the data
      }
    }

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
