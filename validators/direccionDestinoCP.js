const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorDirDestinoCartaPorte = [
  check("Ubicaciones.id_CartaPorte").exists(),
  check("Ubicaciones.1.Domicilio.id_Estado").exists(),
  check("Ubicaciones.1.Domicilio.id_Localidad").exists(),
  check("Ubicaciones.1.Domicilio.id_Municipio").exists(),
  check("Ubicaciones.1.Domicilio.id_Colonia").exists(),
  check("Ubicaciones.1.Domicilio.st_Calle").exists(),
  check("Ubicaciones.1.Domicilio.st_NoExterior").exists(),
  check("Ubicaciones.1.Domicilio.st_NoInterior").exists(),
  check("Ubicaciones.1.Domicilio.st_RefDomicilio").exists(),
  check("Ubicaciones.1.st_DestinatarioNombre").exists(),
  check("Ubicaciones.1.st_IdUbicacion").exists(),
  check("Ubicaciones.1.st_FechaHoraLlegada").exists(),
  check("Ubicaciones.1.st_DestinatarioRFC").exists(),
  check("Ubicaciones.1.Domicilio.c_codigoPostal").exists(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorDirDestinoCartaPorte };
