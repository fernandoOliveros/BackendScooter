const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorDirOrigenCartaPorte = [
  check("Ubicaciones.id_CartaPorte").exists(),
  check("Ubicaciones.0.Domicilio.id_Estado").exists(),
  check("Ubicaciones.0.Domicilio.id_Localidad").exists(),
  check("Ubicaciones.0.Domicilio.id_Municipio").exists(),
  check("Ubicaciones.0.Domicilio.id_Colonia").exists(),
  check("Ubicaciones.0.Domicilio.st_Calle").exists(),
  check("Ubicaciones.0.Domicilio.st_NoExterior").exists(),
  check("Ubicaciones.0.Domicilio.st_NoInterior").exists(),
  check("Ubicaciones.0.Domicilio.st_RefDomicilio").exists(),
  check("Ubicaciones.0.st_RemitenteNombre").exists(),
  check("Ubicaciones.0.st_IdUbicacion").exists(),
  check("Ubicaciones.0.date_FechaSalida").exists(),
  check("Ubicaciones.0.st_RemitenteRFC").exists(),
  check("Ubicaciones.0.Domicilio.c_codigoPostal").exists(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorDirOrigenCartaPorte };
